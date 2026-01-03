const express = require("express");
const app = express();
app.use(express.static("pages", {index: "home.html"}));
app.listen(3000);