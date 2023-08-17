import express from 'express';
import HighScore from '../models/highScore';

const router = express.Router();

router.get('/high-scores', (req, res) => {
  HighScore.find({}).then((scores) => res.json(scores));
});

router.post('/high-scores', (req, res) => {
  const newScore = new HighScore(req.body);
  newScore.save().then(() => res.json({ success: true }));
});

export default router;
