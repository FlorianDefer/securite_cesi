const express = require('express');
 const router = express.Router();
 const authorize = require('_middleware/authorize')

 const categoryCtrl = require('../controllers/categoryController');

 router.get('/get', authorize(),  categoryCtrl.getAllCategory);
 router.get('/table', authorize(),  categoryCtrl.getTable);
 router.post('/create',  authorize(), categoryCtrl.createCategory);
 router.get('/:id',  authorize(), categoryCtrl.getOneCategory);
 router.put('/get/:id', authorize(),  categoryCtrl.modifyCategory);
 router.delete('/remove/:id', authorize(),  categoryCtrl.deleteCategory);

 module.exports = router;