const express = require('express');
const router = express.Router();


//const validateRequest = require('_middleware/validate-request');
//const authorize = require('_middleware/authorize')



const userCtrl = require('../controllers/messageController');






router.get('/message/:id', userCtrl.getAllUserMessage);
//mees de l'user connnecté
router.get('/message', userCtrl.getAllMessage);
//router.get('/discussion', userCtrl.getAllDiscussion);
router.get('/message/:userIdTarget', userCtrl.getMessageDiscussion);
router.post('/message', userCtrl.createMessage);
router.put('/message/:id', userCtrl.modifyMessage);
router.delete('/message/:id', userCtrl.deleteMessage);



module.exports = router;