const Category = require("../models/Category");
const Task = require("../models/Task");

const DEFAULT_COLOUR = '#FFFFFF';

module.exports = {
    createCategory: async (req, res) => {
        const { name, colour } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }

        let categoryColour = DEFAULT_COLOUR;
        if (colour) {
            categoryColour = colour;
        }

        try {
            const newCategory = new Category({
                name,
                colour: categoryColour,
                user: { // link currently authenticated user to the task
                    username: req.user.username,
                    userId: req.user
                },
            });
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const categoryToUpdate = await Category.find({ 'user.userId': req.user._id, _id: id });

            if (!categoryToUpdate) {
                res.status(404).json({ error: "Category not found" });
            }

            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                req.body,
                { new: true } // Return the updated category
            )

            await Task.updateMany(
                { 'category.categoryId': id },
                { $set: { 'category.name': req.body.name, 'category.colour': req.body.colour } },
            );
            res.json(updatedCategory);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const categoryToDelete = await Category.find({ 'user.userId': req.user._id, _id: id });

            if (!categoryToDelete) {
                res.status(404).json({ error: "Category not found" });
            }

            await Category.deleteOne( { _id: id });
            await Task.updateMany(
                { 'category.categoryId': id },
                 { $unset: { category: null }},
            );

            res.json({ message: "Category deleted" });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    },
    getCategories: async (req, res) => {
        let filter = { 'user.userId': req.user._id };

        try {
            const categories = await Category.find(filter).sort({ name: 1 });
            res.json(categories);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }
}