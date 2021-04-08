
const Category = require('../models/categoryModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const Resources = require('../models/resourcesModel');
const Person = require('../models/personModel');
const Story = require('../models/storyModel');
//require('../models/testModel');
const accountService = require('../accounts/account.service');
//test
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


 exports.createResources = (req, res, next) => {
   const resources = new Resources({
     title: req.body.title,
     description: req.body.description,
     category: req.body.category,
     type: req.body.type,
     relation: req.body.relation,
     datePublished: req.body.datePublished,
     account: req.user.id
   });
   resources.save().then(
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

 exports.mytest = (req, res, next) => {
  Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });
};



 exports.getOneResources = (req, res, next) => {

  Resources.
  findOne({_id: req.params.id}).
  populate('account').
  exec(function (err, resources) {
    if (err) return handleError(err);
    res.status(200).json(resources);
    // prints "The author is Ian Fleming"
  });

  
 };

 exports.modifyResources = (req, res, next) => {
   const resources = new Resources({
     _id: req.params.id,
     title: req.body.title,
     description: req.body.description,
     category: req.body.category,
     type: req.body.type,
     relation: req.body.relation,
     datePublished: req.body.datePublished,
     account: req.user.id
   });
   Resources.updateOne({_id: req.params.id}, resources).then(
     () => {
       res.status(201).json({
         message: 'Resources updated successfully!'
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

 exports.deleteResources = (req, res, next) => {
   Resources.deleteOne({_id: req.params.id}).then(
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

 exports.getAllResources = (req, res, next) => {
  Resources.
  find().
  populate('account').
  exec(function (err, resources) {
    if (err) return handleError(err);
    res.status(200).json(resources);
    // prints "The author is Ian Fleming"
  });
};

exports.getPublicResources = (req, res, next) => {
    Resources.
    find({status:'public'}).
    populate('account').
    exec(function (err, resources) {
      if (err) return handleError(err);
      res.status(200).json(resources);
      // prints "The author is Ian Fleming"
    });
};

exports.getPrivateResources = (req, res, next) => {
    Resources.
    find({status:'private'}).
    populate('account').
    exec(function (err, resources) {
      if (err) return handleError(err);
      res.status(200).json(resources);
      // prints "The author is Ian Fleming"
    });
};

exports.getWaitingResources = (req, res, next) => {
    Resources.
    find({status:'waiting'}).
    populate('account').
    exec(function (err, resources) {
      if (err) return handleError(err);
      res.status(200).json(resources);
      // prints "The author is Ian Fleming"
    });
};

exports.toPublicResources = (req, res, next) => {
  Resources.findOne({_id: req.params.id}).then(
    (resources) => {
      resources.status='public'
      Resources.updateOne({_id: req.params.id}, resources).then(
        () => {
          res.status(201).json({
            message: 'modification de la ressource '+resources.title+' réussie'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );

      res.status(200).json(resources);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
  
};

exports.toPrivateResources = (req, res, next) => {
  Resources.findOne({
    _id: req.params.id
  }).then(
    (resources) => {
      resources.status='private'
      Resources.updateOne({_id: req.params.id}, resources).then(
        () => {
          res.status(201).json({
            message: 'modification de la ressource '+resources.title+' réussie'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );

      res.status(200).json(resources);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
  
};

exports.toWaitingResources = (req, res, next) => {
  Resources.findOne({
    _id: req.params.id
  }).then(
    (resources) => {
      resources.status='waiting'
      Resources.updateOne({_id: req.params.id}, resources).then(
        () => {
          res.status(201).json({
            message: 'modification de la ressource '+resources.title+' réussie'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );

      res.status(200).json(resources);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
  
};


exports.getMyPublicResources = (req, res, next) => {
 
    Resources
    .find({status:'public', account: req.user.id}).
    populate('account').
    exec(function (err, resources) {
      if (err) return handleError(err);
      res.status(200).json(resources);
      // prints "The author is Ian Fleming"
    });
};

exports.getMyPrivateResources = (req, res, next) => {
  Resources
    .find({status:'private', account: req.user.id}).
    populate('account').
    exec(function (err, resources) {
      if (err) return handleError(err);
      res.status(200).json(resources);
    });
  };
  
 //Resources.find({status:'private', accountId: req.user.id}).then(
 //  (things) => {
 //    res.status(200).json(things);
 //  }
 //).catch(
 //  (error) => {
 //    res.status(400).json({
 //      error: error
 //    });
 //  }
 //);
//};

exports.getMyWaitingResources = (req, res, next) => {
    Resources.
    find({status:'waiting', account: req.user.id}).
    populate('account').
    exec(function (err, resources) {
      if (err) return handleError(err);
      res.status(200).json(resources);
    });
};


// exports.getTable = (req, res, next) => {
//   console.log('getTable');
//    User.aggregate({
//    $lookup:
//        {
//            from: "category",
//            localField: "categoryid",
//            foreignField : "_id",
//            as: "ordered_category"
//        }
//    })
//  User.find().then(
//    (things) => {
//      res.status(200).json({message : tablesHelper.getResoucesTable(things)});
//    }
//  ).catch(
//    (error) => {
//      res.status(400).json({
//        error: error
//      });
//    }
//  );
//};