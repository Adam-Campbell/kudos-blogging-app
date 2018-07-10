const express = require('express');
const app = express();
const api = require('./api/api');
const config = require('./config/config');
const logger = require('./util/logger');
const auth = require('./auth/routes');
const cookieParser = require('cookie-parser');

// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);

if (config.seed) {
  //require('./util/seed');
}

app.use(express.static('uploads'));
// setup the app middlware
require('./middleware/appMiddleware')(app);
// app.get('*', function(req, res, next) {
//   console.log(req.cookies);
//   next();
// });
// setup the api
app.use('*', function(req, res, next) {
  console.log('cookie logger called');
  console.log(req.cookies);
  next();
});
app.use('/api', api);
app.use('/auth', auth);
// set up global error handling


app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  let status = 500;
  if (err.message === 'Invalid file type submitted') {
    status = 400;
  } else if (err.message === 'Duplicate username') {
    status = 422
  }
  
  logger.error(err.stack);
  res.status(status).send(err.message);
  //res.status(status).json({error: err.message});
  
});

// export the app for testing
module.exports = app;
