const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function bodyObjectValidatorFunction(val) {
    //console.log(val);
    const props = Object.getOwnPropertyNames(val);
    console.log(props);
    // confirm that no extra fields are present
    if (props.length !== 2) {
        return false;
    }
    // confirm that one of the fields is the blocks field
    if (!props.includes('blocks')) {
        return false;
    }
    // confirm that the other field is entityMap
    if (!props.includes('entityMap')) {
        return false;
    }
    // if all tests are passed then return true
    return true;
}

const bodyObjectValidatorErrMsg = `
    It looks like the data you supplied to the bodyObject field isn't valid. 
    This field should only ever be supplied with data exported from theDraftJS 
    editor, and never with manually constructed data.`;

const bodyObjectValidator = [bodyObjectValidatorFunction, bodyObjectValidatorErrMsg];

const PostSchema = new Schema({
    titleText: {
        type: String,
        required: true,
    },

    titleRaw: {
        type: String,
        required: true
    },

    descriptionText: {
        type: String,
        required: true
    },

    descriptionRaw: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    bodyRaw: {
        type: String,
        required: true
    },

    bodyObject: {
        type: Schema.Types.Mixed,
        validate: bodyObjectValidator
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



// const PostSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     description: {
//         type: String
//     },

//     image: {
//         type: String
//     },

//     text: {
//         type: String,
//         required: true
//     },

//     author: {type: Schema.Types.ObjectId, ref: 'user'},
    
//     // I should make categories an array of strings, and validate each one
//     // againt a regex containing all the categories I have. 
//     //categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
//     category: {
//         type: String,
//         enum: [
//             'javascript', 
//             'fantasy', 
//             'games', 
//             'news',
//             'fashion',
//             'travel',
//             'motivation',
//             'relationships',
//             'design',
//             'politics',
//             'mentalhealth',
//             'music'
//         ]
//     }

// });
