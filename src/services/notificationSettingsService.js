//Author: Srikrishnan Sengottai Kasi
const settingsDB = require('../database/settingsDB');

async function getNotificationSettings(emailId) {
    return await settingsDB.getNotificationSettings(emailId);
}

async function modifyNotificationSettings(emailId, requestBody) {
    if (requestBody) {
        return await settingsDB.modifyNotificationSettings(emailId, requestBody.isRemindBeforePickup,
            requestBody.isRemindBeforeCollect);
    } else {
        return {message: "Invalid Request"}
    }
}

module.exports = { getNotificationSettings, modifyNotificationSettings }