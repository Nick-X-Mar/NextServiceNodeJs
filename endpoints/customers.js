// customers.js

const express = require('express');
const router = express.Router();

// GET /customers/:id
router.get('/:id', (req, res, next) => {
  const customerId = req.params.id;
  // Fetch customer by ID and send response
  // Example: sending a dummy customer object
  const customer = { id: customerId, name: 'Alice', age: 25 };
  res.json(customer);
});

// POST /customers
router.post('/', (req, res, next) => {
  // Create a new customer based on request body and send response
  // Example: sending a dummy success message
  res.json({ message: 'Customer created successfully' });
});

// PUT /customers/:id
router.put('/:id', (req, res, next) => {
  const customerId = req.params.id;
  // Update customer by ID based on request body and send response
  // Example: sending a dummy success message
  res.json({ message: `Customer with ID ${customerId} updated successfully` });
});

// DELETE /customers/:id
router.delete('/:id', (req, res, next) => {
  const customerId = req.params.id;
  // Delete customer by ID and send response
  // Example: sending a dummy success message
  res.json({ message: `Customer with ID ${customerId} deleted successfully` });
});

module.exports = router;
