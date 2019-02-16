const express = require('express');
const crt = require('../controllers/crt-cities');

const router = express.Router();

router.get('/v1/', (req, res) => {//List all
    crt.listAll((result) => {
        res.status(result.status).json(result);
    });
}); 
router.post('/v1/', (req, res) => {//Register
    crt.saveOrUpdate(false, req, (result) => {
        res.status(result.status).json(result);
    });
});
router.get('/v1/:_id', (req, res) => {//Get
    crt.getByPK(req, (result) => {
        res.status(result.status).json(result);
    });
});
router.put('/v1/:_id', (req, res) => {//Edit
    crt.saveOrUpdate(true, req, (result) => {
        res.status(result.status).json(result);
    });
});
router.delete('/v1/:_id', (req, res) => {//Delete
    crt.archive(req, (result) => {
        res.status(result.status).json(result);
    });
});
router.delete('/delete/v1/:_id', (req, res) => {//Delete
    crt.delete(req, (result) => {
        res.status(result.status).json(result);
    });
});

module.exports = router;