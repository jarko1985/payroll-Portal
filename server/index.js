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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", UserRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MONGO DB Connected Success!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started Listening on PORT ${process.env.PORT}`);
});
