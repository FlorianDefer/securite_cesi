const Notification = require('../models/notificationModel');
//const Category = require('../models/favoriteModel');
//const User = require('../models/userModel');



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
  Notification.find({_userId: req.user.id}).then(
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

