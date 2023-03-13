const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/connection")

class Meetup extends Model { }

Meetup.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull:false
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    sequelize
})

module.exports = Meetup

