import productService from "../services/product.service";
import { Request, Response } from "express";

class ProductController{
    // get all products and filter by category
    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            // get the category
            const category = req.query.category as string;

            // validate category
            if (category) {
                const filter = await productService.filterProducts(category);
                res.status(200).json(filter);
                return; 
            } else {
                const product = await productService.getProducts();
                res.status(200).json(product);
            }
        } catch (error) {
            if (error instanceof Error && error.message.includes('No products found in this category')) {
                res.status(404).json({error: 'No products found in this category'});
                return;
            }
            res.status(500).json({
                error: 'Error in server for show products', 
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // get product by id
    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const Id = req.params.id;
            
            // validate ID
            if (!Id || isNaN(Number(Id))) {
                res.status(400).json({
                    error: 'Invalid product ID', 
                    message: 'Add an Id valid'
                });
                return;
            }
            
            const product = await productService.getProductById(Number(Id));
            
            res.status(200).json(product);

        } catch (error) {
            if (error instanceof Error && error.message.includes('Product not found')) {
                res.status(404).json({error: 'Product not found'});
                return;
            }
            res.status(500).json({
                error: `Error fetching product: ${error}`
            });
        }
    }
    // add new product
    async addProduct(req: Request, res: Response): Promise<void> {
        try {
            const {name, price, category, description} = req.body;
            
            // validate request body
            if (!name || !price || !category || !description) {
                res.status(400).json({
                    error: 'Invalid request body',
                    message: 'All the data is required: name, price, category, description'
                })
                return;
            }

            // add new product
            const newProduct = await productService.addProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            // validate if product already exists
            if (error instanceof Error && error.message.includes('Product already exists')) {
                res.status(409).json({error: 'Product already exists'});
                return;
            }
            res.status(500).json({
                error: `Error in server for add product: ${error}`
            })
        }
    }
}

export default new ProductController();