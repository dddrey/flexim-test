import mongoose, { Schema, Document } from "mongoose";
import { ISupplier } from "./Supplier";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - sku
 *         - description
 *         - manufactoringDate
 *         - supplier
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         sku:
 *           type: string
 *         description:
 *           type: string
 *         manufactoringDate:
 *           type: string
 *         supplier:
 *           $ref: '#/components/schemas/Supplier'
 */
export interface IProduct extends Document {
  name: string;
  sku: string;
  description: string;
  supplier: ISupplier;
  manufactoringDate: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    description: { type: String, required: true },
    manufactoringDate: { type: Schema.Types.Date, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
