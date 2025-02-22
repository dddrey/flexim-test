import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import connectDB from "./config/db";
import Supplier from "./models/Supplier";
import Product from "./models/Product";

const NUM_SUPPLIERS = 30;
const NUM_PRODUCTS = 150;

console.log("🔄 Starting seeding...");

const generateRandomSupplier = () => ({
  name: faker.company.name(),
  country: faker.location.country(),
});

const generateRandomProduct = (supplierId: mongoose.Types.ObjectId) => ({
  name: faker.commerce.productName(),
  sku: faker.number.int({ min: 100000000000000, max: 999999999999999 }),
  description: faker.commerce.productDescription(),
  manufactoringDate: faker.date.past(),
  supplier: supplierId,
});

const seedDatabase = async () => {
  try {
    await connectDB();

    const suppliers = [];
    for (let i = 0; i < NUM_SUPPLIERS; i++) {
      const supplierData = generateRandomSupplier();
      const supplier = new Supplier(supplierData);
      suppliers.push(await supplier.save());
      console.log(`✅ Added supplier ${supplierData.name}`);
    }

    for (let i = 0; i < NUM_PRODUCTS; i++) {
      const randomSupplier =
        suppliers[faker.number.int({ min: 0, max: NUM_SUPPLIERS - 1 })];
      const productData = generateRandomProduct(randomSupplier.id);
      const product = new Product(productData);
      await product.save();
      console.log(`✅ Product ${productData.name} added`);
    }

    console.log("✅ Seeds executed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during database seeding:", error);
    process.exit(1);
  }
};

seedDatabase();
