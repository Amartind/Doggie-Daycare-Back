const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { validateAddress } = require('../utilities/google');
const { response } = require('express');



class Owner extends Model { }

Owner.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:
    {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    },
    placeId: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    hooks: {
        beforeCreate: async userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 4);
            const location = await validateAddress(userObj.address);
            userObj.placeId = location.placeId;
            return userObj;
        },
        beforeBulkCreate: async userObjs => {
            for (const user of userObjs){
                user.password = bcrypt.hashSync(user.password, 4);
                const location = await validateAddress(user.address);
                user.placeId = location.placeId;
            }
        }
    }});

module.exports = Owner