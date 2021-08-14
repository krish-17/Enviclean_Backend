/* Author Sriram Attanti */
const { sequelize } = require("../config/db.config");
const { DataTypes } = require('sequelize');

const Depositor = sequelize.define("depositor", {
    userId:
    {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    taskname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    drywaste:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    wetwaste:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    medicalwaste:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    others:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT(),
        allowNull: false,
    },
    schedule: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    datetime: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    phonenumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    instructions: {
        type: DataTypes.STRING(50),
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    pickedBy:{
        type: DataTypes.STRING(),
        defaultValue: "none",
    }
}, {
    freezeTableName: true,
});


module.exports = Depositor;