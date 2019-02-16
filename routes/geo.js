const express = require('express');
const crt = require('../controllers/crt-geocoding');

const router = express.Router();

router.post('/v1/', (req, res) => {//Get
    crt.geoLocation(req, (result) => {
        res.status(result.status).json(result);
    });
});

module.exports = router;