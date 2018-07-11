const router = require('express').Router();
const controller = require('./uploadController');
const passport = require('passport');
const upload = require('./uploadImageMulterConfig');
const auth = require('../../auth/controller');

router.route('/')
    //.post(passport.authenticate('jwt', {session: false}), upload.single('image'), controller.uploadImage)
    .post(auth.jwtAuthMiddleware, upload.single('image'), controller.uploadImage)

module.exports = router;