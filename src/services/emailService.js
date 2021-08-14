/* Author Vishal Dipak Parmar */
const nodemailer = require('nodemailer');
const constants = require('../config/constants.config');

const sendEmail = async(fromEmail, toEmail, subject, html) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: constants.EMAIL.USER,
                pass: constants.EMAIL.PASSWORD
            }
        });
        let mailOptions = {
            from: fromEmail,
            to: toEmail,
            subject: subject,
            html: html
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    sendEmail
}