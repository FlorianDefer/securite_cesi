const mongoose = require('mongoose');

const FavouriteResourceSchema = new mongoose.Schema({
    _resourceId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    resourceName: {
        type: String,
        required: true,
        minlength: 1,
        
    },
   
    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const FavouriteResource = mongoose.model('FavouriteResource', FavouriteResourceSchema);

module.exports = { FavouriteResource }