const mongoose = require('mongoose');
const Post = require('./postModel');
const Comment = require('../comment/commentModel');
const Kudos = require('../kudos/kudosModel');
const logger = require('../../util/logger');


// helper function for converting comments collection into a threaded collection.
const makeThreaded = comments => {
    // sort comments so that comments with the most parents are first
    const sorted = [...comments].sort((a,b) => b.parents.length - a.parents.length);
    sorted.forEach((comment, index, arr) => {
        // Check if this comment actually has a parent, if not then we don't need to do anything.
        if (comment.parents.length > 1) {
            // grab the parent comment
            const parentComment = arr.find(el => {
                return el._id.equals(comment.parents[comment.parents.length - 2]);
            });
            // if the parent comment doesn't have a replies array, then add it. 
            if (!parentComment.replies) {
                parentComment.replies = [];
            }
            // push comment onto parentComment's replies array.
            parentComment.replies.push(comment);
        }
    });
    // We only actually want the top level comments, so filter out everything with a parent. 
    // All of the nested comments now reside within the replies array of their parent, so they don't
    // need to be in the main array anymore. 
    return sorted.filter(el => el.parents.length < 2);
}


// exports.params = (req, res, next, id) => {
//     Post.findById(id)
//     .populate('author', {password: 0})
//     .exec()
//     .then(post => {
//         if (!post) {
//             next(new Error('No post with that id'));
//         } else {
//             req.post = post;
//             next();
//         }
//     }, err => {
//         next(new Error("The post id supplied wasn't valid"));
//     });
// };

exports.params = async (req, res, next, id) => {
    try {
        const post = await Post.findById(id)
        .populate('author', {password: 0})
        .exec();

        if (!post) {
            return next(new Error('No post with that id'));
        }
        req.post = post;
        next();
    } catch (err) {
        next(new Error("The post id supplied wasn't valid"));
    }
}


// If you hit this endpoint without using a query string it will give you
// all posts from all categories. If you hit it with a query string containing
// a valid category it will give you only the posts for that category. 
// exports.get = (req, res, next) => {
//     let query = req.query.category ?
//     { categories: req.query.category } :
//     {};

//     Post.find(query)
//     .populate('author', {password: 0})
//     .exec()
//     .then(posts => {
//         res.json(posts);
//     }, err => {
//         next(err);
//     });
// };

exports.get = async (req, res, next) => {
    // set query to the supplied category if there was one, or else
    // just an empty object.
    const query = req.query.category ?
    { categories: req.query.category } :
    {};

    try {
        const posts = await Post.find(query)
        .populate('author', {password: 0})
        .exec();

        res.json(posts);
    } catch (err) {
        next(err);
    }


}

exports.getOne = (req, res, next) => {
    const post = req.post;
    res.json(post);
};

// exports.put = (req, res, next) => {
//     if (!req.post.author._id.equals(req.currentUser._id)) {
//         return res.status(401).send();
//     } 
//     const post = Object.assign(req.post, req.body);
//     post.save((err, saved) => {
//         if (err) {
//             next(err);
//         } else {
//             res.json(saved);
//         }
//     });  
// }

exports.put = async (req, res, next) => {
    // Check that the current user is actually the author of this post
    if (!req.post.author._id.equals(req.currentUser._id)) {
        return res.status(401).send();
    }
    // The array contains all accepted fields that the user can edit. The reduce turns this array
    // into an object containing any fields from the array that the client sent in req.body and
    // excluding the rest. Object.assign then merges these fields into the post and then calls
    // save The advantage of this approach is that as the object grows more complex and more 
    // fields are added, the only change needed in this function is to add the field names into 
    // the acceptedFields array.
    const acceptedFields = ['title', 'text', 'categories'].reduce((acc, field, index, arr) => {
        if (req.body[field]) {
            acc[field] = req.body[field];
        }
        return acc;
    }, {});
    const post = Object.assign(req.post, acceptedFields);

    try {
        const saved = await post.save();
        res.json(saved);
    } catch (err) {
        next(err);
    }
}

// exports.post = (req, res, next) => {
//     Post.create({
//         ...req.body,
//         author: req.currentUser._id
//     })
//     .then(post => {
//         res.json(post);
//     }, err => {
//         logger.error(err);
//         next(err);
//     });
// };

exports.post = async (req, res, next) => {
    try {
        const post = await Post.create({
            ...req.body,
            author: req.currentUser._id
        });
        res.json(post);
    } catch (err) {
        next(err);
    }
}

// exports.delete = (req, res, next) =>{
//     if (!req.post.author._id.equals(req.currentUser._id)) {
//         return res.status(401).send();
//     }
//     req.post.remove(function(err, removed) {
//         if (err) {
//             next(err);
//         } else {
//             res.json(removed);
//         }
//     });
// };

exports.delete = async (req, res, next) => {
    // Check that the current user is actually the author of this post
    if (!req.post.author._id.equals(req.currentUser._id)) {
        return res.status(401).send();
    }
    try {
        const removed = await req.post.remove();
        res.json(removed);
    } catch (err) {
        next(err);
    }

}


// exports.getComments = (req, res, next) => {
//     Comment.find({discussion: req.post._id})
//     .populate('author', {password: 0})
//     .lean()
//     .exec()
//     .then(comments => {
//         const threaded = makeThreaded(comments);
//         res.json(threaded);
//     }, err => {
//         next(err)
//     });
// }

exports.getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({discussion: req.post._id})
        .populate('author', {password: 0})
        .lean()
        .exec();

        const threaded = makeThreaded(comments);
        res.json(threaded);
    } catch (err) {
        next(err);
    }
}


// You need to supply 'text' and in request body, however 'parents',
// 'createdAt', 'updatedAt', 'author' and 'discussion' are all taken care of on the  
// backend. 

// exports.postComment = async (req, res, next) => {
//     const objectId = mongoose.Types.ObjectId();
    
//     Comment.create({
//         ...req.body,
//         author: req.user._id,
//         discussion: req.params.id,
//         _id: objectId,
//         parents: [objectId],
//     })
//     .then(comment => {
//         res.json(comment);
//     }, err => {
//         next(err);
//     });   
// };

exports.postComment = async (req, res, next) => {
    const objectId = mongoose.Types.ObjectId();
    try {
        const newComment = await Comment.create({
            ...req.body,
            author: req.user._id,
            discussion: req.post._id,
            _id: objectId,
            parents: [objectId]
        });
        res.json(newComment);
    } catch (err) {
        next(err);
    }
}

exports.getKudosCount = async (req, res, next) => {
    try {
        const kudos = await Kudos.count({post: req.post._id});
        res.json({kudos: kudos});
    } catch (err) {
        next(err);
    }
}
