const Task = require("../models/Task");
const {getDateTomorrow} = require("../util/dates");
const Category = require("../models/Category");

module.exports = {
    getAllTasks: async (req, res) => {
        let filter = { 'user.userId': req.user._id };  // find only the tasks of currently authenticated user

        // filter on taskDate dueDate=past or dueDate=today
        const dueDate = req.query.dueDate;
        if (dueDate === 'today') {
            const currentDate = new Date(new Date().setHours(0,0,0,0)); // today's date at midnight
            const dateTomorrow = getDateTomorrow();
            filter = {...filter, taskDate:{"$gte": currentDate, "$lt": dateTomorrow}};
        }

        if (dueDate === 'past') {
            const currentDate = new Date(new Date().setHours(0,0,0,0)); // today's date at midnight
            filter = {...filter, taskDate:{"$lt": currentDate}};
        }

        // filter on completed tasks : completed=true or completed=false
        const completed = req.query.completed;
        if (completed === 'true') {
            filter = {...filter, completed: true};
        }
        if (completed === 'false') {
            filter = {...filter, completed: false};
        }

        // filter by text search
        const search = req.query.search;
        if (search && search !== '') {
            filter = {...filter, title: { $regex: search, $options: 'i' }};
        }

        // filter by date
        const date = req.query.date;
        if (date) {
            const dateAtMidnight = new Date(new Date(date).setHours(0,0,0,0));

            const dateDayAfter = new Date(date);
            dateDayAfter.setDate(dateDayAfter.getDate() + 1);
            dateDayAfter.setHours(0,0,0,0);

            filter = {...filter, taskDate:{"$gte": dateAtMidnight, "$lt": dateDayAfter}};
        }

        try {
            const tasks = await Task.find(filter).sort({ taskDate: 1 });
            res.json(tasks);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    },
    createTask: async (req, res) => {
        const { title, taskDate, category } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Task title is required" });
        }

        let existingCategory = undefined;
        if (category && category.categoryId !== '') {
            existingCategory = await Category.findById(category.categoryId)
        }

        let categoryToLink = undefined;
        if (existingCategory) {
            categoryToLink = {
                name: existingCategory.name,
                colour: existingCategory.colour,
                categoryId: existingCategory._id
            }
        }

        try {
            const newTask = new Task({
                title,
                taskDate,
                user: { // link currently authenticated user to the task
                    username: req.user.username,
                    userId: req.user
                },
                category: categoryToLink || {}
            });
            await newTask.save();
            res.status(201).json(newTask);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        }
    },
    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { category } = req.body;
            const existingTask = await Task.findOne({ 'user.userId': req.user._id, _id: id });

            if (!existingTask) {
                return res.status(404).json({ error: "Task of user not found" });
            }

            let existingCategory = undefined;
            if (category && category.categoryId !== '') {
                existingCategory = await Category.findById(category.categoryId)
            }

            const newBody = {...existingTask._doc, ...req.body};
            let newBodyWithCategory = existingCategory ? {...newBody, category: {
                    name: existingCategory.name,
                    colour: existingCategory.colour,
                    categoryId: existingCategory._id
                }
            } : {...newBody, category: {}};

            const updatedTask = await Task.findByIdAndUpdate(
                id,
                newBodyWithCategory,
                { new: true } // Return the updated task
            )
            res.json(updatedTask);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    },
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;
            const taskToDelete = await Task.find({ 'user.userId': req.user._id, _id: id });

            if (!taskToDelete) {
                return res.status(404).json({ error: "Task of user not found" });
            }

            await Task.deleteOne( { _id: id });
            res.json({ message: "Task deleted" });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }
}