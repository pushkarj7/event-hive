import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

connectDB();
