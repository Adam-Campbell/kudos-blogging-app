const router = require('express').Router();
const controller = require('./commentController');
const auth = require('../../auth/auth');
const passport = require('passport');

router.param('id', controller.params)

router.route('/')
    .get(controller.get)

router.route('/:id')
    .get(controller.getOne)
    .post(passport.authenticate('jwt', {session: false}), controller.post)
    .put(passport.authenticate('jwt', {session: false}), controller.put)
    .delete(passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router;

