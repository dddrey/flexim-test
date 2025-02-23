import express from "express";
import { getProducts } from "../controllers/ProductsController";
import { query } from "express-validator";

const router = express.Router();

router.get(
  "/",
  [
    query("page")
      .optional()
      .default("1")
      .isInt({ gt: 0 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .default("15")
      .isInt({ gt: 0, lt: 101 })
      .withMessage("Limit must be a positive integer between 1 and 100"),
    query("sort")
      .optional()
      .default("name")
      .isIn([
        "name",
        "sku",
        "description",
        "manufactoringDate",
        "supplier.name",
      ])
      .withMessage("Invalid sort field"),
    query("order")
      .optional()
      .default("asc")
      .isIn(["asc", "desc"])
      .withMessage("Order must be 'asc' or 'desc'"),
    query("search")
      .optional()
      .default("")
      .isString()
      .withMessage("Search must be a string"),
  ],
  getProducts
);

export default router;
