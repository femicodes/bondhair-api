import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import Response from './utils/Response';
import router from './routes';

config();

const app = express();
const port = process.env.PORT || 7000;
const logger = debug('server');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/v1', router);

app.get('/', (req, res) => Response.success(res, 200, 'Bond hair\'s API'));

app.use((err, req, res, next) => {
  // We log the error internaly
  logger('err > ', err);

  // Remove error's `stack` property. We don't want users to see this at the production env
  const error = process.env.NODE_ENV === 'development' ? err : {};

  Response.error(res, err.status || 500, error);
  next();
});

app.all('*', (req, res) => {
  Response.error(res, 404, 'route is invalid');
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  logger('Database connected..');
});

app.listen(port, () => logger(`Server running on port ${port}`));

export default app;
