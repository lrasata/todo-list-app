const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
    },
    colour: {
        type: String,
        required: false
    }
});

CategorySchema.index({ name: 'text'});
module.exports = mongoose.model("Category", CategorySchema);