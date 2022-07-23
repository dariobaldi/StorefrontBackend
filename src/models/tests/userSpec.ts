import { User, UserStore } from '../user';

const store = new UserStore();

describe('- User Model Tests', () => {
  it('Should create a user with correct name', async () => {
    const user: User = {
      first_name: 'Juan',
      last_name: 'Perez',
      password: 'password'
    };
    const newUser = await store.create(user);
    expect([newUser.first_name, newUser.last_name]).toEqual(['Juan', 'Perez']);
  });

  it('Index should return at least 1 user (we just created 1)', async () => {
    const users = await store.index();
    expect(users[0]).toBeTruthy();
  });

  it('Show should return a user with id 1', async () => {
    const user = await store.show(1);
    expect(user.id).toBe(1);
  });

  it('Update user with id=1', async () => {
    const user: User = { first_name: 'Victoria', last_name: 'Sosa', id: 1 };
    const newUser = await store.update(user);
    expect([newUser.first_name, newUser.last_name]).toEqual([
      'Victoria',
      'Sosa'
    ]);
  });

  it('Accept right password', async () => {
    const log_user: User = {
      id: 1,
      first_name: 'Victoria',
      last_name: 'Sosa',
      password: 'password'
    };
    await expectAsync(store.authenticate(log_user)).toBeResolved();
  });

  it('Reject wrong password', async () => {
    const log_user: User = {
      id: 1,
      first_name: 'Juan',
      last_name: 'Perez',
      password: 'pa$$word'
    };
    await expectAsync(store.authenticate(log_user)).toBeRejected();
  });

  it('Delete user with id 1', async () => {
    const user = await store.delete(1);
    const select = await store.show(1);
    expect(user.id).toBe(1);
    expect(select).toBeFalsy();
  });
});
