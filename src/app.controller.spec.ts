import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
it('passes authenticated user to login', async () => {
  const auth = {
    login: jest.fn().mockResolvedValue({ access_token: 'token' }),
  };
  const c = new AppController(auth as unknown as AuthService);
  expect(await c.login({ user: { userId: 1 } })).toEqual({
    access_token: 'token',
  });
  expect(auth.login).toHaveBeenCalledWith({ userId: 1 });
});
