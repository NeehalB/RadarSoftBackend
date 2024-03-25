import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRouter from "./router/user.router";
import articleRouter from "./router/article.router";

config();

const PORT = 2000;
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("Server running at port ", PORT);
});

mongoose
  .connect(process.env.DB_PASSWORD)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log(error));

app.use("/user", userRouter);
app.use("/article", articleRouter);
