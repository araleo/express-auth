const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const { corsConfig } = require('./config/cors.config');
const {
  mongoUser,
  mongoPass,
  mongoIp,
  mongoPort,
  mongoDb,
} = require('./config/config');

const app = express();
const port = 3001;
const host = '0.0.0.0';
const mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoIp}:${mongoPort}/${mongoDb}?authSource=admin`;

app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.ENV === 'dev') {
  app.use(cors(corsConfig));
}

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Auth' });
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ error: true, message: message, data: data });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Listening at ${port}`);
    });
  })
  .catch((e) => console.log(e));
