const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./userController');
const passport = require('passport');
const signin = require('../../auth/controller').signin;

router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post, passport.authenticate('local', {session: false}), signin)

router.route('/:id')
    .get(controller.getOne)

router.route('/:id/posts')
    .get(controller.getUsersPosts)

router.route('/:id/comments')
    .get(controller.getUsersComments)

router.route('/:id/followers')
    .get(controller.getFollowerCount)

router.route('/:id/kudos')
    .get(controller.getKudos)

router.route('/:id/highlights')
    .get(controller.getHighlights)


module.exports = router;