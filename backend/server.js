const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(  cors({
    origin: [process.env.ALLOWED_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1); // Exit process with failure
    }
};

// Call the database connection function
connectDB();

app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',  process.env.ALLOWED_ORIGIN
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const authRoutes = require("./src/routes/auth");
app.use("/", authRoutes);

const tasksRoutes = require("./src/routes/tasks");

app.use("/api/tasks", tasksRoutes);

const categoriesRoutes = require("./src/routes/categories");

app.use("/api/categories", categoriesRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
