const Task = require("../models/Task");
const {getDateTomorrow} = require("../util/dates");

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
            filter = {...filter, $text: { $search: search }};
        }

        try {
            const tasks = await Task.find(filter).sort({ taskDate: 1 });
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    createTask: async (req, res) => {
        const { title, taskDate } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Task title is required" });
        }

        try {
            const newTask = new Task({
                title,
                taskDate,
                user: { // link currently authenticated user to the task
                    username: req.user.username,
                    userId: req.user
                },
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
            const taskToUpdate = await Task.find({ 'user.userId': req.user._id, _id: id });

            if (!taskToUpdate) {
                res.status(404).json({ error: "Task of user not found" });
            }

            const updatedTask = await Task.findByIdAndUpdate(
                id,
                req.body,
                { new: true } // Return the updated task
            )
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }
    },
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;
            const taskToUpdate = await Task.find({ 'user.userId': req.user._id, _id: id });

            if (!taskToUpdate) {
                res.status(404).json({ error: "Task of user not found" });
            }

            await Task.deleteOne( { _id: id });
            res.json({ message: "Task deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}