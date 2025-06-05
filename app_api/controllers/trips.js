const mongoose = require('mongoose');
const Trip = require('../models/travlr');

const tripsList = async (req, res) => {
  const q = await Trip
    .find()
    .exec();

  if (!q) {
    return res.status(404).json({ message: "Trips not found" });
  } else {
    return res.status(200).json(q);
  }
};

const tripFindByCode = async (req, res) => {
  const q = await Trip
    .find({ 'code': req.params.tripCode })
    .exec();

  if (!q) {
    return res.status(404).json({ message: "Trip not found" });
  } else {
    return res.status(200).json(q);
  }
};

module.exports = {
  tripsList,
  tripFindByCode
};
