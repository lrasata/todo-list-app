const express = require("express");
const {signup} = require("../controllers/auth-controller");

const router = express.Router();

// route for User authentication
router.post("/signup", signup);

module.exports = router;