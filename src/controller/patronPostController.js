/* Author Dhrumil Amish Shah */
const patronPostService = require('../services/patronPostService');
const Response = require('../models/response');

const makePatronMember = async (userId) => {
    try {
        const { payload, message } = await patronPostService.makePatronMember(userId);
        if (payload == undefined) {
            var response = new Response(message, false, payload, 500);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response('Internal server error', false, undefined, 500);
    }
    return response;
};

const getPatronPosts = async () => {
    try {
        const { payload, message } = await patronPostService.getPatronPosts();
        if (payload == undefined) {
            var response = new Response(message, false, payload, 500);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response('Internal server error', false, undefined, 500);
    }
    return response;
};

const createPatronPost = async (file, body) => {
    try {
        if (Object.keys(body).length == 0 || file == null || file == undefined) {
            var response = new Response('Bad request. Please send request body.', false, undefined, 400);
        } else {
            const { payload, message } = await patronPostService.createPatronPost(file.path, body);
            if (payload == undefined) {
                var response = new Response(message, false, payload, 500);
            } else {
                var response = new Response(message, true, payload, 200);
            }
        }
    } catch (error) {
        var response = new Response('Internal server error', false, undefined, 500);
    }
    return response;
};

const deletePatronPost = async (userId, patronPostId) => {
    try {
        const { payload, message } = await patronPostService.deletePatronPost(userId, patronPostId);
        if (payload == undefined) {
            var response = new Response(message, false, payload, 400);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response('Internal server error', false, undefined, 500);
    }
    return response;
};

const fullFillPatronPost = async (patronPostId) => {
    try {
        const { payload, message } = await patronPostService.fullFillPatronPost(patronPostId);
        if (payload == undefined) {
            var response = new Response(message, false, payload, 400);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response('Internal server error', false, undefined, 500);
    }
    return response;
};

module.exports = {
    makePatronMember,
    getPatronPosts,
    createPatronPost,
    deletePatronPost,
    fullFillPatronPost
}