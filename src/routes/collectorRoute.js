/* Author:Parth Thummar */
const express = require('express');
const collectorRouter = express.Router();
const collectorController = require('../controller/collectorController');

collectorRouter.get('/getalldeposits', async(req, res, next) => {
    var response = await collectorController.getCollectionRequestByPincode();
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

collectorRouter.get('/getpickeddeposits/:userId', async(req, res, next) => {
    var response = await collectorController.getPickedCollectionRequest(req.params.userId);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

collectorRouter.put('/pickdeposits/:id/:userId', async(req, res, next) => {
    var response = await collectorController.pickDeposit(req.params.id,req.params.userId);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

collectorRouter.put('/updatestatus/:id', async(req, res, next) => {
    var response = await collectorController.updateDepositStatus(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

collectorRouter.put('/discarddeposits/:id', async(req, res, next) => {
    var response = await collectorController.discardPickedDeposit(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

module.exports = collectorRouter;