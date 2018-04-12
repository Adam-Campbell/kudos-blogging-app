const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
        cb(null, `${req.currentUser._id}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const regex = /^.(jpg)|(jpeg)|(png)$/i;

    if (regex.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type submitted', false));
    }
};

module.exports = multer({storage: storage, fileFilter: fileFilter});