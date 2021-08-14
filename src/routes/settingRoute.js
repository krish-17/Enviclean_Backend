//Author : Srikrishnan Sengottai Kasi
const express = require('express');
const router = express.Router();
const NotificationSettingsController = require("../controller/settingsController");

// get Notification settings based on emailId
router.get('/notifications/:id', async(req, res, next) => {
    let response = await NotificationSettingsController.getNotificationSettings(req.params.id);
    let code = response.code;
    delete response.code;
    res.status(code).send(response);
});


/* Update Notification preference for the user */
router.put('/notifications/:id', async(req,
                                               res, next) => {
    let response = await NotificationSettingsController.modifyNotificationSettings(req.params.id, req.body);
    let code = response.code;
    delete response.code;
    res.status(code).send(response);
});

module.exports = router;