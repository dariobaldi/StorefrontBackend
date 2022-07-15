import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const create = async (req: Request, res: Response) => {
  try {
    const product = req.body as Product;
    const newProduct = await store.create(product);
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ error: 'Product was not created' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Product was not created' });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: `Could not get products: ${err}` });
  }
};

const select = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const product = await store.select(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: `Could not get product: ${err}` });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product = req.body as Product;
    const updatedProduct = await store.update(product);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: `Could not update product: ${err}` });
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const deletedProduct = await store.delete(id);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: `Could not delete product: ${err}` });
  }
};

const productRoutes = (app: express.Application) => {
  app.post('/api/products', create);
  app.get('/api/products', index);
  app.get('/api/products/:id', select);
  app.put('/api/products/:id', update);
  app.delete('/api/products/:id', del);
};

export default productRoutes;