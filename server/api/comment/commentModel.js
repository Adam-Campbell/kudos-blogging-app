const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { 
        //type: Schema.Types.Mixed,
        type: String,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    parents: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],

    discussion: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('comment', CommentSchema);