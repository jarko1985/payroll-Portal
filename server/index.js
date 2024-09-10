import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://payroll-portal-backend.onrender.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", UserRouter);
const isProduction = process.env.NODE_ENV === "production";
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MONGO DB Connected Success!");
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});
if (isProduction) {
  console.log("Running in production mode");
} else {
  console.log("Running in development mode");
}

app.use("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server Started Listening on PORT ${process.env.PORT}`);
});
