import app from '../../server';
import { Product } from '../../models/product';
import supertest from 'supertest';

const request = supertest(app);

describe('- Product Handler:', () => {
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
  });

  it('Get all products', async () => {
    const response = await request.get('/products');
    const products = response.body as Product[];
    expect(response.status).toBe(200);
    expect(products[0]).toBeTruthy();
  });

  it('Show product with id 1', async () => {
    const product = await request.get('/products/1');
    expect(product.body.id).toBe(1);
  });

  it('Update product', async () => {
    const updateProduct: Product = {
      id: 1,
      name: 'Mini Massai',
      price: 2190,
      category: 'Juguete'
    };
    const newProduct = await request.put('/products/1').send(updateProduct);
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
    const product = await request.delete('/products/1');
    const select = await request.get('/products/1');
    expect(product.status).toBe(200);
    expect(product.body.id).toBe(1);
    expect(select.status).toBe(500);
  });
});
