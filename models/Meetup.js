const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/connection")

class Meetup extends Model { }

Meetup.init({
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placeId: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize
})

module.exports = Meetup

