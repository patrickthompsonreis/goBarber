import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'testPassword',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same e-mail adress', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'testPassword',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'testPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});