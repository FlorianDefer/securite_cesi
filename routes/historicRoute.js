const express = require('express');
const router = express.Router();


//const validateRequest = require('_middleware/validate-request');
//const authorize = require('_middleware/authorize')



const historicCtrl = require('../controllers/historicController');




router.get('/', historicCtrl.getAllHistoric);
router.post('/', historicCtrl.createHistoric);
router.delete('/:id', historicCtrl.deleteHistoric);



module.exports = router;