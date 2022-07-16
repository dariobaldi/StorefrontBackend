import { User, UserStore } from "../user";

const store = new UserStore();

describe('User Model', () => {
    it('Should create a user with correct name', async () => {
        const user: User = {first_name: 'Juan', last_name: 'Perez', password: 'password'};
        const newUser = await store.create(user);
        expect([newUser.first_name, newUser.last_name]).toEqual(['Juan', 'Perez']);
    });

    it('Index should return at least 1 user (we just created 1)', async () => {
        const users = await store.index();
        expect(users[0]).toBeTruthy();
    });
});