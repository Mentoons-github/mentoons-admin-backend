const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// initial configurations
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api routes
app.get("/api/v1", (req, res) => {
  return res
    .cookie("aman", "aman is a good boy")
    .clearCookie("akash")
    .json({ message: "success" });
});

// catching invalid routes
app.get("*", (req, res, next) => {
  const url = req.originalUrl;
  return res.status(404).json({ message: `${url} is not a valid endpoint` });
});

//

module.exports = { app };
