/* Author Vishal Dipak Parmar */
const { sequelize } = require("../config/db.config");
const { DataTypes } = require('sequelize');
const User = require('./user');

const Reward = sequelize.define("reward", {
    coin: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});

Reward.belongsTo(User, { foreignKey: 'userId' });

module.exports = Reward;