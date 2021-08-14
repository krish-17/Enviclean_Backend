/* Author Sriram Attanti */
const depositorService = require('../services/depositorService');
const Response = require('../models/response');

const createDeposit = async(body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response("Bad request. Please send request body.", false, undefined, 404);
        } else {
            const { payload, message } = await depositorService.createDeposit(body);
            if (payload == undefined) {
                var response = new Response(message, false, payload, 500);
            } else {
                var response = new Response(message, true, payload, 200);
            }
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const getDepositsByUser = async(id) => {
    try {
        const { payload, message } = await depositorService.getDepositsByUser(id);
        if (payload == undefined) {
            var response = new Response("No deposits found", false, payload, 400);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const updateDeposit = async(id, body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response("Bad request. Please send request body.", false, undefined, 404);
        } else {
            const { payload, message } = await depositorService.updateDeposit(id, body);
            if (payload == undefined) {
                var response = new Response(message, false, payload, 500);
            } else {
                var response = new Response(message, true, payload, 200);
            }
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const deleteDeposit = async(id) => {
    try {
        const { payload, message } = await depositorService.deleteDeposit(id);
        console.log(payload);
        if (payload == undefined) {
            var response = new Response("Deposit Not Found", false, payload, 400);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}


module.exports = {
    createDeposit,
    getDepositsByUser,
    updateDeposit,
    deleteDeposit,
}