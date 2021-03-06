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
const appointment: Router = require("./routes/appointment.routes");
const payment: Router = require("./routes/payment.routes");

// MIDDLEWARE
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// WELCOME ENDPOINT
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To AUTOSHINE API");
});

// Routes
app.use("/api/v1", userRegister);
app.use("/api/v1", userLogin);
app.use("/api/v1", vehicle);
app.use("/api/v1", users);
app.use("/api/v1", address);
app.use("/api/v1", appointment);
app.use("/api/v1", payment);

module.exports = app;
