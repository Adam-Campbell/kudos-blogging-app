const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This model doesn't have it's own controller or routes. It is 
// used to indicate the existence of a 'giving kudos' relationship
// between two users. The collection can then be queried to retrieve
// all of the kudos a user has given, how many kudos a particular post
// has received, whether current user has given kudos to a particular
// post, and also allows current user to give kudos to a post or remove
// kudos from the post. 


const kudosSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    post: {type: Schema.Types.ObjectId, ref: 'post', required: true}
});

module.exports = mongoose.model('kudos', kudosSchema);

