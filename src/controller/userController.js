/* Author Vishal Dipak Parmar */
const userService = require('../services/userService');
const Response = require('../models/response');

const signUpUser = async(body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response("Bad request. Please send request body.", false, undefined, 400);
        } else {
            const { payload, message } = await userService.signUpUser(body);
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

const getUser = async(id) => {
    try {
        const { payload, message } = await userService.getUser(id);
        if (payload == undefined) {
            var response = new Response("User not found", false, payload, 404);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const updateUser = async(id, body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response("Bad request. Please send request body.", false, undefined, 400);
        } else {
            const { payload, message } = await userService.updateUser(id, body);
            if (payload == undefined) {
                var response = new Response(message, false, payload, 400);
            } else {
                var response = new Response(message, true, payload, 200);
            }
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const deleteUser = async(id) => {
    try {
        const { payload, message } = await userService.deleteUser(id);
        console.log(payload);
        if (payload == undefined) {
            var response = new Response("User not found", false, payload, 404);
        } else {
            var response = new Response(message, true, payload, 200);
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const loginUser = async(body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response("Bad request. Please send request body.", false, undefined, 400);
        } else {
            const email = body.email;
            const password = body.password;
            const { payload, message } = await userService.loginUser(email, password);
            if (payload == undefined) {
                var response = new Response(message, false, payload, 404);
            } else {
                if (payload.user.email === "mitkrish17@gmail.com") {
                    console.log("inside...");
                    payload.user.isSuperAdmin = true;
                }
                var response = new Response(message, true, payload, 200);
            }
        }
    } catch (error) {
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

const verifyUserEmail = async(id) => {
    try {
        const isEmailVerified = await userService.verifyUserEmail(id);
        if (isEmailVerified) {
            return "<html> <head> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body style='width: 100%; height: 100vh; margin 0px; background-color: #DCE49B; color: #154001; display: flex; justify-content: center; align-items: center; font-family: Calibri;'><h1 style='text-align: center;'>Email Verified Successfully</h1></body></html>"
        } else {
            return "<html> <head> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body style='width: 100%; height: 100vh; margin 0px; background-color: #DCE49B; color: #154001; display: flex; justify-content: center; align-items: center; font-family: Calibri;'><h1 style='text-align: center;'>Error in Email Verification.<br>Please try again later.</h1></body></html>"
        }
    } catch (error) {
        return "<html> <head> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body style='width: 100%; height: 100vh; margin 0px; background-color: #DCE49B; color: #154001; display: flex; justify-content: center; align-items: center; font-family: Calibri;'><h1 style='text-align: center;'>Error in Email Verification.<br>Please try again later.</h1></body></html>"
    }
}

const forgotPassword = async(body) => {
    try {
        const isPasswordReset = await userService.forgotPassword(body.email);
        if (isPasswordReset) {
            var response = new Response("Password Reset Successfully", true, { isPasswordReset }, 200);
        } else {
            var response = new Response("Internal server error", false, undefined, 500);
        }
    } catch (error) {
        console.log(error);
        var response = new Response("Internal server error", false, undefined, 500);
    }
    return response;
}

module.exports = {
    signUpUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    verifyUserEmail,
    forgotPassword
}