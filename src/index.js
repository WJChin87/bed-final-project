import express from "express";
import loginRouter from "./routes/login.js";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
