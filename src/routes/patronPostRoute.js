/* Author Dhrumil Amish Shah */
const express = require('express');
const patronPostController = require('../controller/patronPostController');
const imageUploadUtil = require('../utils/imageUploadUtil');
const patronRoutes = express.Router();

patronRoutes.put('/member/:userId', async (req, res, next) => {
    var response = await patronPostController.makePatronMember(req.params.userId);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

patronRoutes.get('/posts', async (req, res, next) => {
    var response = await patronPostController.getPatronPosts();
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

patronRoutes.post('/post', imageUploadUtil.single('garbageImage'), async (req, res, next) => {
    var response = await patronPostController.createPatronPost(req.file, req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

patronRoutes.delete('/post/:userId/:patronPostId', async (req, res, next) => {
    var response = await patronPostController.deletePatronPost(req.params.userId, req.params.patronPostId);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

patronRoutes.put('/post/:patronPostId', async (req, res, next) => {
    var response = await patronPostController.fullFillPatronPost(req.params.patronPostId);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

module.exports = patronRoutes;