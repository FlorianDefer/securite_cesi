const express = require('express');
const router = express.Router();


//const validateRequest = require('_middleware/validate-request');
//const authorize = require('_middleware/authorize')



const favoriteCtrl = require('../controllers/favoriteController');




router.get('/', favoriteCtrl.getAllFavorite);
router.get('/id', favoriteCtrl.isFavorite);
router.post('/', favoriteCtrl.createFavorite);
router.delete('/:id', favoriteCtrl.deleteFavorite);



module.exports = router;