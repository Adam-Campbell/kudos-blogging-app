const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function rawValidatorFunction(val) {
    // more sophisticated validation to be implemented. For now it just checks shallow equality.
    if (val === 'Deleted') {
        return true;
    }
    const props = Object.getOwnPropertyNames(val);
    console.log(props);
    // confirm that no extra fields are present
    if (props.length !== 2) {
        return false;
    }
    // confirm that the object includes the fields 'blocks' and 'entityMap'
    if (!props.includes('blocks') || !props.includes('entityMap')) {
        return false;
    }
    // if all tests are passed then return true
    return true;
}

const rawValidatorErrMsg = `
    It looks like the data you supplied to the isn't valid. The text field should only ever be 
    supplied with data exported from theDraftJS editor, and never with manually constructed data.`;

const rawValidator = [rawValidatorFunction, rawValidatorErrMsg];

const CommentSchema = new Schema({
    text: { 
        type: Schema.Types.Mixed,
        validate: rawValidator,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    parents: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        required: true
    }],

    discussion: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

},
{minimize: false});

module.exports = mongoose.model('comment', CommentSchema);