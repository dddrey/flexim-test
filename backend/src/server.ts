import "./config/env";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";

console.log("✅ Server is starting...");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5555;

app.get("/", (req, res) => {
  res.send("Hello");
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
