/* Author Dhrumil Amish Shah */
const { sequelize } = require('../config/db.config');
const { DataTypes } = require('sequelize');
const User = require('./user');

const PatronPost = sequelize.define('patronpost', {
    patronPostId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    streetAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    city: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    province: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    zipCode: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageId: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'FULLFILLED']),
        allowNull: false,
        defaultValue: 'ACTIVE',
    },
    createdAt: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
});

PatronPost.belongsTo(User, { foreignKey: 'userId' });

module.exports = PatronPost;