const mongoose = require('mongoose');
const Comment = require('./commentModel');
const mergeApprovedFields = require('../../util/helpers').mergeApprovedFields;

exports.params = async (req, res, next, id) => {
    try {
        const comment = await Comment.findById(id)
        .populate('author')
        .exec();

        if (!comment) {
            return next(new Error('No comment with that id'));
        }
        req.comment = comment;
        next();
    } catch (err) {
        next(err);
    }
}

exports.get = async (req, res, next) => {
    try {
        const comments = await Comment.find({})
        .populate('author')
        .exec();

        res.json(comments);
    } catch (err) {
        next(err);
    }
}

exports.getOne = (req, res, next) => {
    const comment = req.comment;
    res.json(comment);
};

exports.put = async (req, res, next) => {
    // Check that the current user is actually the author of this comment
    if (!req.comment.author._id.equals(req.currentUser._id)) {
        return res.status(401).send();
    }

    try {
        const saved = await mergeApprovedFields(['text'], req.body, req.comment).save();
        res.json(saved);
    } catch (err) {
        next(err);
    }
};

// You need to supply 'text' in request body, however 'parents',
// 'createdAt', 'updatedAt', 'author' and 'discussion' are all taken care of on the  
// backend. 

exports.post = async (req, res, next) => {
    if (!req.body.text) {
        return res.status(400).send("You didn't supply any text for the comment.");
    }
    const objectId = mongoose.Types.ObjectId();
    try {
        const newComment = await Comment.create({
            text: req.body.text, 
            _id: objectId,
            author: req.user._id,
            discussion: req.comment.discussion,
            parents: [ ...req.comment.parents, objectId ]
        });
        res.json(newComment);
    } catch (err) {
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    // Check that the current user is actually the author of this comment
    if (!req.comment.author._id.equals(req.currentUser._id)) {
        return res.status(401).send();
    }
    try {
        const removed = await req.comment.remove();
        res.json(removed);
    } catch (err) {
        next(err);
    }
}