//app.js
//update
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

const router = require("./routes");

const corsConfig = {
  credentials: true,
  orgin: "*",
};

app.use(express.json());

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
