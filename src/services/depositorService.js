/* Author Sriram Attanti */
const depositorDb = require('../database/depositorDB');

const createDeposit = async(deposit) => {
    const { payload, message } = await depositorDb.createDeposit(deposit);
    return { payload, message };
}

const getDepositsByUser = async(id) => {
    const { payload, message } = await depositorDb.getDepositsByUser(id);
    return { payload, message };
}

const updateDeposit = async(id, deposit) => {
    const { payload, message } = await depositorDb.updateDeposit(id, deposit);
    return { payload, message };
}

const deleteDeposit = async(id) => {
    const { payload, message } = await depositorDb.deleteDeposit(id);
    return { payload, message };
}
module.exports = {
    createDeposit,
    getDepositsByUser,
    updateDeposit,
    deleteDeposit
}