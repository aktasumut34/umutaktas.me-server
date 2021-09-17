const express = require("express");
const cors = require("./middlewares/cors");
const apiRoutes = require("./routes/api");
const app = express();
require("dotenv").config();
require("./utils/db").init();
if (process.env.NODE_ENV == "production") console.log("running on production");
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

app.set("json spaces", 2);
app.listen(port, () => {
  console.log(`Express Server created at ${port}`);
});
