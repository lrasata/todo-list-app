const Category = require("../models/Category");

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
                colour: categoryColour
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
            const categoryToUpdate = await Category.find({ _id: id });

            if (!categoryToUpdate) {
                res.status(404).json({ error: "Category not found" });
            }

            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                req.body,
                { new: true } // Return the updated category
            )
            res.json(updatedCategory);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const categoryToDelete = await Category.find({ _id: id });

            if (!categoryToDelete) {
                res.status(404).json({ error: "Category not found" });
            }

            await Category.deleteOne( { _id: id });
            res.json({ message: "Category deleted" });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    },
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find().sort({ name: 1 });
            res.json(categories);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }
}