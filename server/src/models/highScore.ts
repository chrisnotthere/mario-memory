import mongoose from 'mongoose';

const highScoreSchema = new mongoose.Schema({
  name: String,
  time: Number,
  moves: Number,
});

const HighScore = mongoose.model('HighScore', highScoreSchema);

export default HighScore;
