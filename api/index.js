const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const tweetsRouter = require("./routes/tweets");
const usersRouter = require("./routes/users");

app.use(tweetsRouter);
app.use(usersRouter);

app.listen(8000, () => {
  console.log("API server running");
});
