dotenv.config();
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import cors from "cors";
import PrefrenceTotal from "./models/PrefrenceTotal.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5050;
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Working.....");
});

app.get("/demo", async (req, res) => {
  try {
    const result = await PrefrenceTotal.find();
    res.send(result);
  } catch (error) {}
});


connectDB();
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port -- ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to db: ", error);
});
