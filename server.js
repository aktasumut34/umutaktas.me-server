const express = require("express");
const cors = require("./middlewares/cors");
const apiRoutes = require("./routes/api");
const app = express();
require("dotenv").config();
require("./utils/db")();

app.use(express.urlencoded({ extended: false }));
//app.use(cors);
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

app.set("json spaces", 40);
app.listen(port, () => {
  console.log(`Express Server created at ${port}`);
});
