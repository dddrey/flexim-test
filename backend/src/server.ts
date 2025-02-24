import "./config/env";
import "./models";

import express from "express";
import cors from "cors";

import connectDB from "./config/db";
import routes from "./routes";
import { setupSwagger } from "./swagger";

console.log("Server is starting...");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5555;

app.use("/api", routes);
setupSwagger(app);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
