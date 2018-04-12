const mongoose = require('mongoose');
const Comment = require('./commentModel');

exports.params = async (req, res, next, id) => {
    try {
        const comment = await Comment.findById(id)
        .populate('author', {password: 0})
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
        .populate('author', {password: 0})
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
    // The array contains all accepted fields that the user can edit. The reduce turns this array
    // into an object containing any fields from the array that the client sent in req.body and
    // excluding the rest. Object.assign then merges these fields into the comment and then calls
    // save. The advantage of this approach is that as the object grows more complex and more 
    // fields are added, the only change needed in this function is to add the field names into 
    // the acceptedFields array.
    const acceptedFields = ['text'].reduce((acc, field, index, arr) => {
        if (req.body[field]) {
            acc[field] = req.body[field];
        }
        return acc;
    }, {});
    const comment = Object.assign(req.comment, acceptedFields);

    try {
        const saved = await comment.save();
        res.json(saved);
    } catch (err) {
        next(err);
    }
};

// You need to supply 'text' in request body, however 'parents',
// 'createdAt', 'updatedAt', 'author' and 'discussion' are all taken care of on the  
// backend. 

exports.post = async (req, res, next) => {
    const objectId = mongoose.Types.ObjectId();
    try {
        const newComment = await Comment.create({
            ...req.body, 
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