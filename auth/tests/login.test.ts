import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/user';
import {
  mockBadEmailLogin,
  mockBadPasswordLogin,
  mockNoEmailLogin,
  mockOkLogin,
  mockOkUser,
  mockWrongPasswordLogin,
} from './test-data';

describe('login tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_TEST_URI || '';
    await mongoose.connect(mongoUri);
    await request(app).post('/auth/signup').send(mockOkUser);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test('/auth/login returns 404 on get', async () => {
    const response = await request(app).get('/auth/login');
    expect(response.statusCode).toBe(404);
  });

  test('/auth/login logs user on happy path', async () => {
    const response = await request(app).post('/auth/login').send(mockOkLogin);
    expect(response.statusCode).toBe(200);
    const body = response.body;
    const keys = Array.from(Object.keys(body));
    expect(keys).toHaveLength(1);
    expect(keys[0]).toEqual('userId');
    const cookies = response.headers['set-cookie'][0]
      .split(',')
      .map((item: string) => item.split(';')[0]);
    const cookie: string = cookies.join(';');
    expect(cookie.startsWith('SESSIONID')).toBe(true);
  });

  test('/auth/login returns 400 on invalid email', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(mockBadEmailLogin);
    expect(response.statusCode).toBe(400);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0]).toEqual('Invalid email');
  });

  test('/auth/login returns 400 on invalid password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(mockBadPasswordLogin);
    expect(response.statusCode).toBe(400);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0]).toEqual('Invalid password');
  });

  test('/auth/login returns 401 on non existent email', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(mockNoEmailLogin);
    expect(response.statusCode).toBe(401);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0]).toEqual('Invalid credentials');
  });

  test('/auth/login returns 401 on wrong password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(mockWrongPasswordLogin);
    expect(response.statusCode).toBe(401);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0]).toEqual('Invalid credentials');
  });
});
