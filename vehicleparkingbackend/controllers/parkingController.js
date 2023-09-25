// controllers/parkingController.js
const db = require('../models');
const Parking = db.Parking;

// Create a new Parking record
exports.createParking = (req, res) => {
  const { vehicleType, numberPlate, startTime, endTime, parkingFee } = req.body;
  Parking.create({
    vehicleType,
    numberPlate,
    startTime,
    endTime,
    parkingFee,
  })
    .then((parking) => {
      res.status(201).json(parking);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};


// Import your database models here

// Controller to get all parking entries
exports.getAllParkingEntries = async (req, res) => {
  try {
    const parkingEntries = await db.Parking.findAll(); // Replace with your actual model name
    res.json(parkingEntries);
  } catch (error) {
    console.error('Error fetching parking entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get a parking entry by ID
exports.getParkingEntryById = async (req, res) => {
  const { id } = req.params;
  try {
    const parkingEntry = await db.Parking.findByPk(id); // Replace with your actual model name
    if (!parkingEntry) {
      return res.status(404).json({ error: 'Parking entry not found' });
    }
    res.json(parkingEntry);
  } catch (error) {
    console.error('Error fetching parking entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteParkingEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const parkingEntry = await db.Parking.findByPk(id);
    if (!parkingEntry) {
      return res.status(404).json({ error: 'Parking entry not found' });
    }
    
    // Delete the parking entry
    await parkingEntry.destroy();
    
    res.status(204).send(); // Send a 204 (No Content) response on successful deletion
  } catch (error) {
    console.error('Error deleting parking entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};