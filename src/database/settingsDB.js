//Author : Srikrishnan Sengottai Kasi
const NotificationSettings = require('../models/notificationSettings');

async function getNotificationSettings(emailId) {
    try {
        const notificationSettings = await NotificationSettings.findOne({
            where: {
                email: emailId
            },
            raw: true
        });
        return {payload: notificationSettings, message: "Notification settings found"}
    } catch (error) {
        console.log(error);
        return {payload: undefined, message: error.message};
    }
}

async function modifyNotificationSettings(emailId, isRemindBeforePickup, isRemindBeforeCollect) {
    try {
        let count = await NotificationSettings.count({where: {email: emailId}});
        let notificationSettings = {};
        notificationSettings.isRemindBeforePickup = isRemindBeforePickup ? isRemindBeforePickup : false;
        notificationSettings.isRemindBeforeCollect = isRemindBeforeCollect ? isRemindBeforeCollect : false;
        if (count > 0) {
            await NotificationSettings.update(notificationSettings, {
                where: {
                    email: emailId
                }
            });
        } else {
            notificationSettings.email = emailId;
            await NotificationSettings.create(notificationSettings);
        }
        return { payload: {email : emailId}, message: "Notification preferences saved successfully." };
    } catch (error) {
        console.log(error);
        return { message: error.message };
    }
}

module.exports = { getNotificationSettings, modifyNotificationSettings };