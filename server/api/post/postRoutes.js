const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./postController');
const passport = require('passport');
const upload = require('./createPostMulterConfig');
const auth = require('../../auth/controller');

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  //.post(passport.authenticate('jwt', {session: false}), upload.single('image'), controller.post)
  //.post(passport.authenticate('jwt', {session: false}), controller.post)
  .post(auth.jwtAuthMiddleware, controller.post)

router.route('/:id')
  .get(controller.getOne)
  //.put(passport.authenticate('jwt', {session: false}), upload.single('image'), controller.put)
  //.put(passport.authenticate('jwt', {session: false}), controller.put)
  .put(auth.jwtAuthMiddleware, controller.put)
  //.delete(passport.authenticate('jwt', {session: false}), controller.delete)
  .delete(auth.jwtAuthMiddleware, controller.delete)

router.route('/:id/comments')
  .get(controller.getComments)
  //.post(passport.authenticate('jwt', {session: false}), controller.postComment)
  .post(auth.jwtAuthMiddleware, controller.postComment)

router.route('/:id/kudos')
  .get(controller.getKudosCount)
  

module.exports = router;
