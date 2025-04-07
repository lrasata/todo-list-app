const express = require("express");
const {getAllTasks, createTask, deleteTask, updateTask} = require("../controllers/task-controller");
const {authMiddlewareForAPI} = require("../middlewares/auth-middleware");

const router = express.Router();

// routes for Task management
router.get("/", authMiddlewareForAPI, getAllTasks);

router.post("/", authMiddlewareForAPI, createTask);

router.delete("/:id", authMiddlewareForAPI, deleteTask);

router.put("/:id", authMiddlewareForAPI, updateTask);

module.exports = router;