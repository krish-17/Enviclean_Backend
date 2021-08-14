/* Author Vishal Dipak Parmar */
const jwt = require('jsonwebtoken');
const constants = require('../config/constants.config');

const authenticateUser = async(token) => {
    try {
        await jwt.verify(token, constants.JWT_SECRET);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const decodeToken = async(token) => {
    try {
        var decoded = jwt.verify(token, constants.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

module.exports = {
    authenticateUser,
    decodeToken
}