const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// needs to know:
// - the person who did the highlighting (current user)
// - the excerpt of text that was highlighted
// - the post that the excerpt belongs to 
const highlightSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    post: {type: Schema.Types.ObjectId, ref: 'post', required: true},
    excerpt: {type: String, required: true}
});


module.exports = mongoose.model('highlight', highlightSchema);