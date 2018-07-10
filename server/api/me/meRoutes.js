const router = require('express').Router();
const controller = require('./meController');
const passport = require('passport');
const auth = require('../../auth/controller');
//const upload = require('../../middleware/multerConfig');
const upload = require('./avatarUpdateMulterConfig');


router.param('userId', controller.checkUserExists);
router.param('postId', controller.checkPostExists);

router.route('/')
    //.get(passport.authenticate('jwt', {session: false}), controller.get)
    .get(auth.jwtAuthMiddleware, controller.get)
    //.put(passport.authenticate('jwt', {session: false}), controller.put)
    .put(auth.jwtAuthMiddleware, controller.put)
    //.delete(passport.authenticate('jwt', {session: false}), controller.delete)
    .delete(auth.jwtAuthMiddleware, controller.delete)

router.route('/password')
    //.put(passport.authenticate('jwt', {session: false}), controller.updatePassword)
    .put(auth.jwtAuthMiddleware, controller.updatePassword)

router.route('/follows')
    //.get(passport.authenticate('jwt', {session: false}), controller.getAllFollows)
    .get(auth.jwtAuthMiddleware, controller.getAllFollows)

router.route('/follows/:userId')
    //.get(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.checkIfFollowingUser)
    .get(auth.jwtAuthMiddleware, controller.findFollow, controller.checkIfFollowingUser)
    //.put(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.followUser)
    .put(auth.jwtAuthMiddleware, controller.findFollow, controller.followUser)
    //.delete(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.unfollowUser)
    .delete(auth.jwtAuthMiddleware, controller.findFollow, controller.unfollowUser)

router.route('/kudos')
    //.get(passport.authenticate('jwt', {session: false}), controller.getAllKudos)
    .get(auth.jwtAuthMiddleware, controller.getAllKudos)

router.route('/kudos/:postId')
    //.get(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.checkIfKudosGiven)
    .get(auth.jwtAuthMiddleware, controller.findKudos, controller.checkIfKudosGiven)
    //.put(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.giveKudos)
    .put(auth.jwtAuthMiddleware, controller.findKudos, controller.giveKudos)
    //.delete(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.removeKudos)
    .delete(auth.jwtAuthMiddleware, controller.findKudos, controller.removeKudos)

router.route('/highlights')
    //.get(passport.authenticate('jwt', {session: false}), controller.getAllHighlights)
    .get(auth.jwtAuthMiddleware, controller.getAllHighlights)

router.route('/highlights/:postId')
    //.get(passport.authenticate('jwt', {session: false}), controller.getAllHighlightsForPost) 
    .get(auth.jwtAuthMiddleware, controller.getAllHighlightsForPost) 
    // get any highlights the current user has added to the current post
    //.put(passport.authenticate('jwt', {session: false}), controller.createHighlight) 
    .put(auth.jwtAuthMiddleware, controller.createHighlight) 
    // add a highlight from the current user on the current post
    //.delete(passport.authenticate('jwt', {session: false}), controller.deleteHighlight) 
    .delete(auth.jwtAuthMiddleware, controller.deleteHighlight)
    // remove a highlight that the current user has added to the current post

router.route('/images')
    //.put(passport.authenticate('jwt', {session: false}), upload.single('avatar'), controller.updateImage);
    .put(auth.jwtAuthMiddleware, upload.single('avatar'), controller.updateImage);

module.exports = router;








// router.route('/')
//     .get(passport.authenticate('jwt', {session: false}), controller.get)
//     .put(passport.authenticate('jwt', {session: false}), controller.put)
//     .delete(passport.authenticate('jwt', {session: false}), controller.delete)

// router.route('/password')
//     .put(passport.authenticate('jwt', {session: false}), controller.updatePassword)

// router.route('/follows')
//     .get(passport.authenticate('jwt', {session: false}), controller.getAllFollows)

// router.route('/follows/:userId')
//     .get(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.checkIfFollowingUser)
//     .put(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.followUser)
//     .delete(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.unfollowUser)

// router.route('/kudos')
//     .get(passport.authenticate('jwt', {session: false}), controller.getAllKudos)

// router.route('/kudos/:postId')
//     .get(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.checkIfKudosGiven)
//     .put(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.giveKudos)
//     .delete(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.removeKudos)

// router.route('/highlights')
//     .get(passport.authenticate('jwt', {session: false}), controller.getAllHighlights)

// router.route('/highlights/:postId')
//     .get(passport.authenticate('jwt', {session: false}), controller.getAllHighlightsForPost) 
//     // get any highlights the current user has added to the current post
//     .put(passport.authenticate('jwt', {session: false}), controller.createHighlight) 
//     // add a highlight from the current user on the current post
//     .delete(passport.authenticate('jwt', {session: false}), controller.deleteHighlight) 
//     // remove a highlight that the current user has added to the current post

// router.route('/images')
//     .put(passport.authenticate('jwt', {session: false}), upload.single('avatar'), controller.updateImage);

// module.exports = router;