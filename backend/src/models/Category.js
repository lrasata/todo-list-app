const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
    },
    colour: {
        type: String,
        required: false
    },
    user: {
        username: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
});

CategorySchema.index({ name: 'text'});
module.exports = mongoose.model("Category", CategorySchema);