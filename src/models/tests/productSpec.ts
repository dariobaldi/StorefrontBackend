import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('- Product Model', () => {
  let product_id: number;
  const product: Product = {
    name: 'Muñeco Francella',
    price: 1500,
    category: 'Toy'
  };

  it('Should create a product with correct info', async () => {
    const newProduct = await store.create(product);
    expect(newProduct.name).toBe(product.name);
    expect(newProduct.price).toBe(product.price);
    expect(newProduct.category).toBe(product.category);
    product_id = newProduct.id as number;
  });

  it('Index should return at least 1 product (we just created 1)', async () => {
    const products = await store.index();
    expect(products[0]).toBeTruthy();
  });

  it('Show product', async () => {
    const product = await store.show(product_id);
    expect(product.id).toBe(product_id);
  });

  it('Update product', async () => {
    const updateProduct: Product = {
      id: product_id,
      name: 'Muñeco Francellita',
      price: 1990,
      category: 'Juguete'
    };
    const newProduct = (await store.update(updateProduct)) as Product;
    expect(newProduct.name).toBe('Muñeco Francellita');
    expect(newProduct.price).toBe(1990);
    expect(newProduct.category).toBe('Juguete');
  });

  it('Delete product', async () => {
    const product = await store.delete(product_id);
    expect(product.id).toEqual(product_id);
  });
});
