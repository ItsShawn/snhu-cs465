const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');

router.get('/trips', tripsCtrl.tripsList);
router.post('/trips', tripsCtrl.tripsAddOne);

router.get('/trips/:tripCode', tripsCtrl.tripsReadOne);
router.put('/trips/:tripCode', tripsCtrl.tripsUpdateOne);
router.delete('/trips/:tripCode', tripsCtrl.tripsDeleteOne);

module.exports = router;
