module.exports = {
    // enabled logging for development
    logging: true,
    seed: true,
    db: {
      url: 'mongodb://localhost/mediumclone'
    },
    //staticUrl: `http://localhost:${process.env.PORT}/`
    staticUrl: `http://192.168.1.67:${process.env.PORT}/`
  };
  