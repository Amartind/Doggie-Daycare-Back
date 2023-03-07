const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Owner extends Model {}

Owner.init({
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    }, 
    emailAddress:
    {
        type:DataTypes.STRING,
        validate: {
            isEmail: true,
        },
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull: false,
        is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    },
    userName:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,

    },
},{
    sequelize,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 4);
            return userObj;
        }
    }
});

module.exports= Owner