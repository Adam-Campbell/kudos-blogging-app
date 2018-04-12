const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./userController');


router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post)

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