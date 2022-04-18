const express = require("express");

const { getSecret } = require("../../controllers/secret");
const { logout } = require("../../controllers/auth/auth.controller")();

const router = express.Router();

router.get("/secret", getSecret);
router.delete("/logout", logout);

module.exports = router;
