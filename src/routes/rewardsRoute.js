/* Author Vishal Dipak Parmar */
const express = require('express');
const router = express.Router();
const rewardsController = require('../controller/rewardsController');

/* Add reward */
router.post('/add', async(req, res, next) => {
    var response = await rewardsController.addRewards(req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Get reward by id */
router.get('/get/:id', async(req, res, next) => {
    var response = await rewardsController.getRewards(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Delete reward */
router.delete('/delete/:id', async(req, res, next) => {
    var response = await rewardsController.deleteRewards(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

module.exports = router;