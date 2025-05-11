import express from "express";
import { Database } from "./Database";

const app = express();
const port = 3000;

// Свързваме се към базата данни (по желание можеш да тестваш връзката тук)
const db = new Database();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚗 Car Sales API is running!");
});

app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});
