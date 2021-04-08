const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
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

    public: {
        type: Boolean,
        default: false
    },

    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment }