import express, { Express } from "express";
import dotenv from "dotenv";
import * as path from "path";
import connectDB from "./config/db";
import cors from "cors";
import questionRouter from "./routes/questionRoutes";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app: Express = express();

connectDB();
const PORT = process.env.PORT || "6000";
const secret = process.env.SESSION_SECRET || "";
app.listen(PORT, () => {
  console.log(`Connected to Port ${PORT}`);
});
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", questionRouter);
