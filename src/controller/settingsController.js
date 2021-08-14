// Author: Srikrishnan Sengottai Kasi
const Response = require('../models/response');
const NotificationSettingsService = require('../services/notificationSettingsService');
const Constants = require('../config/constants.config')

async function getNotificationSettings(emailId) {
    if (emailId) {
        let getNotificationSettings = await NotificationSettingsService.getNotificationSettings(emailId);
        if (getNotificationSettings.payload) {
            return new Response(getNotificationSettings.message, true, getNotificationSettings.payload, Constants.SC200);
        } else {
            return new Response(getNotificationSettings.message, false, undefined, Constants.SC500);
        }
    } else {
        return new Response("Invalid Request", false, undefined, Constants.SC404);
    }
}

async function modifyNotificationSettings(emailId, body) {
    if (emailId) {
        let modifyNotificationSettings = await NotificationSettingsService.modifyNotificationSettings(emailId, body);
        if (modifyNotificationSettings.payload) {
            return new Response(modifyNotificationSettings.message, true, modifyNotificationSettings.payload,
                Constants.SC200);
        } else {
            return new Response(modifyNotificationSettings.message, false, undefined, Constants.SC500);
        }
    } else {
        return new Response("Invalid Request", false, undefined, Constants.SC404);
    }

}

module.exports = {getNotificationSettings, modifyNotificationSettings}