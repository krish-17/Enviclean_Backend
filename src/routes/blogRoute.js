/* Author Srikrishnan Sengottai Kasi */
const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

router.post('/create', async(req, res, next) => {
    let response = await blogController.createBlog(req.body);
    let code = response.code;
    delete response.code;
    res.status(code).send(response);
});

router.get('/get', async(req, res, next) => {
    console.log("getting all blogs");
    let response = await blogController.getAllBlogs(req.params.id);
    let code = response.code;
    delete response.code;
    res.status(code).send(response);
});

router.put('/:id', async(req, res, next) => {
    let response = await blogController.updateDeposit(req.params.id, req.body);
    let code = response.code;
    delete response.code;
    res.status(code).send(response);
});

router.delete('/:id', async(req, res, next) => {
    let response = await blogController.deleteDeposit(req.params.id);
    let code = response.code;
    delete response.code;
    res.status(code).send(response);
});

module.exports = router;