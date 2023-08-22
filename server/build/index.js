"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
const highScores_1 = __importDefault(require("./routes/highScores"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongodb_1.MongoClient.connect(config_1.MONGODB_URI)
    .then((client) => {
    console.log("Successfully connected to MongoDB.");
    app.locals.db = client.db();
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
app.use(highScores_1.default);
app.listen(config_1.PORT, () => console.log(`Server running on port ${config_1.PORT}`));
