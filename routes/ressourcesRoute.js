 const express = require('express');
 const router = express.Router();
 const authorize = require('_middleware/authorize')

 const resourcesCtrl = require('../controllers/resourcesController');
 router.get('/mytest',authorize(),resourcesCtrl.mytest);
 router.get('/',authorize(),resourcesCtrl.getAllResources);
 router.get('/public', resourcesCtrl.getPublicResources);
 router.get('/public/my', authorize(),resourcesCtrl.getMyPublicResources);
 router.put('/public/:id',authorize(), resourcesCtrl.toPublicResources);
 router.get('/private', authorize(),resourcesCtrl.getPrivateResources);
 router.get('/private/my', authorize(),resourcesCtrl.getMyPrivateResources);
 router.put('/private/:id', authorize(),resourcesCtrl.toPrivateResources);
 router.get('/waiting', authorize(),resourcesCtrl.getWaitingResources);
 router.get('/waiting/my',authorize(), resourcesCtrl.getMyWaitingResources);
 router.put('/waiting/:id',authorize(), resourcesCtrl.toWaitingResources);
 //router.get('/table', resourcesCtrl.getTable);
 router.post('/',authorize(),resourcesCtrl.createResources);
 router.get('/:id',authorize(),resourcesCtrl.getOneResources);
 router.put('/:id',authorize(), resourcesCtrl.modifyResources);
 router.delete('/:id', authorize(),resourcesCtrl.deleteResources);

//http://localhost:3000/api/resources/

 module.exports = router;