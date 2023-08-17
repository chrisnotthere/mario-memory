import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGODB_URI } from './config';
import highScoresRouter from './routes/highScores';

const app = express();

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(highScoresRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
