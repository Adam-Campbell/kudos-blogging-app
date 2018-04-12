process.env.NODE_ENV = 'testing';
const config = require('../server/config/config');
const mongoose = require('mongoose');
const User = require('../server/api/user/userModel');
const Post = require('../server/api/post/postModel');
const Comment = require('../server/api/comment/commentModel');
const Follow = require('../server/api/follow/followModel');
const Highlight = require('../server/api/highlight/highlightModel');
const Kudos = require('../server/api/kudos/kudosModel');

async function seedTestDB() {
    // Connect to DB
    require('mongoose').connect(config.db.url);

    // Clear the DB
    const modelArr = [User, Post, Comment, Follow, Highlight, Kudos]
    .map(model => model.remove().exec());
    await Promise.all(modelArr);

    // Create two users
    const joe = await new User({ username: 'Joe Bloggs', password: 'test', email: 'joe@email.com' }).save();
    const jane = await new User({ username: 'Jane Doe', password: 'password', email: 'jane@email.com' }).save();
    
    // Create a post 
    const joesPost = await new Post({
        title: 'My first post!', 
        text: 'It has cool stuff',
        author: joe._id,
        categories: ['javascript']
    }).save();

    // Create a comment
    const joesTopLevelCommentId = mongoose.Types.ObjectId();
    const joesTopLevelComment = await new Comment({
        text: 'This is a top level comment!',
        _id: joesTopLevelCommentId,
        author: joe._id,
        discussion: joesPost._id,
        parents: [joesTopLevelCommentId]
    }).save();

    // Create a nested comment
    const joesNestedCommentId = mongoose.Types.ObjectId();
    const joesNestedComment = await new Comment({
        text: 'This is a nested comment!',
        _id: joesNestedCommentId,
        author: joe._id,
        discussion: joesPost._id,
        parents: [joesTopLevelCommentId, joesNestedCommentId]
    }).save();

    // Create a follow
    const joeFollowsJane = await new Follow({follower: joe._id, followee: jane._id}).save();

    // Create a highlight
    const joesHighlight = await new Highlight({
        user: joe._id, 
        post: joesPost._id,
        excerpt: 'It has cool stuff' 
    }).save();

    // Create a kudos
    const joesKudos = await new Kudos({user: joe._id, post: joesPost._id}).save(); 

    return {
        joesId: joe._id,
        janesId: jane._id,
        joesPostId: joesPost._id,
        joesTopLevelCommentId: joesTopLevelCommentId,
        joesNestedCommentId: joesNestedCommentId,
        followId: joeFollowsJane._id,
        highlightId: joesHighlight._id,
        kudosId: joesKudos._id
    };
}


module.exports = seedTestDB; 
