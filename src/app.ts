import express, { Application } from "express";
import { json, urlencoded } from "express";

const cors = require("cors");
const morgan = require("morgan");

const app: Application = express();
const port: number | string = process.env.PORT || 4001;

// Routes
const userRegister = require("./routes/register.routes");
const vehicle = require("./routes/vehicle.routes");

// MIDDLEWARE
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// ENDPOINTS
app.use("/api/v1", userRegister);
app.use("/api/v1", vehicle);

app.listen(port, () => {
  console.log(`Booming on port:${port}. It's LIT!`);
});
