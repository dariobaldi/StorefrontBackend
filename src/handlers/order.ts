import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/order';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  const order = req.body as Order;
  try {
    const newOrder = await store.create(order);
    if (newOrder) {
      res.status(201).json(newOrder);
    } else {
      res.status(400).json({ error: 'Could not create order' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Order was not created' });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(400).json({ error: 'Could not get orders' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not get orders' });
  }
};

const select = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const order = await store.show(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(400).json({ error: 'Could not get order' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not get order' });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order = req.body as Order;
    const updatedOrder = await store.update(order);
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(400).json({ error: 'Could not update order' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not update order' });
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const deletedOrder = await store.delete(id);
    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(400).json({ error: 'Could not delete order' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not delete order' });
  }
};

const currentOrder = (req: Request, res: Response) => {
  try{
    const user_id = req.params.id as unknown as number;
    const orders = store.currentOrder(user_id);
    if(orders){
      res.status(200).json(orders);
    } else {
      res.status(400).json({ error: 'Could not get orders' });
    }
  } catch(err){
    res.status(500).json({ error: 'Could not get orders' });
  }
}

const completedOrders = async (req: Request, res: Response) => {
  try{
    const user_id = req.params.id as unknown as number;
    const orders = await store.completedOrders(user_id);
    if(orders){
      res.status(200).json(orders);
    } else {
      res.status(400).json({ error: 'Could not get orders' });
    }
  } catch(err){
    res.status(500).json({ error: 'Could not get orders' });
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderProduct = req.body as OrderProduct;
    const newOrderProduct = await store.addProduct(orderProduct);
    if (newOrderProduct) {
      res.status(201).json(newOrderProduct);
    } else {
      res.status(400).json({ error: 'Could not add product' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not add product' });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const orderProducts = await store.getProducts(id);
    if (orderProducts) {
      res.status(200).json(orderProducts);
    } else {
      res.status(400).json({ error: 'Could not get order products' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not get order products' });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const orderProduct = req.body as OrderProduct;
    const updatedOrderProduct = await store.updateProduct(orderProduct);
    if (updatedOrderProduct) {
      res.status(200).json(updatedOrderProduct);
    } else {
      res.status(400).json({ error: 'Could not update order product' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not update order product' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const deletedOrderProduct = await store.deleteProduct(id);
    if (deletedOrderProduct) {
      res.status(200).json(deletedOrderProduct);
    } else {
      res.status(400).json({ error: 'Could not delete order product' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not delete order product' });
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/api/orders', create);
  app.get('/api/orders', index);
  app.get('/api/orders/:id', select);
  app.put('/api/orders/:id', update);
  app.delete('/api/orders/:id', del);
  app.get('/api/orders/open/user/:id', currentOrder);
  app.get('/api/orders/completed/user/:id', completedOrders);
  app.post('/api/orders/:id/products', addProduct);
  app.get('/api/orders/:id/products', getProducts);
  app.put('/api/orders/:order_id/products/:product_id', updateProduct);
  app.delete('/api/orders/:order_id/products/:product_id', deleteProduct);
};

export default orderRoutes;