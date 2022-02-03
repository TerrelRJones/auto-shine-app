// import { app } from "./app";
const app = require("./app");

// const port: number | string = process.env.PORT || 4001;

app.listen(process.env.PORT || 4001, () => {
  console.log(`Booming on port:${process.env.PORT}. It's LIT!`);
});
