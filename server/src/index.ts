import express from "express";
import { MongoClient } from "mongodb";
import { PORT, MONGODB_URI } from "./config";
import highScoresRouter from "./routes/highScores";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
MongoClient.connect(MONGODB_URI)
  .then((client) => {
    console.log("Successfully connected to MongoDB.");
    app.locals.db = client.db();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(highScoresRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
