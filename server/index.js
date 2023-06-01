import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user from "./routes/user.js";
import auth from "./routes/auth.js";

const app = express();
const port = 8000;

dotenv.config();

mongoose.connect(process.env.MONGOD_URL, { useNewUrlParser: true }).then(() => {
  console.log(`connected to MongoDB ${process.env.MONGOD_URL}`);
});

// middlewares
app.use(express.json()); //bodyparser
app.use(helmet());
app.use(morgan("common"));
app.use("/user", user);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
