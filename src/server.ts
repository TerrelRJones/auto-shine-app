import { app } from "./app";

const port: number | string = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Booming on port:${port}. It's LIT!`);
});
