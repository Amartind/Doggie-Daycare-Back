const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/connection")

class Pet extends Model {}

Pets.init({
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull:false
    }, 
    breed:{
        type: DataTypes.STRING,
        allowNull:false
    },
    personality:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn:[["traits1","traits2","traits3","traits4","traits5"]]
        }
    },
},{
    sequelize
})

module.exports=Pet