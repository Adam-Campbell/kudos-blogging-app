const router = require('express').Router();
const controller = require('./controller');
const passport = require('passport');

router.post('/signin', passport.authenticate('local', {session: false}), controller.signin);
router.post('/forgot', controller.verifyByEmailAndUpdate, controller.sendResetPasswordEmail);
router.post('/reset/:resetPasswordToken', controller.verifyByTokenAndUpdate);

router.get('/google', passport.authenticate('google', { scope: ['profile'], session: false }));
router.get('/google/success', passport.authenticate('google', { session: false }), controller.signin);

module.exports = router;
