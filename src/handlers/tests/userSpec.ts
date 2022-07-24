import app from '../../server';
import { User, UserStore } from '../../models/user';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const secret_token = process.env.SECRET_TOKEN as unknown as string;

const request = supertest(app);

describe('- User Handler:', () => {
    const user: User = {
        username: 'mari',
        first_name: 'Mariela',
        last_name: 'Del Barrio',
        password: 'oculto'
      };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYXJpIiwiZmlyc3RfbmFtZSI6Ik1hcmllbGEiLCJsYXN0X25hbWUiOiJEZWwgQmFycmlvIiwiaWF0IjoxNjU4NjQ0NDg1fQ.IDW55pCtF9bNgzBPCkWahAXGm7XhedfJ--3NF7ckNlg';


    it('Create a user', async () => {
        const response = await request.post('/users').send(user);
        expect(response.status).toBe(201);
    });

    it('Get all users', async () => {
        const response = await request.get('/users').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        const users =  response.body as User[];
        expect(users[0]).toBeTruthy();
    });

    it('Show user with id=1', async () => {
        const response = await request.get('/users/1').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        const user_1 = response.body as User;
        expect(user_1.id).toEqual(1);
    });

    it('Update user with id=1', async () => {
        const update_user: User = {
            id: 1,
            username: 'mari',
            first_name: 'Mariela',
            last_name: 'Del Barrio Fernandez',
        }
        const response = await request.put('/users/1').set('Authorization', 'Bearer ' + token).send(update_user);
        expect(response.status).toBe(200);
        const user_1 = response.body as User;
        expect(user_1.last_name).toEqual('Del Barrio Fernandez');
    });

    it('Block update if id does not match token', async () => {
        const update_user: User = {
            id: 2,
            username: 'mari',
            first_name: 'Mariela',
            last_name: 'Del Barrio Fernandez',
        }
        const response = await request.put('/users/2').set('Authorization', 'Bearer ' + token).send(update_user);
        expect(response.status).toBe(401);
        expect(response.body.error).toEqual('Unauthorized');
    });

    it('Authenticate password and verify token', async () => {
        const response = await request.post('/users/authenticate').send(user);
        expect(response.status).toBe(200);
        const res_token = response.body;
        const decoded = jwt.verify(res_token, secret_token) as User;
        expect(decoded.username).toBe(user.username);
    });

    it('Delete user with id=1', async () => {
        const response = await request.delete('/users/1').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        const user_1 = response.body as User;
        expect(user_1.id).toEqual(1);
    });

}); 
            