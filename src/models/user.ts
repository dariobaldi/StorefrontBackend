import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pepper: string = process.env.BCRYPT_PASSWORD as unknown as string;
const saltRounds: number = parseInt(
  process.env.SALT_ROUNDS as unknown as string
);

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password?: string;
    password_hash?: string;
}

export class UserStore {
    async create(user: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "INSERT INTO users (first_name, last_name, password_hash) VALUES ($1, $2, $3) RETURNING *;"
            const { first_name, last_name, password } = user;

            const password_hash = await bcrypt.hash(password + pepper, saltRounds);
            const result = await Client.query(
                sql,
                [first_name, last_name, password_hash]
            );
            conn.release();
            return result.rows[0];
        } catch(err){
            throw err;
        }
    }

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users"
            const result = await Client.query(sql);
            conn.release();
            return result.rows;
        } catch(err){
            throw err;
        }
    }

    async select(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users WHERE id = $1;"
            const result = await Client.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw err;
        }
    }

    async update(user: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *;"
            const { first_name, last_name, id } = user;

            const result = await Client.query(
                sql,
                [first_name, last_name, id]
            );
            conn.release();
            return result.rows[0];
        } catch(err){
            throw err;
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "DELETE FROM users WHERE id = $1 RETURNING *;"
            const result = await Client.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw err;
        }
    }

    async authenticatePassword(user: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT password_hash FROM users WHERE id=$1;"

            const result = await Client.query(
                sql,
                [user.id]
            );
            conn.release();
            if (result.rows.length === 0) {
                throw new Error("User not found");
            }
            
            const selected_user = result.rows[0];

            if(await bcrypt.compare(user.password+pepper, selected_user.password_hash)){
                return selected_user;
            }
            throw new Error("Password incorrect");
        } catch(err){
            throw err;
        }
    }
}