const Owner = require('./Owner');
const Pet = require('./Pet');
const Meetup = require('./Meetup');

Owner.hasMany(Pet, {
    onDelete: "CASCADE"
});
Pet.belongsTo(Owner, {
    onDelete: "CASCADE"
});
Meetup.belongsTo(Owner, {
    onDelete: "CASCADE"
})

module.exports = {
    Owner,
    Pet,
    Meetup
}