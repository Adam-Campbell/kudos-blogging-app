const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String
    },

    image: {
        type: String
    },

    text: {
        type: String,
        required: true
    },

    author: {type: Schema.Types.ObjectId, ref: 'user'},
    
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
        ]
    }

});

module.exports = mongoose.model('post', PostSchema);
