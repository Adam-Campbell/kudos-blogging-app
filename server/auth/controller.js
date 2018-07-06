const User = require('../api/user/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
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
  //http://${req.headers.host}/auth/reset/${req.currentUser.resetPasswordToken}
  const mailOptions = {
    to : req.body.email,
    subject : 'Password reset email',
    text : `Click the link below to reset your password:
    
      http://localhost:3000/reset/${req.currentUser.resetPasswordToken}
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
  const user = await User.findOne({email: req.body.email}).exec();
  if (!user) {
    return res.status(401).send('No user with that email.');
  }
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordTokenExpiration = Date.now() + 3600000;
  try {
    const saved = await user.save();
    req.currentUser = user;
    next();
  } catch (err) {
    next(err);
  }
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
  try {
    const saved = await user.save();
    userObject = saved.toObject();
    delete userObject.password;
    delete userObject.resetPasswordToken;
    delete userObject.resetPasswordTokenExpiration;
    res.json(userObject);
  } catch (err) {
    next(err);
  }
}

const signToken = id => {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expiresIn}
  );
}

exports.signToken = signToken;

exports.signin = (req, res, next) => {
  const token = signToken(req.currentUser._id);
  //console.log(req.cookies);
  res.cookie('token', token, { maxAge: 3600000, domain: 'localhost', httpOnly: false, secure: false }).json({token: token});
  //res.cookie('foo', 'bar')
  //res.json({token: token});
  //console.log(res);
  //.json({token: token});
}

