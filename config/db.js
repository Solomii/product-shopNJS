const path = require('path');
const mongoose = require("mongoose");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to MongoDB database");
    })
    .catch((error) => {
      console.log("MongoDB database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};