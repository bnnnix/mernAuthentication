const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan"); // HTTP request logger middleware for node.js
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// DB Setup
mongoose.connect("mongodb://localhost:27017/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// App Setup
app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
