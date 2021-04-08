const mongoose = require('mongoose');
const { Resource } = require('./resource.model');

const SeenResourceSchema = new mongoose.Schema({
    resource: {
        type: Resource,
        required: true
    },

    dateSeen: {
        type: Date,
        required: true
    },

    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const SeenResource = mongoose.model('SeenResource', SeenResourceSchema);

module.exports = { SeenResource }