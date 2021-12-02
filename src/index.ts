import 'reflect-metadata';

import express from 'express';

import './database/connect';
import routes from './routes/index';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorMiddleware);

app.listen(3000, () => console.log('Server rodando'));
