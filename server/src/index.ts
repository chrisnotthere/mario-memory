import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI!);

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port, () => console.log(`Server running on port ${port}`));
