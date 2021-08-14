// Author : Srikrishnan Sengottai Kasi
let nodemailer = require('nodemailer');
let cron = require('node-cron');

let emailAuthOptions = require('constants.config');

function sendMailNotification(emailObject) {
    // Sample email object that needs to be sent to the module. Attachments not supported
    // let mailOptions = {
    //     from: '<FROM_EMAIL_ADDRESS>',
    //     to: '<TO_EMAIL_ADDRESS>',
    //     subject: 'Email from Node-App: A Test Message!',
    //     text: 'Some content to send'
    // };
    let transporter = nodemailer.createTransport({
        service: 'GMail',
        auth: {
            user: emailAuthOptions.EMAIL.USER,
            pass: emailAuthOptions.EMAIL.PASSWORD
        }
    });
    transporter.sendMail(emailObject, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function sendMailCron(cronFormat, emailObject) {
    cron.schedule(cronFormat, () => {
        sendMailNotification(emailObject);
    });
}

module.exports = [sendMailNotification, sendMailCron]