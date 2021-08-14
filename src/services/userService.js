/* Author Vishal Dipak Parmar */
const jwt = require('jsonwebtoken');
const constants = require('../config/constants.config');
const emailService = require('../services/emailService');
const userDb = require('../database/userDb');

const signUpUser = async(userparams) => {
    const { payload: user, message } = await userDb.signUpUser(userparams);
    if (user != undefined) {
        let fromEmail = constants.EMAIL.USER;
        let toEmail = userparams.email;
        let subject = "Welcome to EnviClean " + userparams.firstName + " " + userparams.lastName;
        let html = "<html> <head> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body style='width: 100%; height: 100vh; margin 0px;'> <table style='margin: 20px;width: calc(100% - 40px);background-color: #DCE49B;color: #154001;text-align: center;font-family: Calibri;border-radius: 10px;'> <tbody> <tr> <td style=' font-size: 32px; font-weight: bold; color: #154001; padding: 10px; '> Welcome to EnviClean</td> </tr> <tr> <td style=' font-size: 28px; font-weight: bold; color: #154001; padding: 20px; '>" + userparams.firstName + " " + userparams.lastName + "</td> </tr> <tr> <td style=' font-size: 24px;'> <p style=' padding: 5px; '>Doorstep pickup</p> <p style=' padding: 5px; '>On-time pickup</p> <p style=' padding: 5px; '>Email reminders</p> <p style=' padding: 5px; '>Free CleanCoins</p> </td> </tr> <tr> <td style=' padding: 30px; '><a href='" + constants.HOST_URL + "app/verifyemail/" + user.id + "' style=' background-color: #154001; color: #D1D1D1; padding: 10px 15px; font-size: 18px; border-radius: 25px; '>Verify Email</a></td> </tr> </tbody> </table> </body> </html>";
        await emailService.sendEmail(fromEmail, toEmail, subject, html);
    }
    delete user.password;
    delete user.confirmPassword;
    let token = jwt.sign({ id: user.id }, constants.JWT_SECRET);
    let payload = {
        token,
        user
    }
    return { payload, message };
}

const getUser = async(id) => {
    const { payload, message } = await userDb.getUser(id);
    return { payload, message };
}

const updateUser = async(id, user) => {
    if (user.password != undefined) {
        let buff = new Buffer(user.password);
        let base64data = buff.toString('base64');
        user.password = base64data;
        user.confirmPassword = base64data;
    }
    const { payload, message } = await userDb.updateUser(id, user);
    return { payload, message };
}

const deleteUser = async(id) => {
    const { payload, message } = await userDb.deleteUser(id);
    return { payload, message };
}

const loginUser = async(email, password) => {
    let buff = new Buffer(password);
    let base64data = buff.toString('base64');
    const { payload: user } = await userDb.getUserByEmail(email);
    let payload;
    let message;
    if (user != undefined) {
        if (user.password == base64data) {
            delete user.password;
            delete user.confirmPassword;
            let token = jwt.sign({ id: user.id }, constants.JWT_SECRET);
            payload = {
                token: token,
                user: user
            };
            message = "User logged in";
        } else {
            payload = undefined;
            message = "Invalid Credentials";
        }
    } else {
        payload = undefined;
        message = "User not found";
    }
    return { payload, message };
}

const verifyUserEmail = async(id) => {
    let { payload: user } = await userDb.getUser(id);
    try {
        user.isEmailVerified = true;
        delete user.password;
        delete user.confirmPassword;
        await userDb.updateUser(id, user);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const forgotPassword = async(email) => {
    let { payload: user } = await userDb.getUserByEmail(email);
    try {
        if (user != undefined) {
            let newPassword = user.firstName + "@" + Math.floor((Math.random() * 10000) + 1);;
            let buff = new Buffer(newPassword);
            let base64data = buff.toString('base64');
            user.password = base64data;
            user.confirmPassword = base64data;
            await userDb.updateUser(user.id, user);
            let fromEmail = constants.EMAIL.USER;
            let toEmail = user.email;
            let subject = "EnviClean Passsword Reset";
            let html = "<html> <head> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body style='width: 100%; height: 100vh;    margin: 0px;'> <p style='margin: 20px;width: calc(100% - 100px);background-color: #DCE49B;color: #154001;text-align: center;font-family: Calibri;border-radius: 10px; padding: 30px; font-size: 20px;'> Your new password is <br> <span style='font-weight:bold;'> " + newPassword + "</span> </p> </body> </html>";
            await emailService.sendEmail(fromEmail, toEmail, subject, html);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
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