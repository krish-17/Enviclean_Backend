/* Author Dhrumil Amish Shah */
const patronPostDB = require('../database/patronPostDB');

const makePatronMember = async (userId) => {
    const { payload, message } = await patronPostDB.makePatronMember(userId);
    return { payload, message };
};

const getPatronPosts = async () => {
    const { payload, message } = await patronPostDB.getPatronPosts();
    return { payload, message };
};

const createPatronPost = async (imageFilePath, body) => {
    const { payload, message } = await patronPostDB.createPatronPost(imageFilePath, body);
    return { payload, message };
};

const deletePatronPost = async (userId, patronPostId) => {
    const { payload, message } = await patronPostDB.deletePatronPost(userId, patronPostId);
    return { payload, message };
};

const fullFillPatronPost = async (patronPostId) => {
    const { payload, message } = await patronPostDB.fullFillPatronPost(patronPostId);
    return { payload, message };
};

module.exports = {
    makePatronMember,
    getPatronPosts,
    createPatronPost,
    deletePatronPost,
    fullFillPatronPost
};