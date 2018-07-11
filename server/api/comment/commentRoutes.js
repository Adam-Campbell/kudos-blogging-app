const router = require('express').Router();
const controller = require('./commentController');
const passport = require('passport');
const auth = require('../../auth/controller');

router.param('id', controller.params)

router.route('/')
    .get(controller.get)

router.route('/:id')
    .get(controller.getOne)
    //.post(passport.authenticate('jwt', {session: false}), controller.post)
    .post(auth.jwtAuthMiddleware, controller.post)
    //.put(passport.authenticate('jwt', {session: false}), controller.put)
    .put(auth.jwtAuthMiddleware, controller.put)
    //.delete(passport.authenticate('jwt', {session: false}), controller.delete)
    .delete(auth.jwtAuthMiddleware, controller.delete)

module.exports = router;

