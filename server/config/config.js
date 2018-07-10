const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  // 10 days in minutes
  expiresIn: {
    //accessToken: '10h',
    accessToken: 30,
    refreshToken: '7d'
  },
  secrets: {
    jwt: process.env.JWT || 'gumball',
    refreshToken: process.env.refreshTokenSecret || 'scarlet'
  },
  googleAuth: {
    clientId: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret
  },
  twitterAuth: {
    clientId: process.env.twitterClientId,
    clientSecret: process.env.twitterClientSecret
  },
  facebookAuth: {
    clientId: process.env.facebookClientId,
    clientSecret: process.env.facebookCLientSecret
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
  envConfig = require('./' + config.env);
  // just making sure the require actually
  // got something back :)
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

module.exports = {
    ...config,
    ...envConfig
};
