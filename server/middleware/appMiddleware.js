const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('../config/config');
require('../auth/passport');
// setup global middleware here

module.exports = app => {
  if (config.logging) {
    app.use(morgan('dev'));
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(passport.initialize());
};