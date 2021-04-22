const Favorite = require('../models/favoriteModel');
//const Category = require('../models/favoriteModel');
//const User = require('../models/userModel');
const sanitize = require('mongo-sanitize');



exports.createFavorite = (req, res, next) => {
  console.log( req.user)
  const favorite = new Favorite({
    resourceName : req.user.resourceName,
    _resourceId: req.body._resourceId,
    _userId: req.user.id,
  });
  favorite.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteFavorite = (req, res, next) => {
  Favorite.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllFavorite = (req, res, next) => {
  // The sanitize function will strip out any keys that start with '$' in the input,
  // so you can pass it to MongoDB without worrying about malicious users overwriting
  // query selectors.
  const cleanUserId = sanitize(req.user.id);

  Favorite.find({_userId: cleanUserId}).then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
exports.isFavorite = (req, res, next) => {
  // The sanitize function will strip out any keys that start with '$' in the input,
  // so you can pass it to MongoDB without worrying about malicious users overwriting
  // query selectors.
  const cleanUserId = sanitize(req.user.id);
  const cleanResourceId = sanitize(req.params.id);


    Favorite.find({_userId: cleanUserId,_resourceId:cleanResourceId}).then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
