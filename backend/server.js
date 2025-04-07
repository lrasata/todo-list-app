const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1); // Exit process with failure
    }
};

// Call the database connection function
connectDB();

const tasksRoutes = require("./src/routes/tasks");
app.use("/api/tasks", tasksRoutes);

const authRoutes = require("./src/routes/auth");
app.use("/api", authRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});