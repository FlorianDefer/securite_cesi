const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')

const commentCtrl = require('../controllers/commentController');

 router.get('/', authorize(),commentCtrl.getAllComment);
 router.get('/byResources/:id', commentCtrl.getByResources);
 router.post('/', authorize(),commentCtrl.createComment);
 router.get('/:id',authorize(), commentCtrl.getOneComment);
 router.put('/:id',authorize(), commentCtrl.modifyComment);
 router.delete('/:id', commentCtrl.deleteComment);
//http://localhost:3000/api/comment/

 module.exports = router;