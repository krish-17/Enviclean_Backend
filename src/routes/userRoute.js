/* Author Vishal Dipak Parmar */
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

/* Get user by id */
router.get('/get/:id', async(req, res, next) => {
    var response = await userController.getUser(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Update user */
router.put('/update/:id', async(req, res, next) => {
    var response = await userController.updateUser(req.params.id, req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Delete user */
router.delete('/delete/:id', async(req, res, next) => {
    var response = await userController.deleteUser(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

module.exports = router;