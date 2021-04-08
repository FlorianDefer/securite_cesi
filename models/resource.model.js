const mongoose = require('mongoose');
const  Category  = require('./category.model');
const  Comment  = require('./comment.model');

const ResourceSchema = new mongoose.Schema({
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

    exploited: {
        type: Boolean,
        default: false
    },

    category: {
        type: Category,
        required: true
    },

    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: 'Informative'
    },

    datePublished: {
        type: Date,
        required: true
    },

    comments: {
        type: Array[Comment],
    },

    // with Authentication
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }


})

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = { Resource }