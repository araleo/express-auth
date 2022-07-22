import authRoutes from './routes/auth';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { corsConfig } from './config/config';
import cors from 'cors';
import errMiddleware from './middlewares/error';
import express from 'express';
import helmet from 'helmet';
import notFoundMiddleware from './middlewares/notfound';

const app = express();

if (process.env.ENV === 'dev') {
  app.use(cors(corsConfig));
}

app.use(compression());

app.use(helmet());

app.use(bodyParser.json());

app.use(cookieParser());

app.use('/auth', authRoutes);

app.use(notFoundMiddleware);

app.use(errMiddleware);

export default app;
