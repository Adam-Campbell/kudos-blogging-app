const router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));
router.use('/posts', require('./post/postRoutes'));
router.use('/comments', require('./comment/commentRoutes'));
router.use('/me', require('./me/meRoutes'));
router.use('/upload', require('./upload/uploadRoutes'));

module.exports = router;
