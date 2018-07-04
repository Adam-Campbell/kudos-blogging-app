const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../api/user/userModel');
const config = require('../config/config');

passport.use(new LocalStrategy({
        passReqToCallback: true,
        session: false
    },
    async (req, username, password, done) => {
        if (!username || !password) {
            return res.status(403).send('You need a username and password');
        }
        try {
            const currentUser = await User.findOne({username: username}).select('+password').exec();
            // Check that the user exists
            if (!currentUser) {
                return done(null, false, {message: 'Incorrect username.'});
            // Check that the password is valid
            } else if (!currentUser.authenticate(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            // If both test are passed then add currentUser to the request object
            // and call the done callback. 
            req.currentUser = currentUser;
            return done(null, currentUser);
        } catch (err) {
            return done(err);
        }
    }
));

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secrets.jwt,
        passReqToCallback: true,
        jsonWebTokenOptions: {
            maxAge: '10h'
        }
    },
    async (req, jwt_payload, done) => {
        try {
            const currentUser = await User.findById(jwt_payload)
            .select('-password')
            .select('+email')
            .exec();
            if (!currentUser) {
                return done(null, false);
            }
            req.currentUser = currentUser;
            return done(null, currentUser);
        } catch (err) {
            return done(err, false);
        }
    }
));

passport.use(new GoogleStrategy({
        clientID: config.googleAuth.clientId,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: `${config.staticUrl}auth/google/success`,
        passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
        
        try {
            const existingUser = await User.findOne({googleId: profile.id}).exec();
            
            if (existingUser) {
                // add the existing user to the request object and pass to the next 
                // middleware to create the JWT.
                req.currentUser = existingUser;
                return done(null, existingUser);
            }
            // Or if not then create the user, and then attach the new user to the 
            // request object and proceed to the next middleware. 
            const imageUrl = profile.photos.length ?
            profile.photos[0].value.split('?sz=')[0] :
            null;

            const newUser = await User.create({
                username: profile.displayName,
                googleId: profile.id,
                avatar: imageUrl
            });
            
            req.currentUser = newUser;
            return done(null, newUser);
        } catch (err) {
            done(err, false);
        }
    }
));
