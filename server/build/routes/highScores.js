"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const highScore_1 = __importDefault(require("../models/highScore"));
const router = express_1.default.Router();
router.get("/high-scores", (req, res) => {
    const difficulty = req.query.difficulty;
    highScore_1.default.find({ difficulty })
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
    highScore_1.default.find({
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
    const newScore = new highScore_1.default(req.body);
    newScore
        .save()
        .then(() => res.json({ success: true }))
        .catch((err) => res.status(400).json({ error: err.message }));
});
exports.default = router;
