const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
        const unique_id = crypto.randomBytes(20).toString('hex');
        req.unique_id = unique_id;
        cb(null, `${unique_id}${path.extname(file.originalname)}`);
        //cb(null, `${req.currentUser._id}${path.extname(file.originalname)}`);
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