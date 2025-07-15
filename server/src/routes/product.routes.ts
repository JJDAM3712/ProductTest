import { Router } from 'express';
import productController from '../controller/product.controller';

const router: Router = Router();

// Route all products
/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get all products or filter by category
 *     description: List all products or filter by category
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional category filter
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Invalid request parameters
 */
router.get('/products', productController.getProducts);
/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid ID format
 */
router.get('/products/:id', productController.getProductById);
/**
 *    @openapi
 *    /api/products:
 *        post:
 *            summary: Add a new product
 *            requestBody:
 *                required: true
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            required:
 *                                - name
 *                                - category
 *                                - price
 *                            properties:
 *                                name:
 *                                    type: string
 *                                category:
 *                                    type: string
 *                                price:
 *                                    type: number
 *                                description:
 *                                    type: sting
 *            responses:
 *                201:
 *                    description: Add a new Product
 *                400:
 *                    description: Invalid request body
 *         
 */
router.post('/products', productController.addProduct);


export default router;