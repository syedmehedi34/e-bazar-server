"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var dbConnection_1 = require("./database/dbConnection");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, dbConnection_1.dbConnection)();
app.get('/', function (req, res) {
    res.send("hello bazaar");
});
app.listen(5000, function () {
    console.log('server is running on port 5000');
});
