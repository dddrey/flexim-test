import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object 
 *       required:
 *         - _id
 *         - name
 *         - country
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         country:
 *           type: string
 */
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
