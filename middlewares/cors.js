module.exports = function (req, res, next) {
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
};
