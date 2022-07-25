import app from '../../server';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { Order, OrderProduct } from '../../models/order';
import supertest from 'supertest';

const request = supertest(app);

describe('- Order Handler:', () => {
});