"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const highScores_1 = __importDefault(require("./routes/highScores"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const whitelist = ['https://chrisnotthere.github.io', 'http://localhost:3000']; // adjust the port as needed
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
console.log(config_1.MONGODB_URI);
// Connect to MongoDB
mongoose_1.default
    .connect(config_1.MONGODB_URI)
    .then(() => {
    console.log("Successfully connected to MongoDB.");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
app.use(highScores_1.default);
app.listen(config_1.PORT, () => console.log(`Server running on port ${config_1.PORT}`));
