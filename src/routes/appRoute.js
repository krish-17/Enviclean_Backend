/* Author Vishal Dipak Parmar */
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

/* Signup user */
router.post('/signup', async(req, res, next) => {
    var response = await userController.signUpUser(req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Login user */
router.post('/login', async(req, res, next) => {
    var response = await userController.loginUser(req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Verify user email */
router.get('/verifyemail/:id', async(req, res, next) => {
    var response = await userController.verifyUserEmail(req.params.id);
    res.send(response);
});

/* Forgot password */
router.post('/forgotpassword', async(req, res, next) => {
    var response = await userController.forgotPassword(req.body);
    res.send(response);
});


module.exports = router;