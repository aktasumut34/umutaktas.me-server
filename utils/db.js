const mongoose = require("mongoose");
require("dotenv").config();
module.exports = function () {
  mongoose.connect(process.env.ATLAS_CONNECTION_STRING).then(
    () => {
      console.log("connection established with atlas");
    },
    (err) => {
      console.log(err);
    }
  );
};
