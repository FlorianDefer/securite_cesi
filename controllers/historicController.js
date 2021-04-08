const Historic = require('../models/historicModel');
//const Category = require('../models/favoriteModel');
//const User = require('../models/userModel');



exports.createHistoric = (req, res, next) => {
  console.log( req.user)
  const historic = new Historic({
    resourceName : req.user.resourceName,
    _resourceId: req.body._resourceId,
    _userId: req.user.id,
  });
  historic.save().then(
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

exports.deleteHistoric = (req, res, next) => {
  Historic.deleteOne({_id: req.params.id}).then(
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

exports.getAllHistoric = (req, res, next) => {
  Historic.find({_userId: req.user.id}).then(
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

