/* Author Vishal Dipak Parmar */
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('enviclean', 'envicleanremote', 'enviclean@dpssv', {
    host: '35.203.22.92',
    port: 3306,
    dialect: 'mysql'
});

module.exports = {
    Sequelize,
    sequelize
};