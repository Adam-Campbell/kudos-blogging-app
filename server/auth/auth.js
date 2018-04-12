const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt, requestProperty: 'currentUser' });
const User = require('../api/user/userModel');


exports.decodeToken = () => (req, res, next) => {
    console.log('called decode token');
    // If access_token is in query string instead of attached to req.headers
    // then add it to req.headers
    if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    // Decoded token is attached to req.user. If token is valid next is called,  
    // if not then error is sent.
    checkToken(req, res, next);
};


exports.getFreshUser = () => (req, res, next) => {
    console.log('called getFreshUser');
    User.findById(req.currentUser._id, {password: 0})
    .then(currentUser => {
        if (!currentUser) {
            // if token doesn't decode to a user that exists in the 
            // database then reject token. 
            res.status(401).send('Unauthorized');
        } else {
            // update req.user with the user info
            req.currentUser = currentUser;
            next();
        }
    }, err => {
        next(err);
    });
};



exports.verifyUser = () => (req, res, next) => {
    console.log('called verifyUser');
    const {username, password} = req.body;
    // if no username or password then send error
    if (!username || !password) {
        res.status(400).send('You need a username and password');
        return;
    }
    // look user up in the DB so we can check
    // if the passwords match for the username
    User.findOne({username: username})
    .then(currentUser => {
        if (!currentUser) {
            res.status(401).send('No user with the given username');
        } else {
            // check the password
            if (!currentUser.authenticate(password)) {
                res.status(401).send('Wrong password');
            } else {
                // if everything is good then attach to req.user and call
                //  next so the controller can sign a token from the req.user._id
                req.currentUser = currentUser;
                next();
            }
        }
    }, err => {
        next(err);
    });
};


// util method to sign tokens on signup
exports.signToken = id => {
    console.log('called signToken');
    return jwt.sign(
        {_id: id},
        config.secrets.jwt,
        {expiresIn: config.expiresIn}
    );
};