import mongoose, { Schema, Document } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  country: string;
  products: mongoose.Types.ObjectId[];
}

const SupplierSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

export const Supplier = mongoose.model<ISupplier>("Supplier", SupplierSchema);
