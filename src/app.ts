/* eslint-disable no-undef */
import express, { Application } from 'express';
import cors from 'cors';
// import { ApiError } from './errors/ApiError'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { UsersRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application router
app.use('/api/v1/users/', UsersRoutes);

// testing
app.get('/', () => {
  // throw new ApiError(400, 'Ore baba! Error')
  throw new Error('Testing error logger');
});

//global error handler
app.use(globalErrorHandler);

export default app;
