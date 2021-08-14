/* Srikrishnan Sengottai Kasi */
const blogService = require('../services/blogService');
const Response = require('../models/response');

const createBlog = async (body) => {
    let response;
    try {
        if (Object.keys(body).length === 0) {
            response = new Response("Bad request. Please send request body.", false, undefined, 404);
        } else {
            const {payload, message} = await blogService.createBlog(body);
            if (!payload) {
                response = new Response(message, false, payload, 500);
            } else {
                response = new Response(message, true, payload, 200);
            }
        }
    } catch (error) {
        response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const getAllBlogs = async () => {
    let response;
    try {
        const {payload, message} = await blogService.getAllBlogs();
        if (!payload) {
            response = new Response("Oops!Something went wrong! Try Later", false, payload, 400);
        } else {
            let finalResponse = [];
            for (let i = 0; i < payload.length; ) {
                let innerArray = [];
                let j;
                for (j = 0; j < 4 && i+j < payload.length; j++) {
                    innerArray.push(payload[i+j]);
                }
                i = i+j;
                finalResponse.push(innerArray);
            }
            response = new Response(message, true, finalResponse, 200);
        }
    } catch (error) {
        response = new Response("Internal server error" + error.message, false, undefined, 500);
    }
    return response;
}

const updateBlog = async (id, body) => {
    let response;
    try {
        if (Object.keys(body).length === 0) {
            response = new Response("Bad request. Please send request body.", false, undefined, 404);
        } else {
            const {payload, message} = await blogService.updateBlog(id, body);
            if (payload) {
                response = new Response(message, false, payload, 500);
            } else {
                response = new Response(message, true, payload, 200);
            }
        }
    } catch (error) {
        response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const deleteBlog = async (id) => {
    let response;
    try {
        const {payload, message} = await depositorService.deleteDeposit(id);
        console.log(payload);
        if (!payload) {
            response = new Response("Blog Not Found", false, payload, 400);
        } else {
            response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}


module.exports = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
}