const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

});

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
