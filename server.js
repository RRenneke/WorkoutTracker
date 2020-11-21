//install packages
const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
//morgan is used in middelware which is helpful if there are issues
const logger = require("morgan");

//set port
const PORT = process.env.PORT || 3000;

const app = express();

//use logger
app.use(logger("dev"));

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use static files
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//needed routes to access the applications
app.use(require("./routes/apiroutes.js"));
app.use(require("./routes/htmlroutes.js"));


//connect to the database
const dbase = mongoose.connection;
dbase.on('error', console.error.bind(console, 'connection error:'));
dbase.once('open', function() {
  console.log("we're connected!");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});