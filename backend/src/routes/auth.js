const express = require("express");
const {signup, login} = require("../controllers/auth-controller");
const {verifyUser} = require("../middlewares/auth-middleware");

const router = express.Router();

// route for User authentication
router.post("/signup", signup);

router.post("/login", login);

router.post("/", verifyUser);

module.exports = router;