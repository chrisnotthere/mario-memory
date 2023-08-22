import { Db, MongoClient } from "mongodb";
import { MONGODB_URI } from "../config";

let db: Db;

MongoClient.connect(MONGODB_URI)
  .then((client) => {
    db = client.db();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const HighScore = {
  find: (query: any) => db.collection("HighScore").find(query).toArray(),
  save: (data: any) => db.collection("HighScore").insertOne(data),
};

export default HighScore;
