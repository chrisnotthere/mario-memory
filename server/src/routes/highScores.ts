import { Collection, Document, MongoClient } from "mongodb";
import express from "express";
import { MONGODB_URI } from "../config";

const router = express.Router();

let db;
let highScoresCollection: Collection<Document>;

MongoClient.connect(MONGODB_URI)
  .then((client) => {
    db = client.db("test");
    highScoresCollection = db.collection("highscores");
    console.log("Successfully connected to MongoDB.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

router.get("/high-scores", (req, res) => {
  const difficulty = req.query.difficulty;

  highScoresCollection
    .find({ difficulty })
    .toArray()
    .then((scores) => {
      res.json(scores);
    })
    .catch((err) => {
      console.error("Error fetching high scores:", err.message);
      res.status(400).json({ error: err.message });
    });
});

router.get("/weekly-high-scores", (req, res) => {
  const difficulty = req.query.difficulty;
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  highScoresCollection
    .find({
      difficulty,
      date: { $gte: oneWeekAgo.toISOString() },
    })
    .toArray()
    .then((scores) => {
      res.json(scores);
    })
    .catch((err) => {
      console.error("Error fetching high scores:", err.message);
      res.status(400).json({ error: err.message });
    });
});

router.post("/high-scores", (req, res) => {
  const newScore = req.body;

  highScoresCollection
    .insertOne(newScore)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

export default router;
