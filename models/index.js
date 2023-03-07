const Owner = require('./Owner');
const Pet = require('./Pet');
const Meetup = require('./Meetup');

Owner.hasMany(Pet, {
    onDelete: "CASCADE"
});
Pet.belongsTo(Owner, {
    onDelete: "CASCADE"
});
Owner.hasMany(Meetup, {
    onDelete: "CASCADE"
});
Meetup.belongsTo(Owner, {
    onDelete: "CASCADE"
});
Pet.hasMany(Meetup, {
    onDelete: "CASCADE"
});
Meetup.belongsTo(Pet, {
    onDelete: "CASCADE"
});

module.exports = {
    Owner,
    Pet,
    Meetup
}