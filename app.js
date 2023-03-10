//app.js
//update
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

const router = require("./routes");



app.use(express.json());

const corsConfig = {
    credentials: true,
}

app.use(cors(corsConfig))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

app.use(router);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
