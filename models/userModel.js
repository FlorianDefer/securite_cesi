const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
  
  type: {
    type: String,
    required: true,
    minlength: 1,
    default: 'Citizen',
    trim: true
},

name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},

surname: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},
nickname: {
  type: String,
  required: true,
  minlength: 1,
  trim: true
},
geographicalZone: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},

socialSituation: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},



});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);