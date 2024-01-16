import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

// configure app
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);

export { app };
