const mongoose = require('mongoose');
const {Category} = require('../models/categoryModel');
const {Comment} = require('../models/commentModel');
const {Account} = require('../accounts/account.model');
const Schema = mongoose.Schema;

const resourcesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},
description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},
status: {
    type: String,
    default: 'private'
},
type: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    default: 'articles'
},
relation: {
    type: [String],
    required: true,
  },  
datePublished: {
    type: Date,
    required: true
},

// with Authentication
account: { type: Schema.Types.ObjectId, ref: 'Account' },
category: { type: String }
});

module.exports = mongoose.model('Resources', resourcesSchema);