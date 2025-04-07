const express = require("express");
const {getAllTasks, createTask, deleteTask, updateTask} = require("../controllers/task-controller");
const {userVerification} = require("../middlewares/auth-middleware");

const router = express.Router();

// routes for Task management
router.get("/", userVerification, getAllTasks);

router.post("/", userVerification, createTask);

router.delete("/:id", userVerification, deleteTask);

router.put("/:id", userVerification, updateTask);

module.exports = router;