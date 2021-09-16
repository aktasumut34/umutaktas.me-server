module.exports = function (req, res, next) {
  if (req.headers.origin?.endsWith("localhost:3000")) {
    let origin = req.headers.origin.startsWith("http")
      ? req.headers.origin
      : req.protocol + "://" + req.headers.origin;
    res.setHeader("Access-Control-Allow-Origin", origin);
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
