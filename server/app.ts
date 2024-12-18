import express, { Express, json, urlencoded } from 'express';
import { join } from 'path';
import { nodeEnv } from './config/environment';

import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { router } from './routes/router';
import serverError from './middleware/errorMiddleware';
import { errorWrapper } from './utils';
import { apiLimiter } from './middleware/apiLimiter';

const app: Express = express();

app.use([
  json(),
  urlencoded({ extended: false }),
  compression(),
  cookieParser(),
  cors(),
]);

app.use('/api/v1', router);
app.use('/api/v1', apiLimiter);

if (nodeEnv === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'dist')));

  app.get(
    '*',
    errorWrapper((req, res) => {
      res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
    }),
  );
}

app.use(serverError);

export default app;
