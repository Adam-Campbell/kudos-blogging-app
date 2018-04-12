const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    text: {
        type: String,
        required: true
    },

    author: {type: Schema.Types.ObjectId, ref: 'user'},
    
    // I should make categories an array of strings, and validate each one
    // againt a regex containing all the categories I have. 
    //categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
    categories:[{
        type: String,
        enum: ['javascript', 'css', 'reactjs', "html", "sass", "nodejs"]
    }]
});

module.exports = mongoose.model('post', PostSchema);
