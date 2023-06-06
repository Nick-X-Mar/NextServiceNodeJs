// app.js

// Import required modules
import express from 'express';
import usersRouter from './users';
import customersRouter from './customers';
import { ErrorHandler, handleError } from './errorMiddleware';

// Initialize express app
const app = express();

// Use JSON body parser
app.use(express.json());

// Use usersRouter for '/users' route
app.use('/users', usersRouter);

// Use customersRouter for '/customers' route
app.use('/customers', customersRouter);

// Error middleware
app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    handleError(err, res);
  } else {
    next(err);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
