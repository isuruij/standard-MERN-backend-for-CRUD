const express = require("express");
require("./db/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./router");
const port = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
  });




