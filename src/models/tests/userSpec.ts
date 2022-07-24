import { User, UserStore } from '../user';

const store = new UserStore();

describe('- User Model Tests', () => {
  const user: User = {
    username: 'juanpe',
    first_name: 'Juan',
    last_name: 'Perez',
    password: 'password'
  };

  it('Should create a user with correct name', async () => {
    const newUser = await store.create(user);
    expect([newUser.first_name, newUser.last_name]).toEqual(['Juan', 'Perez']);
  });

  it('Index should return at least 1 user (we just created 1)', async () => {
    const users = await store.index();
    expect(users[0]).toBeTruthy();
  });
  
  it('Accept right password', async () => {
    const log_user: User = {
      id: 1,
      username: 'juanpe',
      first_name: 'Victoria',
      last_name: 'Sosa',
      password: 'password'
    };
    await expectAsync(store.authenticate(log_user)).toBeResolved();
  });

  it('Reject wrong password', async () => {
    const log_user: User = {
      id: 1,
      username: 'juanpe',
      first_name: 'Juan',
      last_name: 'Perez',
      password: 'pa$$word'
    };
    await expectAsync(store.authenticate(log_user)).toBeRejected();
  });
  
  it('Show should return a user with id 1', async () => {
    const user = await store.show(1);
    expect(user.id).toBe(1);
  });

  it('Update user', async () => {
    const update_user: User = { username: 'juanpe', first_name: 'Victoria', last_name: 'Sosa', id: 2 };
    const newUser = await store.update(update_user);
    expect([newUser.first_name, newUser.last_name]).toEqual([
      'Victoria',
      'Sosa'
    ]);
  });


  it('Delete user with id 2', async () => {
    const user = await store.delete(2);
    const select = await store.show(2);
    expect(user.id).toBe(2);
    expect(select).toBeFalsy();
  });
});
