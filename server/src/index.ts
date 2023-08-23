import express from "express";
import mongoose from "mongoose";
import { PORT, MONGODB_URI } from "./config";
import highScoresRouter from "./routes/highScores";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(highScoresRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
