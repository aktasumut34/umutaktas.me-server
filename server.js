const express = require("express");
const validator = require("./middlewares/validator");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
mongoose.connect(process.env.ATLAS_CONNECTION_STRING).then(
  () => {},
  (err) => {
    console.log(err);
  }
);
const zipsSchema = new mongoose.Schema({
  id: mongoose.ObjectId,
  city: String,
  zip: String,
  pop: Number,
  state: String,
  loc: {
    y: Number,
    x: Number,
  },
});

const zips = mongoose.model("zips", zipsSchema);
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  if (req.headers.origin?.endsWith("umutaktas.me")) {
    res.setHeader(
      "Access-Control-Allow-Origin",
      req.protocol + "://" + req.headers.origin
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
  }
  next();
});

app.get("/api/posts/:slug", validator, async (req, res, next) => {
  var random = Math.floor(Math.random() * 10);
  const z = await zips.findOne({ state: req.body.slug }).skip(random).exec();
  res.send(z._id.toString());
});

app.listen(3000);
