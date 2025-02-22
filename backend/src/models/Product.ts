import mongoose, { Schema, Document } from "mongoose";
import Supplier from "./Supplier";

interface Product extends Document {
  name: string;
  price: number;
  quantity: number;
  supplier: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<Product>("Product", ProductSchema);

export default Product;
