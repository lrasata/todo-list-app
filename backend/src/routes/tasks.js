const express = require("express");
const {getAllTasks, createTask, deleteTask, updateTask} = require("../controllers/task-controller");

const router = express.Router();

// routes for Task management
router.get("/", getAllTasks);

router.post("/", createTask);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

module.exports = router;