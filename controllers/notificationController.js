const Notification = require('../models/notificationModel');
//const Category = require('../models/favoriteModel');
//const User = require('../models/userModel');
const sanitize = require('mongo-sanitize');


exports.createNotification = (req, res, next) => {
  console.log( req.user)
  const notification = new Notification({
    resourceName : req.user.resourceName,
    _resourceId: req.body._resourceId,
    _userId: req.user.id,
  });
  notification.save().then(
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

exports.deleteNotification = (req, res, next) => {
  Notification.deleteOne({_id: req.params.id}).then(
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

exports.getAllNotification = (req, res, next) => {

  // The sanitize function will strip out any keys that start with '$' in the input,
  // so you can pass it to MongoDB without worrying about malicious users overwriting
  // query selectors.
  const cleanUserId = sanitize(req.user.id);

  Notification.find({_userId: cleanUserId}).then(
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

