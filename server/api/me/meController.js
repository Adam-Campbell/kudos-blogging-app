const Follow = require('../follow/followModel');
const User = require('../user/userModel');
const Post = require('../post/postModel');
const Comment = require('../comment/commentModel');
const Kudos = require('../kudos/kudosModel');
const Highlight = require('../highlight/highlightModel');
const config = require('../../config/config');
const mergeApprovedFields = require('../../util/helpers').mergeApprovedFields;

exports.get = async (req, res, next) => {
    const currentUser = req.currentUser.toObject();
    try {
        const followersReq = Follow.count({followee: req.currentUser._id});
        const followingReq = Follow.count({follower: req.currentUser._id});
        const followersRes = await followersReq;
        const followingRes = await followingReq;
        const finalCurrentUserObject = {
            ...currentUser,
            followers: followersRes,
            following: followingRes
        };
        res.json(finalCurrentUserObject);
    } catch(err) {
        next(err);
    }
}

// Allows user to update their info, however it is limited to certain fields, as some fields
// we don't want users to have free access to. If any of those fields are sent in the request
// body they will just de ignored. 

exports.put = async (req, res, next) => {
    try {
        const savedUser = await mergeApprovedFields(
            ['username', 'email', 'bio'],
            req.body,
            req.currentUser
        )
        .save();

        currentUserObject = savedUser.toObject();
        delete currentUserObject.password;
        delete currentUserObject.resetPasswordToken;
        delete currentUserObject.resetPasswordTokenExpiration;
        res.json(currentUserObject);
    } catch (err) {
        next(err);
    }   
}


exports.updatePassword = async (req, res, next) => {
    // Needs old password and new password attached to request.
    if (!req.body.old || !req.body.new) {
        return res.status(400).send('Please supply both the current password and the new password.');
    }
    const fullUser = await User.findById(req.currentUser._id).select('+password').exec();
    // Check if old password matches the hashed password in DB. If not then send back error.
    if (!fullUser.authenticate(req.body.old)) {
        return res.status(401).send('Incorrect password');
    }
    // Updated password and save back to DB. Password is automatically hashed due to pre-save method 
    //attached to the User schema.
    fullUser.password = req.body.new;
    try {
        await fullUser.save();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};


async function purgePosts(_id) {
    try {
        // Get all the users posts, and map over them
        const posts = await Post.find({author: _id});
        const purgedPosts = posts.map(async post => {
            // For each post, find all the kudos and highlights related to that post.
            // Awaited afterwards so the requests run in parallel.
            const kudos = Kudos.find({post: post._id});
            const highlights = Highlight.find({post: post._id});
            const foundKudos = await kudos;
            const foundHighlights = await highlights;
            // Map over kudos and highlights and remove each one
            const purgedKudos = foundKudos.map(kudos => kudos.remove());
            const purgedHighlights = foundHighlights.map(highlight => highlight.remove());
            // Return a promise that resolves when all of the kudos and highlights have been
            // removed, as well as the post itself. 
            return Promise.all([purgedKudos, purgedHighlights, post.remove()]);
        });
        // Return promise that resolves when all posts have been removed.
        return Promise.all(purgedPosts);
    } catch (err) {
        return err;
    }
}

// We don't actually want to delete the comments, as this could interfere with comment chains.
// However, we will go through each of the users comments and delete references to the user as
// well as the actual text content of the comment. 
async function purgeComments(_id) {
    try {
        const comments = await Comment.find({author: _id});
        const purgedComments = comments.map(comment => {
            comment.author = null;
            comment.text = 'Deleted';
            return comment.save();
        });
        return Promise.all(purgedComments);
    } catch (err) {
        return err;
    }
}

async function purgeFollows(_id) {
    try {
        const follows = await Follow.find({
            $or: [
                {follower: _id},
                {followee: _id}
            ]
        });
        const purgedFollows = follows.map(follow => follow.remove());
        return Promise.all(purgedPosts);
    } catch (err) {
        return err;
    }
}

async function purgeKudos(_id) {
    try {
        const kudos = await Kudos.find({user: _id});
        const purgedKudos = kudos.map(kudos => kudos.remove());
        return Promise.all(purgedKudos);
    } catch (err) {
        return err;
    }
}

async function purgeHighlights(_id) {
    try {
        const highlights = await Highlight.find({user: _id});
        const purgedHighlights = highlights.map(highlight => highlight.remove());
    } catch (err) {
        return err;
    }
}

// This is the main delete function, which calls remove on the actual document and also
// calls all of the other functions responsible for tidying up other aspects of the users
// activity.
exports.delete = async (req, res, next) => {
    const currentUser = req.currentUser;
    try {
        const removed = await currentUser.remove();
        const purgedPosts = purgePosts(removed._id);
        const purgedComments = purgeComments(removed._id);
        const purgedFollows = purgeFollows(removed._id);
        const purgedKudos = purgeKudos(removed._id);
        const purgedHighlights = purgeHighlights(removed._id);
        await Promise.all([purgedPosts, purgedComments, purgedFollows, purgedKudos, purgedHighlights]);
        res.status(200).json(removed);
    } catch (err) {
        next(err);
    }
}


// beginning of logic for /follows/ 

exports.checkUserExists = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        if (!user) {
            return next(new Error('No user with that id'));
        }
        req.paramsUser = user;
        next();
    } catch (err) {
        next(err);
    }
}

exports.findFollow = async (req, res, next) => {
    // find one will always resolve to either the Follow object if it exists,
    // or to null if it doesn't. We can then just test the truthiness of follow
    // later on to determine whether the relationship exists.
    try {
        const follow = await Follow.findOne({
            follower: req.currentUser._id, 
            followee: req.paramsUser._id
        });
        req.follow = follow;
        next();
    } catch (err) {
        next(err);
    }
}

exports.checkIfFollowingUser = (req, res, next) => {
    if (req.follow) {
        res.json(true);
    } else {
        res.json(false);
    }
}

exports.followUser = async (req, res, next) => {
    if (req.follow) {
        return res.status(400).send('Follow request unsuccessfull; you are already following that user.');
    } 
    try {
        const newFollow = await Follow.create({
            follower: req.currentUser._id,
            followee: req.paramsUser._id
        });
        res.status(204).send();
    } catch(err) {
        next(err);
    }
        
}

exports.unfollowUser = async (req, res, next) => {
    if (!req.follow) {
        return res.status(400).send("Unfollow request unsuccessfull; you weren't following that user.");
    }
    try {
        const removed = await req.follow.remove();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}


// beginning of logic for /kudos/ 

exports.checkPostExists = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId)
        .populate('author')
        .exec();
        if (!post) {
            return next(new Error('No post with that id'));
        }
        req.post = post; 
        next();
    } catch (err) {
        next(err);
    }
}

exports.findKudos = async (req, res, next) => {
    try {
        const kudos = await Kudos.findOne({
            user: req.currentUser._id,
            post: req.post._id
        });
        req.kudos = kudos;
        next();
    } catch (err) {
        next(err);
    }
}

exports.checkIfKudosGiven = (req, res, next) => {
    if (req.kudos) {
        res.json(true);
    } else {
        res.json(false);
    }
}

exports.giveKudos = async (req, res, next) => {
    if (req.kudos) {
        return res.status(400).send('Give kudos request unsuccessfull; you have already given kudos to this post.');
    }
    try {
        const newKudos = await Kudos.create({
            user: req.currentUser._id,
            post: req.params.postId
        });
        res.status(204).send();
    } catch(err) {
        next(err);
    }
} 

exports.removeKudos = async (req, res, next) => {
    if (!req.kudos) {
        return res.status(400).send("Remove kudos request unsuccessfull; you hadn't given kudos to this post.");
    }
    try {
        const removed = await req.kudos.remove();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}



// beginning of logic for /highlights/ 

// this is for finding all highlights that a user has created on a specific post. 
exports.getAllHighlightsForPost = async (req, res, next) => {
    try {
        const highlights = await Highlight.find({
            user: req.currentUser._id,
            post: req.post
        });
        res.json(highlights);
    } catch (err) {
        next(err);
    }
}

exports.createHighlight = async (req, res, next) => {
    // Check to see if a highlight with the same user, post and excerpt exists.
    // If it doesn't, create the new highlight. 
    // If it does, send back an error. 
    let highlight;
    
    try {
        highlight = await Highlight.findOne({
            user: req.currentUser._id,
            post: req.post._id,
            excerpt: req.body.excerpt
        });
    } catch (err) {
        return next(err);
    }

    if (highlight) {
        return res.status(400).send("Highlight creation unsuccessfull, you have already highlighted this excerpt.");
    }

    try {
        const newHighlight = await Highlight.create({
            user: req.currentUser._id,
            post: req.post._id,
            excerpt: req.body.excerpt
        });
        res.json(newHighlight);
    } catch (err) {
        next(err);
    }
    
}

exports.deleteHighlight = async (req, res, next) => {
    try {
        const removed = await Highlight.findOneAndRemove({
            user: req.currentUser._id,
            post: req.post._id,
            excerpt: req.body.excerpt 
        });
        if (!removed) {
            return res.status(400).send("Highlight removal unsuccessfull, this highlight doesn't exist."); 
        } 
        res.json(removed);
    } catch (err) {
        next(err);
    }
}

exports.updateImage = async (req, res, next) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.currentUser._id, 
            {avatar: `${config.staticUrl}${req.file.filename}`},
            {upsert: true, new: true}
        )
        .exec();
        res.json(updated);
    } catch (err) {
        next(err);
    }
}
