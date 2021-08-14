/* Author Srikrishnan Sengottai Kasi */
const {Sequelize} = require("../config/db.config");
const { sequelize } = require('../config/db.config');
const { DataTypes } = require('sequelize');

const BlogPost = sequelize.define('blogpost', {
    blogId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    blogImageUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    blogTitle: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    blogCaption: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    blogSummary: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    blogDetailURL: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    blogCreatedTime: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
});

module.exports = BlogPost;