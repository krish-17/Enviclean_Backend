/* Author Vishal Dipak Parmar */
const { sequelize } = require("../config/db.config");
const { DataTypes } = require('sequelize');

const User = sequelize.define("user", {
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    firstName: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            is: /^[a-z0-9]{2,25}$/i,
            min: 2,
            max: 25
        }
    },
    lastName: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            is: /^[a-z0-9]{2,25}$/i,
            min: 2,
            max: 25
        }
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    province: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: ["Male", "Female", "Other", "Rather not say"]

        }
    },
    type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Depositor",
        validator: {
            isIn: ['Depositor', 'Collector']

        }
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    confirmPassword: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isMatchPassword(value) {
                if (value != this.password) {
                    throw new Error('Password and Confirm Password mismatch');
                }
            }
        }
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isPatron: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});

User.beforeCreate(async(user, options) => {
    let buff = new Buffer(user.password);
    let base64data = buff.toString('base64');
    user.password = base64data;
    user.confirmPassword = base64data;
});

module.exports = User;