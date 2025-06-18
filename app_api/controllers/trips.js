const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// GET: all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: add new trip
const tripsAddOne = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET: one trip by code
const tripsReadOne = async (req, res) => {
  const { tripCode } = req.params;

  if (!tripCode) {
    return res.status(400).json({ message: 'Trip code is required' });
  }

  try {
    const trip = await Trip.findOne({ code: tripCode });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: update trip by code
const tripsUpdateOne = async (req, res) => {
  const { tripCode } = req.params;

  if (!tripCode) {
    return res.status(400).json({ message: 'Trip code required' });
  }

  try {
    const trip = await Trip.findOne({ code: tripCode });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.name = req.body.name;
    trip.length = req.body.length;
    trip.start = req.body.start;
    trip.resort = req.body.resort;
    trip.perPerson = req.body.perPerson;
    trip.image = req.body.image;
    trip.description = req.body.description;

    await trip.save();

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: remove trip by code
const tripsDeleteOne = async (req, res) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({ code: req.params.tripCode });
    if (!deletedTrip) return res.status(404).json({ message: 'Trip not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  tripsList,
  tripsAddOne,
  tripsReadOne,
  tripsUpdateOne,
  tripsDeleteOne
};
