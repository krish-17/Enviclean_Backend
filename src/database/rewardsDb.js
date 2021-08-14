const Reward = require('../models/reward');

const addRewards = async(reward) => {
    try {
        await Reward.create(reward);
        return { payload: reward, message: "Reward added successfully." }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const getRewards = async(id) => {
    try {
        const reward = await Reward.findOne(({
            where: {
                id: id
            },
            raw: true
        }));
        return { payload: reward, message: "Reward found." }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const deleteRewards = async(id) => {
    try {
        const { payload: user } = await getRewards(id);
        if (user == undefined) {
            return { payload: undefined, message: "Reward not found" };
        } else {
            await Reward.destroy({
                where: {
                    id: id
                }
            });
            return { payload: user, message: "Reward deleted successfully." }
        }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

module.exports = {
    addRewards,
    getRewards,
    deleteRewards
}