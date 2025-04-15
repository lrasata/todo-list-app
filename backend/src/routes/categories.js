const express = require("express");
const {authMiddlewareForAPI} = require("../middlewares/auth-middleware");
const {getCategories, createCategory, deleteCategory, updateCategory} = require("../controllers/category-controller");

const router = express.Router();

router.get("/", authMiddlewareForAPI, getCategories);

router.post("/", authMiddlewareForAPI, createCategory);

router.delete("/:id", authMiddlewareForAPI, deleteCategory);

router.put("/:id", authMiddlewareForAPI, updateCategory);

module.exports = router;