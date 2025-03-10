const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database!");
});

const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});