const User = require('./User');
const Pet = require('./Pet');
const Meetup = require('./Meetup');

User.hasMany(Pet, {
    onDelete: "CASCADE"
});
Pet.belongsTo(User, {
    onDelete: "CASCADE"
});
User.hasMany(Meetup, {
    onDelete: "CASCADE"
});
Meetup.belongsTo(User, {
    onDelete: "CASCADE"
});
Pet.hasMany(Meetup, {
    onDelete: "CASCADE"
});
Meetup.belongsTo(Pet, {
    onDelete: "CASCADE"
});

module.exports = {
    User,
    Pet,
    Meetup
}