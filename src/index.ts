import 'reflect-metadata';

import express from 'express';

import routes from './routes/index';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorMiddleware);

export default app;
