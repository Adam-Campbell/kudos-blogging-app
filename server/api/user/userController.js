const User = require('./userModel');
const Post = require('../post/postModel');
const Comment = require('../comment/commentModel');
const Follow = require('../follow/followModel');
const Kudos = require('../kudos/kudosModel');
const Highlight = require('../highlight/highlightModel');
const mergeApprovedFields = require('../../util/helpers').mergeApprovedFields;


exports.params = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
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
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return res.status(400).send('You need to supply a username, email address and password.');
    }

    try {
        const newUser = await User.create({
            username,
            password,
            email
        });
        //const userObject = newUser.toObject();
        //delete userObject.password;
        //res.json(userObject);
        next();
    } catch (err) {
        next(err);
    }
}


exports.getUsersPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({author: req.user._id})
        .populate('author')
        .exec();

        res.json(posts);
    } catch (err) {
        next(err);
    }
}


exports.getUsersComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({author: req.user._id})
        .populate('author')
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
            select: '-text',
            populate: {
                path: 'author'
            }
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
        .populate('user')
        .populate({
            path: 'post',
            select: '-text',
            populate: {
                path: 'author'
            }
        })
        .exec();

        res.json(highlights);
    } catch (err) {
        next(err);
    }
}