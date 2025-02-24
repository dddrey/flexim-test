import { Request, Response } from "express";
import { Product } from "../models/Product";
import { validationResult } from "express-validator";

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of products per page
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Field to sort by
 *         schema:
 *           type: string
 *           default: name
 *       - in: query
 *         name: order
 *         required: false
 *         description: Sort order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search term
 *         schema:
 *           type: string
 *           default: ""
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       sku:
 *                         type: string
 *                       description:
 *                         type: string
 *                       manufactoringDate:
 *                         type: string
 *                       supplier:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           address:
 *                             type: string
 * 
 *       404:
 *         description: No products found
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const {
      page = "1",
      limit = "10",
      sort = "name",
      order = "asc",
      search = "",
    } = req.query as {
      page?: string;
      limit?: string;
      sort?: string;
      order?: string;
      search?: string;
    };

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    const matchQuery: any = {};
    if (search) {
      matchQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { "supplierData.name": { $regex: search, $options: "i" } },
      ];
    }

    let sortField: any = {};
    if (sort === "supplier.name") {
      sortField = { "supplierData.name": order === "desc" ? -1 : 1 };
    } else {
      sortField = { [sort]: order === "desc" ? -1 : 1 };
    }

    const products = await Product.aggregate([
      {
        $lookup: {
          from: "suppliers",
          localField: "supplier",
          foreignField: "_id",
          as: "supplierData",
        },
      },
      { $unwind: "$supplierData" },
      { $match: matchQuery },
      { $sort: sortField },
      { $skip: skip },
      { $limit: pageSize },
      {
        $project: {
          _id: 1,
          name: 1,
          sku: 1,
          description: 1,
          manufactoringDate: 1,
          createdAt: 1,
          updatedAt: 1,
          supplier: {
            _id: "$supplierData._id",
            name: "$supplierData.name",
            address: "$supplierData.address",
          },
        },
      },
    ]);

    const totalProducts = await Product.aggregate([
      {
        $lookup: {
          from: "suppliers",
          localField: "supplier",
          foreignField: "_id",
          as: "supplierData",
        },
      },
      { $unwind: "$supplierData" },
      { $match: matchQuery },
      { $count: "total" },
    ]);

    res.status(200).json({
      total: totalProducts[0]?.total || 0,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil((totalProducts[0]?.total || 0) / pageSize),
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
