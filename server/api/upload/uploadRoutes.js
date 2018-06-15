const router = require('express').Router();
const controller = require('./uploadController');
const passport = require('passport');
const upload = require('./uploadImageMulterConfig');

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), upload.single('image'), controller.uploadImage)

module.exports = router;