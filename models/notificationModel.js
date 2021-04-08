const mongoose = require('mongoose');

const NotificationResourceSchema = new mongoose.Schema({
    _resourceId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    content: {
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

const NotificationResource = mongoose.model('NotificationResource', NotificationResourceSchema);

module.exports = { NotificationResource }