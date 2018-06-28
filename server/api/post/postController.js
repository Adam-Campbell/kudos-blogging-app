const mongoose = require('mongoose');
const Post = require('./postModel');
const Comment = require('../comment/commentModel');
const Kudos = require('../kudos/kudosModel');
const logger = require('../../util/logger');
const mergeApprovedFields = require('../../util/helpers').mergeApprovedFields;


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


exports.params = async (req, res, next, id) => {
    try {
        const post = await Post.findById(id)
        .populate('author')
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
exports.get = async (req, res, next) => {
    // set query to the supplied category if there was one, or else
    // just an empty object.
    const query = req.query.category ?
    { category: req.query.category } :
    {};

    try {
        const posts = await Post.find(query)
        .populate('author')
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

exports.put = async (req, res, next) => {
    // Check that the current user is actually the author of this post
    if (!req.post.author._id.equals(req.currentUser._id)) {
        return res.status(401).send();
    }

    try {
        const saved = await mergeApprovedFields(
            [
                'titleText',
                'titleRaw',
                'descriptionText',
                'descriptionRaw',
                'image',
                'bodyRaw',
                'bodyObject',
                'category',
                'isInline'
            ],
            req.body, 
            req.post
        )
        .save();

        res.json(saved);
    } catch (err) {
        next(err);
    }
}


// exports.put = async (req, res, next) => {
//     // Check that the current user is actually the author of this post
//     if (!req.post.author._id.equals(req.currentUser._id)) {
//         return res.status(401).send();
//     }

//     // If a file was sent as part of the form then we set the url on req.body
//     if (req.file && req.file.filename) {
//         req.body.image = `http://localhost:5000/${req.file.filename}`;
//     } else {
//         // however even if there wasn't a file present multer will still add an image property
//         // to req.body, so we delete it to prevent any complications.
//         delete req.body.image;
//     }

//     try {
//         const saved = await mergeApprovedFields(
//             ['title', 'text', 'category', 'description', 'image'],
//             req.body, 
//             req.post
//         )
//         .save();

//         res.json(saved);
//     } catch (err) {
//         next(err);
//     }
// }

// exports.post = async (req, res, next) => {
//     if (req.file.filename) {
//         req.body.image = `http://localhost:5000/${req.file.filename}`;
//     } 
//     const strippedBody = mergeApprovedFields(
//         ['title', 'text', 'category', 'description', 'image'],
//         req.body,
//         {}
//     );

//     try {
//         const post = await Post.create({
//             ...strippedBody,
//             author: req.currentUser._id
//         });
//         res.json(post);
//     } catch (err) {
//         next(err);
//     }
// }

exports.post = async (req, res, next) => {
    const strippedBody = mergeApprovedFields(
        //['title', 'text', 'category', 'description', 'image'],
        [
            'titleText',
            'titleRaw',
            'descriptionText',
            'descriptionRaw',
            'image',
            'bodyRaw',
            'bodyObject',
            'category',
            'isInline'
        ],
        req.body,
        {}
    );

    try {
        const post = await Post.create({
            ...strippedBody,
            author: req.currentUser._id
        });
        res.json(post);
    } catch (err) {
        next(err);
    }
}

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


exports.getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({discussion: req.post._id})
        .populate('author')
        .lean()
        .exec();

        //const threaded = makeThreaded(comments);
        //res.json(threaded);
        res.json(comments);
    } catch (err) {
        next(err);
    }
}


// You need to supply 'text' and in request body, however 'parents',
// 'createdAt', 'updatedAt', 'author' and 'discussion' are all taken care of on the  
// backend. 
exports.postComment = async (req, res, next) => {
    if (!req.body.text) {
        return res.status(400).send("You didn't supply any text for the comment.");
    }

    const objectId = mongoose.Types.ObjectId();
    try {
        const newComment = await Comment.create({
            text: req.body.text,
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
