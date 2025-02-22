import mongoose, { Schema, Document } from "mongoose";

interface Supplier extends Document {
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

const Supplier = mongoose.model<Supplier>("Supplier", SupplierSchema);

export default Supplier;
