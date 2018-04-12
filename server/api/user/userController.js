const User = require('./userModel');
const Post = require('../post/postModel');
const Comment = require('../comment/commentModel');
const Follow = require('../follow/followModel');
const Kudos = require('../kudos/kudosModel');
const Highlight = require('../highlight/highlightModel');


exports.params = async (req, res, next, id) => {
    try {
        const user = await User.findById(id, {password: 0})
        .exec();

        if (!user) {
            return next(new Error('No user with that id'));
        }
        req.user = user;
        next();
    } catch (err) {
        next(new Error("The user id supplied wasn't valid"));
    }
}


exports.get = async (req, res, next) => {
    try {
        const users = await User.find({})
        .select('-password -resetPasswordToken -resetPasswordTokenExpiration')
        .exec();

        res.json(users);
    } catch (err) {
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    const user = req.user.toObject();
    try {
        const followersReq = Follow.count({followee: req.user._id});
        const followingReq = Follow.count({follower: req.user._id});
        const followersRes = await followersReq;
        const followingRes = await followingReq;
        const finalUserObject = {
            ...user,
            followers: followersRes,
            following: followingRes
        };
        res.json(finalUserObject);
    } catch(err) {
        next(err);
    }
}


exports.post = async (req, res, next) => {
    try {
        const newUser = await User.create({
            ...req.body
        });
        const userObject = newUser.toObject();
        delete userObject.password;
        res.json(userObject);
    } catch (err) {
        next(err);
    }
}


exports.getUsersPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({author: req.user._id})
        .populate('author', {password: 0})
        .exec();

        res.json(posts);
    } catch (err) {
        next(err);
    }
}


exports.getUsersComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({author: req.user._id})
        .populate('author', {password: 0})
        .exec();

        res.json(comments);
    } catch (err) {
        next(err);
    }
}


exports.getFollowerCount = async (req, res, next) => {
    try {
        const followers = Follow.count({followee: req.user._id});
        const following = Follow.count({follower: req.user._id});
        const followersResponse = await followers;
        const followingResponse = await following;
        res.json({followers: followersResponse, following: followingResponse});
    } catch (err) {
        next(err);
    }
}

exports.getKudos = async (req, res, next) => {
    try {
        const kudos = await Kudos.find({user: req.user._id})
        .populate({
            path: 'post',
            populate: {
                path: 'author',
                select: '-password',
            },
        })
        .exec();

        res.json(kudos);
    } catch (err) {
        next(err);
    }
}

exports.getHighlights = async (req, res, next) => {
    try {
        const highlights = await Highlight.find({user: req.user._id})
        .populate('user', {password: 0})
        .populate({
            path: 'post',
            select: '-text',
            populate: {
                path: 'author',
                select: '-password',
            },
        })
        .exec();

        res.json(highlights);
    } catch (err) {
        next(err);
    }
}