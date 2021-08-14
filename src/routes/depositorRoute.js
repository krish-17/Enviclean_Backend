/* Author Sriram Attanti */
const express = require('express');
const router = express.Router();
const depositorController = require('../controller/depositorController');

router.post('/createdeposit', async(req, res, next) => {
    var response = await depositorController.createDeposit(req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

router.get('/getdeposits/:id', async(req, res, next) => {
    var response = await depositorController.getDepositsByUser(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

router.put('/updatedeposit/:id', async(req, res, next) => {
    var response = await depositorController.updateDeposit(req.params.id, req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

router.delete('/deletedeposit/:id', async(req, res, next) => {
    var response = await depositorController.deleteDeposit(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

module.exports = router;