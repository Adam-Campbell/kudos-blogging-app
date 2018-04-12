const router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const controller = require('./controller');
const passport = require('passport');
const signToken = require('./auth').signToken;
const User = require('../api/user/userModel');

router.post('/signin', passport.authenticate('local'), controller.signin);
router.post('/forgot', controller.verifyByEmailAndUpdate, controller.sendResetPasswordEmail);
router.post('/reset/:resetPasswordToken', controller.verifyByTokenAndUpdate);

module.exports = router;
