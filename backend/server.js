//establishing express and cors for future use
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

//configures environment variables in dotenv file
require("dotenv").config();

//creates express server
const app = express();
const port = process.env.PORT || 5000;
//middleware, allows us to parse json
app.use(cors());
app.use(express.json());
//connects to mongodb database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

//starts the server, i.e listens to a certain port
app.listen(port, () => {
  console.log("server is running on port:", { port });
});
