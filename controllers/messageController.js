const Message = require('../models/messageModel');



  //message

  exports.getAllUserMessage = (req, res, next) => {
    Message.find({
      _userId: req.params.id //a faire
    }).then(
      (user) => {
        res.status(200).json(user); 
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  exports.getMessageDiscussion = (req, res, next) => {
    Message.find({
      _userId: req.params.id, //a faire
      _userIdTarget: req.params.userIdTarget//a faire
    }).then(
      (user) => {
        res.status(200).json(user); 
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.getAllMessage = (req, res, next) => {
    Message.find().then(
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


  exports.createMessage = (req, res, next) => {
   
    const message = new Message({
      content: req.body.content,
      dateCreated: hash,// a faire
      _userIdTarget: req.body.userIdTarget,
      _userId: req.body._userId, // a faire
  });
      user.save()
        .then(() => res.status(201).json({ message: 'message créé !' }))
        .catch(error => res.status(400).json({ message: 'erreur request' }));
};;

  exports.modifyMessage = (req, res, next) => {
    
        const message = new Message({
            _id: req.params.id,
            content: req.body.content,
            dateCreated: hash,// a faire
            _userIdTarget: req.body.userIdTarget,
            _userId: req.body._userId, // a faire
        });
        Message.updateOne({_id: req.params.id}, message).then(
    () => {
      res.status(201).json({
        message: 'message updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};;

exports.deleteMessage = (req, res, next) => {
  Message.deleteOne({_id: req.params.id}).then(
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
};;