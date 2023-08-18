import mongoose from 'mongoose';

const highScoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

const HighScore = mongoose.model('HighScore', highScoreSchema);

export default HighScore;
