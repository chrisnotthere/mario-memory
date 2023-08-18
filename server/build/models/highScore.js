"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const highScoreSchema = new mongoose_1.default.Schema({
    name: String,
    score: Number,
});
const HighScore = mongoose_1.default.model('HighScore', highScoreSchema);
exports.default = HighScore;
