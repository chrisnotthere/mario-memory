import express from "express";
import mongoose from "mongoose";
import { PORT, MONGODB_URI } from "./config";
import highScoresRouter from "./routes/highScores";
import cors from "cors";

const app = express();

const whitelist = ['https://chrisnotthere.github.io', 'http://localhost:3000']; // adjust the port as needed
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (whitelist.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

console.log(MONGODB_URI)

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
