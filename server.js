dotenv.config();
import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import cors from "cors";
const port = process.env.PORT || 8000;
connectDB();
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("working...............");
});

app.listen(port, () => {
  console.log(`server started at port 7000`);
});
