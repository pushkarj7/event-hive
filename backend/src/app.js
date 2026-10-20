import express from "express";
 import authRoutes from "./routes/authRoutes.js";
 import userRoutes from "./routes/userRoutes.js";
 import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
app.use(cors({origin: "http://localhost:5173/"}));
app.use(express.json());
app.use("/api/events",eventRoutes);

app.use(express.json());
app.use("/api/v1/users", userRoutes);


app.use("/api/v1/auth", authRoutes);

export default app;
