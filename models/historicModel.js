const mongoose = require('mongoose');

const HistoricResourceSchema = new mongoose.Schema({
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

const HistoricResource = mongoose.model('HistoricResource', HistoricResourceSchema);

module.exports = { HistoricResource }