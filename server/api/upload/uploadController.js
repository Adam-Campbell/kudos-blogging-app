const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

async function resizeImage(inputImageFilePath, fileExt, desiredWidth) {
    const unique_id = crypto.randomBytes(20).toString('hex');
    const resizedImage = await sharp(inputImageFilePath)
    .resize(desiredWidth, null)
    .toFile(`./uploads/${unique_id}${fileExt}`);
    return {
        //imageUrl: `http://localhost:5000/${unique_id}${fileExt}`,
        imageUrl: `http://192.168.1.67:5000/${unique_id}${fileExt}`,
        size: {
            width: resizedImage.width,
            height: resizedImage.height
        }
    } 
}

exports.uploadImage = async (req, res, next) => {
    if (req.file.filename) {
        const fileExt = path.extname(req.file.originalname);
        //const fullImageUrl = `http://localhost:5000/${req.file.filename}`;
        const fullImageUrl = `http://192.168.1.67:5000/${req.file.filename}`;
        const originalMetadata = await sharp(req.file.path).metadata();
        const originalImage = {
            imageUrl: fullImageUrl,
            size: {
                width: originalMetadata.width,
                height: originalMetadata.height
            }
        }
        const cardSized = await resizeImage(req.file.path, fileExt, 800);
        const thumbnailSized = await resizeImage(req.file.path, fileExt, 16);
        const fullImageObject = {
            original: originalImage,
            card: cardSized,
            thumbnail: thumbnailSized
        };
        return res.json({images: fullImageObject});
    } 
    return res.status(200).send();
}