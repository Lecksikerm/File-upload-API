const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');


exports.uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        const user = await User.findById(req.user.id);

        // Delete old image from Cloudinary if exists
        if (user.profilePicture && user.profilePicture.publicId) {
            await cloudinary.uploader.destroy(user.profilePicture.publicId);
        }

        // Cloudinary file info is in req.file
        const fileMetadata = {
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            url: req.file.path, 
            publicId: req.file.filename, 
            uploadedAt: new Date()
        };

        user.profilePicture = fileMetadata;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile picture uploaded successfully',
            data: {
                profilePicture: {
                    url: fileMetadata.url,
                    originalName: fileMetadata.originalName,
                    size: fileMetadata.size,
                    mimeType: fileMetadata.mimeType,
                    uploadedAt: fileMetadata.uploadedAt
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.deleteProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user.profilePicture) {
            return res.status(400).json({
                success: false,
                message: 'No profile picture to delete'
            });
        }

        // Delete from Cloudinary
        if (user.profilePicture.publicId) {
            await cloudinary.uploader.destroy(user.profilePicture.publicId);
        }

        // Remove from user document
        user.profilePicture = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile picture deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.updateProfilePicture = async (req, res) => {
    return exports.uploadProfilePicture(req, res);
};

exports.getFileMetadata = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: {
                profilePicture: user.profilePicture || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};