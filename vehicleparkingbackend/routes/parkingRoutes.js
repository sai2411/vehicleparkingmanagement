// routes/parkingRoutes.js
const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

// Create a new Parking record
router.post('/parking', parkingController.createParking);
router.get('/parking', parkingController.getAllParkingEntries);
router.get('/:id', parkingController.getParkingEntryById);
router.delete('/:id', parkingController.deleteParkingEntry);
// Add other routes as needed

module.exports = router;
