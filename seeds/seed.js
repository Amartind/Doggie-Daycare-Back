const sequelize = require('../config/connection');
const { Owner, Pet, Meetup } = require('../models');

const owners = [
    {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: "123456789",
        username: "JohnSmith",
        password: 'password123'
    },
    {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: "123456789",
        username: "JaneDoe",
        password: 'password456'
    }
];

// Pets
const pets = [
    {
        name: 'Max',
        gender: 'Male',
        age: 2,
        breed: 'Golden Retriever',
        personality:["traits1", "trait2"],
        spayed_neutered: true,
        vaccinated: true,
        Ownerid: 1
        // Belongs to John Smith
    },
    {
        name: 'Bella',
        gender: 'Female',
        age: 4,
        breed: 'Labrador Retriever',
        personality:["traits3", "trait4"],
        spayed_neutered: true,
        vaccinated: true,
        Ownerid: 2 
        // Belongs to Jane Doe
    }
];

// Meetups
const meetups = [
    {
        name: 'Dog park playdate',
        location: 'Central Park',
        datetime: '2023-03-15 10:00:00',
        description: 'Bring your furry friends for a fun morning at the dog park!',
        owner_id: 1 // Hosted by John Smith
    },
    {
        name: 'Puppy training session',
        location: 'Petco',
        datetime: '2023-03-20 14:00:00',
        description: 'Learn how to train your new puppy with professional trainers.',
        owner_id: 2 // Hosted by Jane Doe
    }
];

// Use Sequelize to insert the data into the database
sequelize.sync({ force: true }).then(() => {
    Owner.bulkCreate(owners).then(() => {
        Pet.bulkCreate(pets).then(() => {
            Meetup.bulkCreate(meetups).then(() => {
                console.log('Seed data inserted successfully!');
                process.exit(0);
            });
        });
    });
}).catch((error) => {
    console.log(`Error inserting seed data: ${error}`);
    process.exit(1);
});





