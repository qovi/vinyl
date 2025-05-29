import { eq } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema";
import { handleResult } from "../lib/utils";

type Product = typeof products.$inferSelect;

export class ProductService {
    /**
     * Get all products from the database
     * @returns {Promise<Product[]>}
     */
    static async getAllProducts(): Promise<Product[]> {
        return await db.select().from(products);
    }

    /**
     * Get a product by its id
     * @param id - The id of the product
     * @returns {Promise<Product>}
     * @throws {Error} If the product is not found
     */
    static async getProductById(id: number): Promise<Product> {
        const result = await db.select().from(products).where(eq(products.id, id));
        return handleResult(result, `Failed to find product with id ${id}`);
    }

    /**
     * Create a new product
     * @param data - The data to create the product with
     * @returns {Promise<Product>}
     * @throws {Error} If the product is not created
     */
    static async createProduct(data: Product): Promise<Product> {
        const now = new Date();
        const result = await db
            .insert(products)
            .values({ ...data, createdAt: now, updatedAt: now })
            .returning();
        return handleResult(result, `Failed to create product`);
    }

    /**
     * Update a product by its id
     * @param id - The id of the product
     * @param data - The data to update the product with
     * @returns {Promise<Product>}
     * @throws {Error} If the product is not found
     */
    static async updateProduct(id: number, data: Product): Promise<Product> {
        const result = await db
            .update(products)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(products.id, id))
            .returning();
        return handleResult(result, `Failed to update product with id ${id}`);
    }
    
    /**
     * Delete a product by its id
     * @param id - The id of the product
     * @returns {Promise<Product>}
     * @throws {Error} If the product is not found
     */
    static async deleteProduct(id: number): Promise<Product> {
        const result = await db.delete(products).where(eq(products.id, id)).returning();
        return handleResult(result, `Failed to delete product with id ${id}`);
    }
}
