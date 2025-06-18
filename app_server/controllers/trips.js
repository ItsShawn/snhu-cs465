const axios = require('axios');
const apiBaseUrl = 'http://localhost:3000/api/trips';

// List trips
const tripsList = async (req, res) => {
  try {
    const response = await axios.get(apiBaseUrl);
    res.render('trips-list', { trips: response.data });
  } catch (err) {
    res.render('error', { message: 'Error fetching trips' });
  }
};

// Show add trip form
const tripAddForm = (req, res) => {
  res.render('trip-form', { title: 'Add New Trip' });
};

// Handle add trip
const tripAdd = async (req, res) => {
  try {
    await axios.post(apiBaseUrl, req.body);
    res.redirect('/trips');
  } catch (err) {
    res.render('error', { message: 'Error adding trip' });
  }
};

// Show edit form
const tripEditForm = async (req, res) => {
  try {
    const trip = await axios.get(`${apiBaseUrl}/${req.params.tripCode}`);
    res.render('trip-form', { title: 'Edit Trip', trip: trip.data });
  } catch (err) {
    res.render('error', { message: 'Error loading trip for edit' });
  }
};

// Handle update trip
const tripUpdate = async (req, res) => {
  try {
    await axios.put(`${apiBaseUrl}/${req.params.tripCode}`, req.body);
    res.redirect('/trips');
  } catch (err) {
    res.render('error', { message: 'Error updating trip' });
  }
};

// Handle delete trip
const tripDelete = async (req, res) => {
  try {
    await axios.delete(`${apiBaseUrl}/${req.params.tripCode}`);
    res.redirect('/trips');
  } catch (err) {
    res.render('error', { message: 'Error deleting trip' });
  }
};

module.exports = {
  tripsList,
  tripAddForm,
  tripAdd,
  tripEditForm,
  tripUpdate,
  tripDelete
};
