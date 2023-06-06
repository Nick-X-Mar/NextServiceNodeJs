// garages.js

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { handleBadRequest, handleNotFound, handleUnauthorized, handleForbidden } from './errorMiddleware.js';
import { createGarage, getGarage, updateGarage, deleteGarage } from './garageController.js';

const router = express.Router();

// Create a new Garage
router.post('/', async (req, res, next) => {
  try {
    const garageData = req.body;
    // Validate input fields
    if (!garageData.BrandName || !garageData.ContactName || !garageData.Phone || !garageData.Address || !garageData.Stars) {
      handleBadRequest(res, 'BrandName, ContactName, Phone, Address, and Stars are required fields');
    }

    // Generate a unique garage_id
    garageData.garage_id = uuidv4();

    const createdGarage = await createGarage(garageData);
    res.status(201).json(createdGarage);
  } catch (err) {
    next(err);
  }
});

// Get a Garage by ID
router.get('/:id', async (req, res, next) => {
  try {
    const garageId = req.params.id;
    const garage = await getGarage(garageId);
    if (!garage) {
      handleNotFound(res, 'Garage not found');
    }
    res.status(200).json(garage);
  } catch (err) {
    next(err);
  }
});

// Update a Garage by ID
router.put('/:id', async (req, res, next) => {
  try {
    const garageId = req.params.id;
    const garageData = req.body;
    // Validate input fields
    if (!garageData.BrandName || !garageData.ContactName || !garageData.Phone || !garageData.Address || !garageData.Stars) {
      handleBadRequest(res, 'BrandName, ContactName, Phone, Address, and Stars are required fields');
    }

    const updatedGarage = await updateGarage(garageId, garageData);
    if (!updatedGarage) {
      handleNotFound(res, 'Garage not found');
    }
    res.status(200).json(updatedGarage);
  } catch (err) {
    next(err);
  }
});

// Delete a Garage by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const garageId = req.params.id;
    const deletedGarage = await deleteGarage(garageId);
    if (!deletedGarage) {
      handleNotFound(res, 'Garage not found');
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Handle Unauthorized error
router.use((err, req, res, next) => {
  if (err instanceof handleUnauthorized) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
});

// Handle Forbidden error
router.use((err, req, res, next) => {
  if (err instanceof handleForbidden) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
});

export default router;
