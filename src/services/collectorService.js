/* Author Parth Thummar */
const collectorDb = require('../database/collectorDB');

const getCollectionRequestByPincode = async() => {
    const { payload, message } = await collectorDb.getCollectionRequestByPincode();
    return { payload, message };
}

const getPickedCollectionRequest = async(userId) => {
    const { payload, message } = await collectorDb.getPickedCollectionRequest(userId);
    return { payload, message };
}

const pickDeposit = async(id,userId) => {
    const { payload, message } = await collectorDb.pickDeposit(id,userId);
    return { payload, message };
}

const updateDepositStatus = async(id) => {
    const { payload, message } = await collectorDb.updateDepositStatus(id);
    return { payload, message };
}

const discardPickedDeposit = async(id) => {
    const { payload, message } = await collectorDb.discardPickedDeposit(id);
    return { payload, message };
}
module.exports = {
    getCollectionRequestByPincode,
    getPickedCollectionRequest,
    pickDeposit,
    updateDepositStatus,
    discardPickedDeposit
}