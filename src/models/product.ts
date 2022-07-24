import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async create(product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO products (name, price, category) 
        VALUES ($1, $2, $3) 
        RETURNING *;`;
      const { name, price, category } = product;

      const result = await Client.query(sql, [name, price, category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product: ${err}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await Client.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id = $1;';
      const result = await Client.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product: ${err}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE products 
      SET name = $1, price = $2, category = $3 
      WHERE id = $4 
      RETURNING *;`;

      const { name, price, category, id } = product;

      const result = await Client.query(sql, [name, price, category, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM products WHERE id = $1 RETURNING *;`;
      const result = await Client.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product: ${err}`);
    }
  }

  // Get the 5 most popular products
  async top5Products(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT products.id,products.name,count(order_products.product_id)
      FROM products
      INNER JOIN order_products
      ON product.id = order_products.id
      GROUP BY products.id
      ORDER BY count(order_products.product_id) DESC
      LIMIT 5;`;

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get top 5 products: ${err}`);
    }
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE category = $1;`;
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products by category: ${err}`);
    }
  }
}
