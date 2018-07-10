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
    {expiresIn: config.expiresIn.accessToken}
  );
}

const signRefreshToken = id => {
  return jwt.sign(
    {_id: id},
    config.secrets.refreshToken,
    {expiresIn: config.expiresIn.refreshToken}
  );
}

exports.signToken = signToken;

// exports.signin = (req, res, next) => {
//   const token = signToken(req.currentUser._id);
//   res.cookie('token', token, { maxAge: 3600000, domain: 'localhost', httpOnly: true, secure: false });
//   res.json({token: token});
// }

exports.signin = (req, res, next) => {
  const token = signToken(req.currentUser._id);
  const refreshToken = signRefreshToken(req.currentUser._id);
  res.cookie('refreshToken', refreshToken, { maxAge: 3600000, domain: 'localhost', httpOnly: true, secure: false });
  res.cookie('token', token, { maxAge: 30000, domain: 'localhost', httpOnly: true, secure: false });
  res.status(204).send();
  //res.json({token: token});
}


/*
Handle JWTs and refresh token. 

- Check req.cookies for the JWT and refresh token.

- If the JWT is present and valid, decode and use the resulting _id payload to look up the user.
Add the user to the req object and pass control to the next middleware.

- If the JWT is missing, invalid, expired etc, check for refresh token. If refresh token is present
and valid, decode and use the resulting _id to generate a new token. Also look up the user, and add 
them to the req object. Use req.cookie to set the new token as a cookie on the response. Pass control 
to the next middleware.

- If there is no JWT or refresh token then there is no authorised user, so just return 401.

*/

function verifyToken(token) {
  return jwt.verify(
    token,
    config.secrets.jwt
  );
}

function verifyRefreshToken(refreshToken) {
  return jwt.verify(
    refreshToken, 
    config.secrets.refreshToken
  );
}

async function jwtAuthMiddleware(req, res, next) {
  if (req && req.cookies) {
    const { token, refreshToken } = req.cookies;
    if (token && token !== 'null') {
      try {
        const _id = verifyToken(token)._id;
        const currentUser = await User.findById(_id)
        .select('-password')
        .select('+email')
        .exec();
        if (!currentUser) {
          return res.status(401).send();
        }
        console.log(currentUser);
        req.currentUser = currentUser;
        return next();
      } catch (err) {
        return next(err);
      }
    } else if (refreshToken) {
      try {
        const _id = verifyRefreshToken(refreshToken);
        console.log(_id)
        const newToken = signToken(_id);
        const currentUser = await User.findById(_id)
        .select('-password')
        .select('+email')
        .exec();
        console.log(currentUser);
        if (!currentUser) {
          return res.status(401).send();
        }
        req.currentUser = currentUser;
        res.cookie('token', newToken, { maxAge: 30000, domain: 'localhost', httpOnly: true, secure: false });  
        return next();
      } catch (err) {
        return next(err);
      }
    } else {
      return res.status(401).send();
    }
  }
  return res.status(401).send();
}

exports.jwtAuthMiddleware = jwtAuthMiddleware;