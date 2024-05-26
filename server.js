dotenv.config();
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import cors from "cors";
import PrefrenceTotal from "./src/meal/PrefrenceTotalModel.js";
import { globalErrorHandler } from "./src/common/middleware/globalErrorHandler.js";
import cookieParser from "cookie-parser";
connectDB();

//Router
import PrefrenceTotalRoute from "./src/meal/PrefrenceTotalRoute.js"
import UserRoute from "./src/user/UserRoute.js"
import AuthRoute from "./src/auth/AuthRoute.js"


const app = express();
app.use(
  cors({
      //todo move to .env
      origin: ["http://localhost:5173"],
      credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5050;
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Working...");
});

app.get("/demo", async (req, res) => {
  try {
    const result = await PrefrenceTotal.find();
    res.send(result);
  } catch (error) {}
});

app.use("/meal", PrefrenceTotalRoute)
app.use("/user", UserRoute)
app.use("/auth",AuthRoute)

app.use(globalErrorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port -- ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to db: ", error);
});
