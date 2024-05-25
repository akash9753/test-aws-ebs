dotenv.config();
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

const PORT = process.env.PORT || 8000;
connectDB();
const app = express();

const demo = [
  { name: "akash" },
  {name: "varun",},
];

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("working...............");
});

app.get("/demo", (req, res) => {
  res.send(demo);
});

app.listen(PORT, () => {
  console.log(`server started at port 7000`);
});
