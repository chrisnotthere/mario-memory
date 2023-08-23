import mongoose from 'mongoose';

const highScoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  difficulty: String,
  date: String,
});

const HighScore = mongoose.model('HighScore', highScoreSchema);

export default HighScore;
