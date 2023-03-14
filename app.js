//app.js
//update
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

const router = require("./routes");

const corsConfig = {
  origin : "*",
  credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsConfig));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
