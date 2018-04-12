const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../api/user/userModel');
const config = require('../config/config');

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});
  
// I don't think this is necessary as I'm not using sessions.
passport.deserializeUser(function(_id, cb) {
    User.findById(_id, function (err, user) {
        if (err) { return cb(err); }
            cb(null, user);
    });
});

passport.use(new LocalStrategy({
    passReqToCallback: true,
    session: false
  },
  (req, username, password, done) => {
    if (!username || !password) {
      res.status(403).send('You need a username and password');
      return;
    }
    User.findOne({username: username})
      .then(currentUser => {
          if (!currentUser) {
              return done(null, false, {message: 'Incorrect username.'});
          } else {
              // check the password
              if (!currentUser.authenticate(password)) {
                  return done(null, false, {message: 'Incorrect password.'});
              } else {
                  // if everything is good then attach to req.user and call
                  //  next so the controller can sign a token from the req.user._id
                  req.currentUser = currentUser;
                  return done(null, currentUser);
              }
          }
      }, err => {
          return done(err);
      });
  }
));

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secrets.jwt,
        passReqToCallback: true
    },
    (req, jwt_payload, done) => {
        User.findById(
            jwt_payload, 
            {
                password: 0,
                resetPasswordToken: 0,
                resetPasswordTokenExpiration: 0 
            }
        )
        .then(currentUser => {
            if (currentUser) {
                req.currentUser = currentUser;
                return done(null, currentUser);
            } else {
                return done(null, false);
            }
        }, err => {
            done(err, false);
        })
    }
))