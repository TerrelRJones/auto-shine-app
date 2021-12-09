import express, { Application, Router } from "express";
import { json, urlencoded } from "express";

const cors = require("cors");
const morgan = require("morgan");

const app: Application = express();
const port: number | string = process.env.PORT || 4001;

// Routes
const userRegister: Router = require("./routes/register.routes");
const userLogin: Router = require("./routes/login.routes");
const vehicle: Router = require("./routes/vehicle.routes");

// MIDDLEWARE
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// ENDPOINTS
app.use("/api/v1", userRegister);
app.use("/api/v1", userLogin);
app.use("/api/v1", vehicle);

app.listen(port, () => {
  console.log(`Booming on port:${port}. It's LIT!`);
});
