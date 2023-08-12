const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/user-routes");
const authRoute = require("./routes/auth-routes");
const postRoute = require("./routes/post-routes");

dotenv.config();

//DB Connection:--
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongo atlas");
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Middleware
app.use(express.json()); // It parses incoming requests with JSON payloads and is based on body-parser.
app.use(helmet()); // secure your Express.js apps by setting various HTTP headers
app.use(morgan("common")); // res :  [29/May/2023:10:29:08 +0000] "GET /user HTTP/1.1" 200 23
app.use(cors());

//routes

// app.use('/social/user', user);
app.use("/social/user", userRoute);
app.use("/social/auth", authRoute);
app.use("/social/post", postRoute);

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
