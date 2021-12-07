"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_2 = require("express");
var cors = require("cors");
var morgan = require("morgan");
var app = (0, express_1.default)();
var port = process.env.PORT || 4001;
// Routes
var user = require("./routes/notes.routes");
// MIDDLEWARE
app.use(cors());
app.use((0, express_2.json)());
app.use((0, express_2.urlencoded)({ extended: true }));
app.use(morgan("dev"));
// ENDPOINTS
app.use("/", user);
app.listen(port, function () {
    console.log("Booming on port:".concat(port, ". It's LIT!"));
});
