import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/user';
import {
  mockBadEmail,
  mockBadPassword,
  mockBadUser,
  mockBadUsername,
  mockOkUser,
} from './test-data';

describe('main app tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_TEST_URI || '';
    await mongoose.connect(mongoUri);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('/auth/signup returns 404 on get', async () => {
    const response = await request(app).get('/auth/signup');
    expect(response.statusCode).toBe(404);
  });

  test('/auth/signup post registers new user on happy path', async () => {
    const response = await request(app).post('/auth/signup').send(mockOkUser);
    expect(response.statusCode).toBe(201);
    const body = response.body;
    const keys = Array.from(Object.keys(body));
    expect(keys).toHaveLength(1);
    expect(keys[0]).toEqual('userId');
  });

  test('/auth/signup post returns 400 on request with invalid name', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(mockBadUsername);
    expect(response.statusCode).toBe(400);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0]).toEqual('Invalid username');
  });

  test('/auth/signup post returns 400 on request with invalid email', async () => {
    const response = await request(app).post('/auth/signup').send(mockBadEmail);
    expect(response.statusCode).toBe(400);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0]).toEqual('Invalid email');
  });

  test('/auth/signup post returns 400 on request with already registered email', async () => {
    let response = await request(app).post('/auth/signup').send(mockOkUser);
    expect(response.statusCode).toBe(201);
    response = await request(app).post('/auth/signup').send(mockOkUser);
    expect(response.statusCode).toBe(400);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0]).toEqual('Invalid email');
  });

  test('/auth/signup post returns 400 on request with invalid password', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(mockBadPassword);
    expect(response.statusCode).toBe(400);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0]).toEqual('Invalid password');
  });

  test('/auth/signup post returns 400 on request with multiple errors', async () => {
    const response = await request(app).post('/auth/signup').send(mockBadUser);
    expect(response.statusCode).toBe(400);
    const body = response.body as { errors: string[] };
    expect(body.errors).toHaveLength(3);
    expect(body.errors[0]).toEqual('Invalid email');
    expect(body.errors[1]).toEqual('Invalid password');
    expect(body.errors[2]).toEqual('Invalid username');
  });
});
