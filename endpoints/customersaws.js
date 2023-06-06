// customers.js

// Import dependencies
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import { ErrorHandler, handleError } from './errorMiddleware';

// Initialize AWS DynamoDB client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Create Express Router
const router = express.Router();

// Define CRUD endpoints for customers

// Get all customers
router.get('/', async (req, res) => {
  try {
    const params = {
      TableName: 'customers'
    };
    const data = await dynamoDB.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (err) {
    handleError(new ErrorHandler(500, 'Failed to fetch customers'), res);
  }
});

// Get a customer by customer_id
router.get('/:customer_id', async (req, res) => {
  const { customer_id } = req.params;
  try {
    const params = {
      TableName: 'customers',
      Key: { customer_id }
    };
    const data = await dynamoDB.get(params).promise();
    if (!data.Item) {
      handleError(new ErrorHandler(404, 'Customer not found'), res);
    } else {
      res.status(200).json(data.Item);
    }
  } catch (err) {
    handleError(new ErrorHandler(500, 'Failed to fetch customer'), res);
  }
});

// Create a new customer
router.post('/', async (req, res) => {
  const { first_name, last_name, mobile, email, area } = req.body;
  const customer_id = uuidv4();
  try {
    const params = {
      TableName: 'customers',
      Item: {
        customer_id,
        first_name,
        last_name,
        mobile,
        email,
        area
      }
    };
    await dynamoDB.put(params).promise();
    res.status(201).json({ customer_id, ...req.body });
  } catch (err) {
    handleError(new ErrorHandler(500, 'Failed to create customer'), res);
  }
});

// Update a customer by customer_id
router.put('/:customer_id', async (req, res) => {
  const { customer_id } = req.params;
  const { first_name, last_name, mobile, email, area } = req.body;
  try {
    const params = {
      TableName: 'customers',
      Key: { customer_id },
      UpdateExpression: 'set first_name = :first_name, last_name = :last_name, mobile = :mobile, email = :email, area = :area',
      ExpressionAttributeValues: {
        ':first_name': first_name,
        ':last_name': last_name,
        ':mobile': mobile,
        ':email': email,
        ':area': area
      }
    };
    await dynamoDB.update(params).promise();
    res.status(200).json({ customer_id, ...req.body });
  } catch (err) {
    handleError(new ErrorHandler(500, 'Failed to update customer'), res);
  }
});

// Delete a customer by customer_id
router.delete('/:customer_id', async (req, res) => {
  const { customer_id } = req.params;
  try {
    const params = {
      TableName: 'customers',
      Key: { customer_id }
    };
    await dynamoDB.delete(params).promise();
    res.status(204).end();
  } catch (err) {
    handleError(new ErrorHandler(500, 'Failed to delete customer'), res);
  }
});

export default router;
