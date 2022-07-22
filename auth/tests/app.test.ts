import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';

describe('main app tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_TEST_URI || '';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('root returns 404', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});
