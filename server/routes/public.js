const express = require("express");

const router = express.Router();

const { register, login, profile } =
  require("../controllers/auth/auth.controller")();

router.get("/", (req, res) => {
  return res.send("hello home page!");
});

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);

module.exports = router;
