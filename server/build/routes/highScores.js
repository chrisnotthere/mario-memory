"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express_1 = __importDefault(require("express"));
const config_1 = require("../config");
const router = express_1.default.Router();
let db;
let highScoresCollection;
mongodb_1.MongoClient.connect(config_1.MONGODB_URI)
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
exports.default = router;
