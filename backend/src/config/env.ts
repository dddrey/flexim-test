import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

console.log(".env loaded successfully");
