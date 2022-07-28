import app from '../../server';
import { Product } from '../../models/product';
import supertest from 'supertest';

const request = supertest(app);

describe('- Product Handler:', () => {
  let product_id: number;
  const product: Product = {
    name: 'Muñeca Mimish',
    price: 2500,
    category: 'Toy'
  };
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYXJpIiwiZmlyc3RfbmFtZSI6Ik1hcmllbGEiLCJsYXN0X25hbWUiOiJEZWwgQmFycmlvIiwiaWF0IjoxNjU4NjQ0NDg1fQ.IDW55pCtF9bNgzBPCkWahAXGm7XhedfJ--3NF7ckNlg';

  it('Create a product', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send(product);
    const newProduct = response.body as Product;
    expect(response.status).toBe(201);
    expect(newProduct.name).toBe('Muñeca Mimish');
    expect(newProduct.price).toBe(2500);
    expect(newProduct.category).toBe('Toy');
    product_id = newProduct.id as number;
  });

  it('Get all products', async () => {
    const response = await request.get('/products');
    const products = response.body as Product[];
    expect(response.status).toBe(200);
    expect(products[0]).toBeTruthy();
  });

  it('Show product by id', async () => {
    const product = await request.get(`/products/${product_id}`);
    expect(product.body.id).toBe(product_id);
  });

  it('Update product', async () => {
    const updateProduct: Product = {
      id: product_id,
      name: 'Mini Massai',
      price: 2190,
      category: 'Juguete'
    };
    const newProduct = await request
      .put(`/products/${product_id}`)
      .send(updateProduct);
    expect(newProduct.body.name).toBe('Mini Massai');
    expect(newProduct.body.price).toBe(2190);
    expect(newProduct.body.category).toBe('Juguete');
  });

  it('Get products by category', async () => {
    const response = await request.get('/products/category/Juguete');
    const products = response.body as Product[];
    expect(response.status).toBe(200);
    expect(products[0]).toBeTruthy();
  });

  it('Delete product with id 1', async () => {
    const product = await request.delete(`/products/${product_id}`);
    const select = await request.get(`/products/${product_id}`);
    expect(product.status).toBe(200);
    expect(product.body.id).toBe(product_id);
    expect(select.status).toBe(500);
  });
});
