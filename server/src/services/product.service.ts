import { product } from "../data/product.data";
import { ProductModel } from "../models/product";

// Product service
class ProductService {
    // get all products
    async getProducts(): Promise<ProductModel[]> {
        try {
            // check if product data is empty
            if (product.length === 0) {
                throw new Error('No products found');
            }
            // return all products
            return product;
        } catch (error) {
            throw new Error(`Error fetching products: ${error}`)
        }
    }
    // get product by id
    async getProductById(id: number): Promise<ProductModel> {
        try {
            const productSheared = product.find((p) => p.id === id);
            // if product not foud, throw an error
            if (!productSheared) {
                throw new Error('Product not found');
            };
            // return product
            return productSheared;
        } catch (error) {
            throw new Error(`Error fetching product: ${error}`);
        }
    }
    // filter products by category
    async filterProducts(category: string): Promise<ProductModel[]> {
        try {
            // filter
            const filterProducts = product.filter((p) => p.category.toLowerCase() === category.toLowerCase());
            // if no products found
            if (filterProducts.length === 0) {
                throw new Error('No products found in this category');
            }
            // return filtered products
            return filterProducts;
        } catch (error) {
            throw new Error(`Error filtering products: ${error}`);
        }
    }
    // add new product
    async addProduct(newProduct: Omit<ProductModel, 'id'>): Promise<ProductModel> {
        try {
            // generate new ID
            let nextId = product.length + 1;
            // check a product with ID already exists
            if (product.some(p => p.id === nextId)) {
                // if exists, find the max ID and increment
                nextId = Math.max(...product.map(p => p.id)) + 1;
            }
            // create new product with the next ID
            const producto: ProductModel = {...newProduct, id: nextId++};

            // validate product already exists
            if (product.some(p => p.name.toLowerCase() === producto.name.toLowerCase())) {
                throw new Error('Product already exists');
            }

            // add new product to the array
            product.push(producto);

            return producto;
        } catch (error) {
            throw new Error(`Error adding product: ${error}`);
        }
    }
}

export default new ProductService();