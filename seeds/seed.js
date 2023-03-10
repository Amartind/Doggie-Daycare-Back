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
        gender: 'male',
        age: 2,
        breed: 'Golden Retriever',
        peronality: "traits4",
        spayed_neutered: true,
        vaccinated: true,
        owner_id: 1 // Belongs to John Smith
    },
    {
        name: 'Bella',
        gender: 'female',
        age: 4,
        breed: 'Labrador Retriever',
        personality: 'trait2',
        spayed_neutered: true,
        vaccinated: true,
        owner_id: 2 // Belongs to Jane Doe
    }
];

// Meetups
const meetups = [
    {
        address: 'Central Park',
        // lat: 0.1234,
        // long:0.24567,
        date: '2023-03-15 10:00:00',
        owner_id: 1 // Hosted by John Smith
    },
    {
        address: 'Petco',
        // lat:
        // lon:
        date: '2023-03-20 14:00:00',
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





