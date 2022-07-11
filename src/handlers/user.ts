import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();
const secret_token = process.env.SECRET_TOKEN as unknown as string;

const create = async (req: Request, res: Response) => {
    const user = req.body as User;
    try{
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, secret_token);
        if (newUser) {
            res.status(201).json(token);
        } else {
            res.status(400).json({ error: 'User was not created' });
        }
    } catch(err){
        res.status(400).json({ error: 'User was not created' });
    }
}


const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch(err) {
        res.status(500).json({ error: err});
    }
}

const select = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        const user = await store.select(id);
        res.json(user);
    } catch(err) {
        res.status(500).json({ error: err});
    }
}

const edit = async (req: Request, res: Response) => {
    const user = req.body as User;
    try {
        const updatedUser = await store.update(user);
        res.json(updatedUser);
    } catch(err) {
        res.status(500).json({ error: err});
    }
}

const del = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    try {
        const deletedUser = await store.delete(id);
        res.json(deletedUser);
    } catch(err) {
        res.status(500).json({ error: err});
    }
}

const authenticatePassword = async (req: Request, res: Response) => {
    const user = req.body as User;
    try {
        const authenticatedUser = await store.authenticatePassword(user);
        if (authenticatedUser) {
            const token = jwt.sign({ user: authenticatedUser }, secret_token);
            res.json(token);
        } else {
            res.status(400).json({ error: 'User was not authenticated' });
        }
    } catch(err) {
        res.status(500).json({ error: err});
    }
}

export const verifyToken = async (req: Request, res: Response, next: Function) => {
    const authHeader = req.headers.authorization as string;
    const token = authHeader
    if (token) {
        try {
            const decoded = jwt.verify(token, secret_token);
            // @ts-ignore
            req.user = decoded.user;
            next();
        } catch(err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
}

const userRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users', index);
    app.get('/users/:id', select);
    app.put('/users/:id', edit);
    app.delete('/users/:id', del);
    app.post('/users/authenticate', authenticatePassword);
}

export default userRoutes;

