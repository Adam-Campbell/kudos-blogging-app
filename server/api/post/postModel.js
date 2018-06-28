const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function rawValidatorFunction(val) {
    // more sophisticated validation to be implemented. For now it just checks shallow equality.
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
    It looks like the data you supplied to the isn't valid. The titleRaw, descriptionRaw 
    and bodyRaw fields should only ever be supplied with data exported from theDraftJS 
    editor, and never with manually constructed data.`;

const rawValidator = [rawValidatorFunction, rawValidatorErrMsg];


function imageObjectValidatorFunction(val) {
    // more sophisticated validation to be implemented. For now it just checks shallow equality.
    const props = Object.getOwnPropertyNames(val);
    console.log(props);
    // confirm that no extra fields are present
    if (props.length !== 3) {
        return false;
    }
    // confirm that the object includes the fields 'original', 'card' and 'thumbnail'
    if (!props.includes('original') || !props.includes('card') || !props.includes('thumbnail')) {
        return false;
    }
    // if all tests are passed then return true
    return true;
}

const imageObjectValidatorErrMsg = `
    It looks like the data you supplied to the image field isn't valid. This field should
    only be supplied with the data returned from the /api/upload endpoint.`;

const imageObjectValidator = [imageObjectValidatorFunction, imageObjectValidatorErrMsg];

const PostSchema = new Schema({
    titleText: {
        type: String,
        required: true,
    },

    titleRaw: {
        type: Schema.Types.Mixed,
        validate: rawValidator,
        required: true
    },

    descriptionText: {
        type: String,
        required: true
    },

    descriptionRaw: {
        type: Schema.Types.Mixed,
        validate: rawValidator,
        required: true
    },

    image: {
        type: Schema.Types.Mixed,
        validate: imageObjectValidator,
        required: true
    },

    bodyRaw: {
        type: Schema.Types.Mixed,
        validate: rawValidator,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    },
    
    // I should make categories an array of strings, and validate each one
    // againt a regex containing all the categories I have. 
    //categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
    category: {
        type: String,
        enum: [
            'javascript', 
            'fantasy', 
            'games', 
            'news',
            'fashion',
            'travel',
            'motivation',
            'relationships',
            'design',
            'politics',
            'mentalhealth',
            'music'
        ],
        required: true
    },

    isInline: {
        type: Boolean,
        required: true
    }

},
{minimize: false});

module.exports = mongoose.model('post', PostSchema);
