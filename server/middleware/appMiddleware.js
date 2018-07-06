const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('../config/config');
require('../auth/passport');
// setup global middleware here

module.exports = app => {
  if (config.logging) {
    app.use(morgan('dev'));
  }
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors({ origin: true, credentials: true }));
  app.use(passport.initialize());
  //app.use(cors());
};