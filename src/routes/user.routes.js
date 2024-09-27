const express = require("express");
const {
  getUser,
  registerController,
  loginController,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/sign-in", registerController);
router.post("/login", loginController);

module.exports = router;
