const rewardsDb = require('../database/rewardsDb');

const addRewards = async(rewards) => {
    const { payload, message } = await rewardsDb.addRewards(rewards);
    return { payload, message };
}

const getRewards = async(id) => {
    const { payload, message } = await rewardsDb.getRewards(id);
    return { payload, message };
}

const deleteRewards = async(id) => {
    const { payload, message } = await rewardsDb.deleteRewards(id);
    return { payload, message };
}

module.exports = {
    addRewards,
    getRewards,
    deleteRewards
}