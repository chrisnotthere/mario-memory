"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
let db;
mongodb_1.MongoClient.connect(config_1.MONGODB_URI)
    .then((client) => {
    db = client.db();
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
const HighScore = {
    find: (query) => db.collection("HighScore").find(query).toArray(),
    save: (data) => db.collection("HighScore").insertOne(data),
};
exports.default = HighScore;
