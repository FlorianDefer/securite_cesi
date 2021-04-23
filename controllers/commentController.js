const Comment = require('../models/commentModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');



exports.createComment = (req, res, next) => {
  console.log( req.user)
  const comment = new Comment({
    content: req.body.content,
    dateCreated: new Date().toISOString().slice(0, 19).replace('T', ' '),
    userName : req.user.firstName,
    _resourceId: req.body._resourceId,
    _userId: req.user.id,
  });
  comment.save().then(
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

exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    _id: req.params.id
  }).then(
    (comment) => {
      res.status(200).json(comment);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyComment = (req, res, next) => {
  const comment = new Comment({
    _id: req.params.id,
    content: req.body.content,
    dateCreated: new Date().toISOString().slice(0, 19).replace('T', ' '),
    userName : req.user.firstName,
    _resourceId: req.body._resourceId,
    _userId: req.user.id,
  });
  console.log(comment)
  Comment.updateOne({_id: req.params.id}, comment).then(
    () => {
      res.status(201).json({
        message: 'Comment updated successfully!'
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

exports.deleteComment = (req, res, next) => {
  Comment.deleteOne({_id: req.params.id}).then(
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

exports.getAllComment = (req, res, next) => {
  Comment.find().then(
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

exports.getByResources = (req, res, next) => {
    Comment.find({_resourceId: req.params.id}).then(
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