const express = require('express');
const router = express.Router();


//const validateRequest = require('_middleware/validate-request');
//const authorize = require('_middleware/authorize')



const notificationCtrl = require('../controllers/notificationController');




router.get('/', notificationCtrl.getAllNotification);
router.post('/', notificationCtrl.createNotification);
router.delete('/:id', notificationCtrl.deleteNotification);



module.exports = router;