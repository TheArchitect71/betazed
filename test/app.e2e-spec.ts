import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../src/app.module';
describe('offline tutorial login', () => {
  let app: INestApplication;
  beforeAll(async () => {
    process.env.JWT_SECRET = 'isolated-tutorial-test-secret';
    const m = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = m.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app?.close();
  });
  it.each([
    ['john', 'changeme', 1],
    ['chris', 'secret', 2],
    ['maria', 'guess', 3],
  ])('logs in %s', async (username, password, id) => {
    const r = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username, password })
      .expect(201);
    const jwt = new JwtService({ secret: process.env.JWT_SECRET }).verify(
      r.body.access_token,
    ) as { username: string; sub: number };
    expect(jwt.username).toBe(username);
    expect(jwt.sub).toBe(id);
  });
  it('rejects incorrect and missing credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'wrong' })
      .expect(401);
    await request(app.getHttpServer()).post('/auth/login').send({}).expect(401);
  });
});
