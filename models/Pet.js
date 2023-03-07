const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/connection")


class Pet extends Model {}

Pet.init({
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gender:{
        type: DataTypes.STRING,
        validate: {
            isIn: [["Male", "Female"]]
        }
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
    spayed_neutered:{
        type: DataTypes.BOOLEAN
    },
    vaccinated:{
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize
})


module.exports=Pet

