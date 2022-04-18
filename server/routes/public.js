const express = require("express");
const { register, login, profile } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send("hello home page!");
});

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);

module.exports = router;
