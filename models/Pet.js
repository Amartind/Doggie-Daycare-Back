const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/connection")


class Pet extends Model {}

<<<<<<< HEAD
Pet.init({
    name:{
=======

Pets.init({
    name: {
>>>>>>> c03f143e4baaf52d2199962987c8fdc915929492
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personality: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["traits1", "traits2", "traits3", "traits4", "traits5"]]
        }
    },
}, {
    sequelize
})


module.exports=Pet

