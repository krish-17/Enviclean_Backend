/* Author Srikrishnan Sengottai Kasi */
const {sequelize} = require("../config/db.config");
const {DataTypes} = require('sequelize');

const NotificationSettings = sequelize.define("notificationSettings", {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        isRemindBeforePickup: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isRemindBeforeCollect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    }
);

module.exports = NotificationSettings;