const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/connection");
const { validateAddress } = require('../utilities/google');

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
    sequelize,
    hooks: {
        beforeCreate: async meetupObj => {
            const location = await validateAddress(meetupObj.address);
            meetupObj.placeId = location.placeId;
            return meetupObj;
        },
        beforeBulkCreate: async meetupObj => {
            for (const meetup of meetupObj){
                const location = await validateAddress(meetup.address);
                meetup.placeId = location.placeId;
            }
        }
    }
})

module.exports = Meetup

