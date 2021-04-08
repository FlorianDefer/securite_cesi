const mongoose = require('mongoose');

const SeenResourceSchema = new mongoose.Schema({
    _resourceId: {
        type: mongoose.Types.ObjectId,
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