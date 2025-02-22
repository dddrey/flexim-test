import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  sku: number;
  description: string;
  supplier: mongoose.Types.ObjectId;
  manufactoringDate: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: Number, required: true },
    description: { type: String, required: true },
    manufactoringDate: { type: Schema.Types.Date, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
