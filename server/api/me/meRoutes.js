const router = require('express').Router();
const controller = require('./meController');
const passport = require('passport');
const upload = require('../../middleware/multerConfig');


router.param('userId', controller.checkUserExists);
router.param('postId', controller.checkPostExists);

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), controller.get)
    .put(passport.authenticate('jwt', {session: false}), controller.put)
    .delete(passport.authenticate('jwt', {session: false}), controller.delete)

router.route('/password')
    .put(passport.authenticate('jwt', {session: false}), controller.updatePassword)

router.route('/follows/:userId')
    .get(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.checkIfFollowingUser)
    .put(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.followUser)
    .delete(passport.authenticate('jwt', {session: false}), controller.findFollow, controller.unfollowUser)

router.route('/kudos/:postId')
    .get(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.checkIfKudosGiven)
    .put(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.giveKudos)
    .delete(passport.authenticate('jwt', {session: false}), controller.findKudos, controller.removeKudos)

router.route('/highlights/:postId')
    .get(passport.authenticate('jwt', {session: false}), controller.getAllHighlightsForPost) 
    // get any highlights the current user has added to the current post
    .put(passport.authenticate('jwt', {session: false}), controller.createHighlight) 
    // add a highlight from the current user on the current post
    .delete(passport.authenticate('jwt', {session: false}), controller.deleteHighlight) 
    // remove a highlight that the current user has added to the current post

router.route('/images')
    .put(passport.authenticate('jwt', {session: false}), upload.single('avatar'), controller.updateImage);

module.exports = router;