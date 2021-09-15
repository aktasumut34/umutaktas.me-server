const mongoose = require("mongoose");
require("dotenv").config();
module.exports = function () {
  mongoose.connect(process.env.MONGODB_URI).then(
    () => {
      console.log("connection established with atlas");
    },
    (err) => {
      console.log(err);
    }
  );
};
