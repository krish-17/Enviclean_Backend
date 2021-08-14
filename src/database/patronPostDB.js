/* Author Dhrumil Amish Shah */
const PatronPost = require('../models/patronPost');
const User = require('../models/user');
const cloudinary = require('../config/cloudinary.config');
const STATUS_ACTIVE = 'ACTIVE';
const STATUS_FULLFILLED = 'FULLFILLED';

const makePatronMember = async (userId) => {
    try {
        const user = await User.findOne({ where: { id: userId } });
        user.isPatron = true;
        await user.save();
        return { payload: { isPatron: true }, message: 'Enrolled as patron successfully.' }
    } catch (error) {
        return { payload: undefined, message: error.message };
    }
};

const getPatronPosts = async () => {
    try {
        const allPatronPosts = await PatronPost.findAll(({
            order: [['patronPostId', 'DESC']],
            raw: true
        }));
        return { payload: { allPatronPosts: allPatronPosts }, message: 'All patron posts' }
    } catch (error) {
        return { payload: undefined, message: error.message };
    }
};

const createPatronPost = async (imageFilePath, body) => {
    try {
        const imageResult = await cloudinary.v2.uploader.upload(imageFilePath);
        if (imageResult.error) {
            return { payload: undefined, message: 'Bad request. Failed to upload the image. Please try again' };
        } else {
            const patronPost = {
                streetAddress: body.streetAddress,
                city: body.city,
                province: body.province,
                zipCode: body.zipCode,
                image: imageResult.secure_url,
                imageId: imageResult.public_id,
                status: STATUS_ACTIVE,
                createdAt: new Date().toISOString(),
                userId: parseInt(body.userId)
            };
            const patronPostInserted = await PatronPost.create(patronPost);
            patronPost['patronPostId'] = patronPostInserted.patronPostId;
            return { payload: { patronPostInsert: patronPost }, message: 'Patron post inserted successfully' };
        }
    } catch (error) {
        return { payload: undefined, message: error.message };
    }
};

const deletePatronPost = async (userId, patronPostId) => {
    try {
        const patronPost = await PatronPost.findOne({ where: { patronPostId: patronPostId, userId: userId } });
        if (patronPost == undefined || patronPost == null) {
            return { payload: undefined, message: 'Bad request' };
        } else if (patronPost.status === STATUS_FULLFILLED) {
            return { payload: undefined, message: `Bad request. Failed to delete the post. Status already ${STATUS_FULLFILLED}` };
        } else {
            await cloudinary.v2.uploader.destroy(patronPost.imageId);
            await PatronPost.destroy({ where: { patronPostId: patronPostId, userId: userId } });
            return { payload: { patronPostId: parseInt(patronPostId), userId: parseInt(userId) }, message: 'Post deleted successfully' }
        }
    } catch (error) {
        return { payload: undefined, message: error.message };
    }
};

const fullFillPatronPost = async (patronPostId) => {
    try {
        const patronPost = await PatronPost.findOne({ where: { patronPostId: patronPostId } });
        if (patronPost == undefined || patronPost == null) {
            return { payload: undefined, message: 'Bad request' };
        } else if (patronPost.status === STATUS_FULLFILLED) {
            return { payload: undefined, message: `Bad request. Already ${STATUS_FULLFILLED}` };
        } else {
            patronPost.status = STATUS_FULLFILLED;
            await patronPost.save();
            return { payload: { patronPostId: parseInt(patronPostId), status: STATUS_FULLFILLED }, message: `Post updated successfully. Status ${STATUS_FULLFILLED}` }
        }
    } catch (error) {
        return { payload: undefined, message: error.message };
    }
};

module.exports = {
    makePatronMember,
    getPatronPosts,
    createPatronPost,
    deletePatronPost,
    fullFillPatronPost
};