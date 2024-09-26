const express = require("express");
const {
  getUser,
  registerController,
} = require("../controllers/user.controllers");

const router = express.Router();

router.get("/user", registerController);

module.exports = router;
