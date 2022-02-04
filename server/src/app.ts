import express, { Application, Router, Request, Response } from "express";
import { json, urlencoded } from "express";

const cors = require("cors");
const morgan = require("morgan");

const app: Application = express();

const userRegister: Router = require("./routes/register.routes");
const userLogin: Router = require("./routes/login.routes");
const vehicle: Router = require("./routes/vehicle.routes");
const users: Router = require("./routes/users.routes");
const address: Router = require("./routes/address.routes");

// MIDDLEWARE
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// ENDPOINTS
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Auto-Shine API");
});

// Routes
app.use("/api/v1", userRegister);
app.use("/api/v1", userLogin);
app.use("/api/v1", vehicle);
app.use("/api/v1", users);
app.use("api/v1", address);

module.exports = app;
