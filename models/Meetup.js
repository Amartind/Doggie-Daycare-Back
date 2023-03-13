const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/connection")

class Meetup extends Model { }

Meetup.init({
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type:DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placeId: {
        type: DataTypes.STRING,
    },
}, {
    sequelize
})

module.exports = Meetup

