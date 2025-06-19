const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');
const authCtrl = require('../controllers/authentication');

const { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'payload'
});

// Public routes
router.get('/trips', tripsCtrl.tripsList);
router.get('/trips/:tripCode', tripsCtrl.tripsReadOne);
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// Protected routes
router.post('/trips', auth, tripsCtrl.tripsAddOne);
router.put('/trips/:tripCode', auth, tripsCtrl.tripsUpdateOne);
router.delete('/trips/:tripCode', auth, tripsCtrl.tripsDeleteOne);

module.exports = router;
