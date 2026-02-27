const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const auth = require('../middleware/auth');
const {
    uploadProfilePicture,
    deleteProfilePicture,
    updateProfilePicture,
    getFileMetadata
} = require('../controllers/fileController');

// Configure multer with Cloudinary storage
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images allowed.'), false);
        }
    }
});

// Error handler
const handleMulterError = (err, req, res, next) => {
    if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};

router.post('/profile', auth, upload.single('image'), handleMulterError, uploadProfilePicture);
router.put('/profile', auth, upload.single('image'), handleMulterError, updateProfilePicture);
router.delete('/profile', auth, deleteProfilePicture);
router.get('/metadata', auth, getFileMetadata);

module.exports = router;