"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = require("./database/dbConnection");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, dbConnection_1.dbConnection)();
app.get('/', (req, res) => {
    res.send("hello bazaar");
});
app.listen(5000, () => {
    console.log('server is running on port 5000');
});
