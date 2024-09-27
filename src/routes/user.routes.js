const express = require("express");
const {
  getUser,
  registerController,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/sign-in", registerController);

module.exports = router;
