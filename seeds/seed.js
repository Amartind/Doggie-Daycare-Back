const sequelize = require('../config/connection');
const { Owner, Pet, Meetup } = require('../models');

const owners = [
    {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: "14255555555",
        username: "JohnSmith",
        password: 'password123',
        address: "20 West 34th St., New York, NY 10001",
    },
    {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: "12065555555",
        username: "JaneDoe",
        password: 'password456',
        address: "461 W 47th St, New York, NY 10036",
    }
];

// Pets
const pets = [
    {
        name: 'Max',
        gender: 'Male',
        age: 2,
        breed: 'Golden Retriever',
        personality:["traits1"],
        spayed_neutered: true,
        vaccinated: true,
        OwnerId: 1
        // Belongs to John Smith
    },
    {
        name: 'Bella',
        gender: 'Female',
        age: 4,
        breed: 'Labrador Retriever',
        personality:["traits3"],
        spayed_neutered: true,
        vaccinated: true,
        OwnerId: 2 
        // Belongs to Jane Doe
    }
];

// Meetups
const meetups = [
    {
        name: 'Dog park playdate',
        dateTime: '2023-03-15 10:00:00',
        description: 'Bring your furry friends for a fun morning at the dog park!',
        address: "Central Park, New York, NY 10024",
        OwnerId: 1, // Hosted by John Smith
        PetId: 1
    },
    {
        name: 'Puppy training session',
        dateTime: '2023-03-20 14:00:00',
        description: 'Learn how to train your new puppy with professional trainers.',
        address: "860 Broadway, New York, NY 10003",
        OwnerId: 2, // Hosted by Jane Doe
        PetId: 2
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





