const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    taskDate: {
      type: Date,
      default: Date.now,
      required: true
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
    category: {
        name: {
            type: String,
            required: false
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Category'
        }
    }
});

TaskSchema.index({ title: 'text'});
module.exports = mongoose.model("Task", TaskSchema);