/* Author Sriram Attanti*/
const Depositor = require('../models/depositor');

const createDeposit = async(deposit) => {
    try {
        await Depositor.create(deposit);
        return { payload: deposit, message: "Deposit Created successfully." }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const updateDeposit = async(id, deposit) => {
    try {
        await Depositor.update(deposit, {
            where: {
                id: id
            }   
        });
        return { payload: deposit, message: "Deposit updated successfully." }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const getDepositsByUser = async(id) => {
    try {
        const deposits = await Depositor.findAll(({
            where: {

                UserId: id
            },
            order: [["id", "DESC"]],
            raw: true
        }));
        return { payload: deposits, message: "Deposits found" }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const getDeposit = async(id) => {
    try {
        const deposit = await Depositor.findOne(({
            where: {
                id: id
            },
            raw: true
        }));
        return { payload: deposit, message: "Deposit found" }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}
const deleteDeposit = async(id) => {
    try {
        const { payload: deposit } = await getDeposit (id);
        if (deposit == undefined) {
            return { payload: undefined, message: "Deposit not found" };
        } else {
            await Depositor.destroy({
                where: {
                    id: id
                }
            });
            return { payload: deposit, message: "Deposit deleted successfully." }
        }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

module.exports = {
    createDeposit,
    updateDeposit,
    deleteDeposit,
    getDepositsByUser,
};
