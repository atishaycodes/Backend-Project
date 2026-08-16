import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.error("Express server error:", err);
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });
