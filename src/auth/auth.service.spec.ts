import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
it('validates tutorial passwords without exposing hashes', async () => {
  const s = new AuthService(new UsersService(), {
    sign: jest.fn(),
  } as unknown as JwtService);
  expect(await s.validateUser('john', 'changeme')).toEqual({
    userId: 1,
    username: 'john',
  });
  expect(await s.validateUser('john', 'wrong')).toBeNull();
  expect(await s.validateUser('unknown', 'changeme')).toBeNull();
});
it('preserves numeric tutorial JWT subject', async () => {
  const jwt = { sign: jest.fn().mockReturnValue('token') };
  const s = new AuthService(new UsersService(), jwt as unknown as JwtService);
  expect(await s.login({ userId: 1, username: 'john' })).toEqual({
    access_token: 'token',
  });
  expect(jwt.sign).toHaveBeenCalledWith({ username: 'john', sub: 1 });
});
