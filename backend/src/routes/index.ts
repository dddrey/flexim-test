import express from "express";
import ProductRoutes from "./ProductRoutes";

const router = express.Router();

router.use("/products", ProductRoutes);

export default router;
