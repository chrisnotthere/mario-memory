"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const highScore_1 = __importDefault(require("../models/highScore"));
const router = express_1.default.Router();
router.get('/high-scores', (req, res) => {
    highScore_1.default.find({}).then((scores) => res.json(scores));
});
router.post('/high-scores', (req, res) => {
    const newScore = new highScore_1.default(req.body);
    newScore.save().then(() => res.json({ success: true }));
});
exports.default = router;
