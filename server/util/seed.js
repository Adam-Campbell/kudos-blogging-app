const mongoose = require('mongoose');
const User = require('../api/user/userModel');
const Post = require('../api/post/postModel');
const Comment = require('../api/comment/commentModel');
const Follow = require('../api/follow/followModel');
const Highlight = require('../api/highlight/highlightModel');
const Kudos = require('../api/kudos/kudosModel');
const logger = require('./logger');


async function seedTestDB() {
    logger.log('Clearing the Database...');
    // Clear the DB
    const modelArr = [User, Post, Comment, Follow, Highlight, Kudos]
    .map(model => model.remove().exec());
    await Promise.all(modelArr);

    logger.log('Seeding the Database...');
    // Create two users
    const adam = await new User({ username: 'adam campbell', password: 'test', "email": "test@test.com" }).save();
    const andrea = await new User({username: 'andrea white', password: 'password', "email": "test@test.co.uk"}).save();
    
    // Create a post 
    const adamsPost = await new Post({
        title: 'My first post!', 
        text: 'It has cool stuff',
        author: adam._id,
        categories: ['javascript']
    }).save();

    const andreasPost = await new Post({
        title: 'Welcome to my blog!',
        text:'Text goes here.',
        author: andrea._id,
        categories: ['reactjs']
    }).save();

    // Create a comment
    const adamsTopLevelCommentId = mongoose.Types.ObjectId();
    const adamsTopLevelComment = await new Comment({
        text: 'This is a top level comment!',
        _id: adamsTopLevelCommentId,
        author: adam._id,
        discussion: andreasPost._id,
        parents: [adamsTopLevelCommentId]
    }).save();

    const andreasNestedCommentId = mongoose.Types.ObjectId();
    const andreasNestedComment = await new Comment({
        text: 'This is a nested comment!',
        _id: andreasNestedCommentId,
        author: andrea._id,
        discussion: andreasPost._id,
        parents: [adamsTopLevelCommentId, andreasNestedCommentId]
    }).save();

    const andreasTopLevelCommentId = mongoose.Types.ObjectId();
    const andreasTopLevelComment = await new Comment({
        text: 'This is my top level comment!',
        _id: andreasTopLevelCommentId,
        author: andrea._id,
        discussion: adamsPost._id,
        parents: [andreasTopLevelCommentId]
    }).save();

    // Create a follow
    const adamFollowsAndrea = await new Follow({follower: adam._id, followee: andrea._id}).save();

    // Create a highlight
    const adamsHighlight = await new Highlight({
        user: adam._id, 
        post: andreasPost._id,
        excerpt: 'Text goes here.' 
    }).save();

    const andreasHighlight = await new Highlight({
        user: andrea._id, 
        post: adamsPost._id,
        excerpt: 'It has cool stuff' 
    }).save(); 

    // Create a kudos
    const adamsKudos = await new Kudos({user: adam._id, post: andreasPost._id}).save();
    const andreasKudo = await new Kudos({user: andrea._id, post: adamsPost._id}).save();

    logger.log('Finished seeding the Database');
}

seedTestDB();

