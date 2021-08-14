/* Author Vishal Dipak Parmar */
const rewardsService = require('../services/rewardsService');
const Response = require('../models/response');

const addRewards = async(body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response("Bad request. Please send request body.", false, undefined, 400);
        } else {
            const { payload, message } = await rewardsService.addRewards(body);
            console.log(payload);
            if (payload == undefined) {
                var response = new Response(message, false, payload, 500);
            } else {
                var response = new Response(message, true, payload, 200);
            }
        }
    } catch (error) {
        console.log(error);
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const getRewards = async(id) => {
    try {
        const { payload, message } = await rewardsService.getRewards(id);
        if (payload == undefined) {
            var response = new Response("Reward not found", false, payload, 404);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const deleteRewards = async(id) => {
    try {
        const { payload, message } = await rewardsService.deleteRewards(id);
        if (payload == undefined) {
            var response = new Response("Reward not found", false, payload, 404);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

module.exports = {
    addRewards,
    getRewards,
    deleteRewards
}