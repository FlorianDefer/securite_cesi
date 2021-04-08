const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    dateCreated: {
        type: Date,
        required: true
    },

    _userIdTarget: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message }