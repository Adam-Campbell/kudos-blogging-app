const User = require('../api/user/userModel');
const signToken = require('./auth').signToken;
const nodemailer = require('nodemailer');
const crypto = require('crypto');


exports.sendResetPasswordEmail = (req, res, next) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
  });
  const mailOptions = {
    to : req.body.email,
    subject : 'Password reset email',
    text : `Click the link below to reset your password:
    
      http://${req.headers.host}/auth/reset/${req.currentUser.resetPasswordToken}
    `
  };
  smtpTransport.sendMail(mailOptions, (err, response) => {
    if (err) {
        return next(err);
    }
    res.send("sent");
  });
};

exports.verifyByEmailAndUpdate = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(401).send('No user with that email.');
  }
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordTokenExpiration = Date.now() + 3600000;
  user.save((err, user) => {
    if (err) {
      next(err);
    } else {
      req.currentUser = user;
      next();
    }
  });
};

exports.verifyByTokenAndUpdate = async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.resetPasswordToken,
    resetPasswordTokenExpiration: { $gt: Date.now() }
  });
  if (!user) {
    return res.status(401).send('Password reset token is either invalid or expired, please request another one.');
  }
  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordTokenExpiration = null;
  user.save((err, saved) => {
    if (err) {
      return next(err);
    }
    userObject = saved.toObject();
    delete userObject.password;
    delete userObject.resetPasswordToken;
    delete userObject.resetPasswordTokenExpiration;
    res.json(userObject);
  })
}

exports.signin = (req, res, next) => {
  const token = signToken(req.currentUser._id);
  res.json({token: token});
};
