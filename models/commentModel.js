const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
        
    },
    userName: {
        type: String,
        required: true,
        minlength: 1,
        
    },

    dateCreated: {
        type: Date,
        required: true
    },

    public: {
        type: Boolean,
        default: true
    },
    
    _resourceId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

module.exports = mongoose.model('Comment', CommentSchema);