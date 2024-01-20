const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {  //returns a promise
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });