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
Pet.belongsToMany(Meetup, {
    through:"PetMeetups",
    onDelete: "CASCADE"
});
Meetup.belongsToMany(Pet, {
    through:"PetMeetups",
    onDelete: "CASCADE"
});

module.exports = {
    Owner,
    Pet,
    Meetup
}