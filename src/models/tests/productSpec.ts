import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('- Product Model', () => {
  const product: Product = {
    name: 'Muñeco Francella',
    price: 15,
    category: 'Toy'
  };

  it('Should create a product with correct name', async () => {
    const newProduct = await store.create(product);
    expect(newProduct.name).toBe('Muñeco Francella');
  });

  it('Index should return at least 1 product (we just created 1)', async () => {
    const products = await store.index();
    expect(products[0]).toBeTruthy();
  });

  it('Show product with id 3', async () => {
    const product = await store.show(3);
    expect(product.id).toBe(3);
  });

  it('Update product', async () => {
    const updateProduct: Product = {
      id: 3,
      name: 'Muñeco Francellita',
      price: 1590,
      category: 'Juguete'
    };
    const newProduct = (await store.update(updateProduct)) as Product;
    expect(newProduct.name).toBe('Muñeco Francellita');
    expect(newProduct.price).toBe(1590);
    expect(newProduct.category).toBe('Juguete');
  });

  it('Delete product with id 3', async () => {
    const product = await store.delete(3);
    expect(product.id).toEqual(3);
  });
});
