import express from "express";
import HighScore from "../models/highScore";

const router = express.Router();

router.get("/high-scores", (req, res) => {
  const difficulty = req.query.difficulty;

  HighScore.find({ difficulty })
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

  HighScore.find({
    difficulty,
    date: { $gte: oneWeekAgo.toISOString() },
  })
    .then((scores) => {
      res.json(scores);
    })
    .catch((err) => {
      console.error("Error fetching high scores:", err.message);
      res.status(400).json({ error: err.message });
    });
});

router.post("/high-scores", (req, res) => {
  const newScore = new HighScore(req.body);
  newScore
    .save()
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

export default router;
