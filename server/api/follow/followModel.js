const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This model doesn't have it's own controller or routes. It is 
// used to indicate the existence of a follower/followee relationship
// between two users. The collection can then be queried to determine
// how many followers a user has, how many other users they are following,
// and whether or not they are following a specific user. 

const followSchema = new Schema({
    follower: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    followee: {type: Schema.Types.ObjectId, ref: 'user', required: true}
});

module.exports = mongoose.model('follow', followSchema);

