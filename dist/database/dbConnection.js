"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = async () => {
    try {
        await mongoose_1.default.connect(process.env.MOGO_URL);
        console.log('database connection successfully!');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.dbConnection = dbConnection;
