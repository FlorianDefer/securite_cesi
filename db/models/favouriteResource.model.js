const mongoose = require('mongoose');
const { Resource } = require('./resource.model');

const FavouriteResourceSchema = new mongoose.Schema({
    resource: {
        type: Resource,
        required: true
    },

    dateFavourited: {
        type: Date,
        required: true
    },

    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const FavouriteResource = mongoose.model('FavouriteResource', FavouriteResourceSchema);

module.exports = { FavouriteResource }