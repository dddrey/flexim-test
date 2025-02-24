import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API for managing products",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5555}/api`,
      },
    ],
  },
  apis: ["./src/controllers/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.get("/openapi.json", (_req, res) => res.json(swaggerSpec));
}
