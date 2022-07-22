import mongoose from 'mongoose';
import app from './app';
import { mongoConfig } from './config/config';

const { mongoUser, mongoPass, mongoIp, mongoPort, mongoDb } = mongoConfig;
const mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoIp}:${mongoPort}/${mongoDb}?authSource=admin`;

mongoose
  .connect(mongoUri)
  .then(() => {
    const port = process.env.PORT || '3001';
    const host = '0.0.0.0';
    app.listen(+port, host, () => {
      console.log('Listening on: ' + port);
    });
  })
  .catch((e: any) => {
    console.log(e);
  });
