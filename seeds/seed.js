const sequelize = require('../config/connection');
const { Owner, Pet, Meetup } = require('../models');

const owners = [
    {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: "123456789",
        username: "JohnSmith",
        password: 'password123',
        address: "20 West 34th St., New York, NY 10001",
        placeId: "ChIJr92XCKlZwokRIy2j_7Rb2V8",
    },
    {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: "123456789",
        username: "JaneDoe",
        password: 'password456',
        address: "461 W 47th St, New York, NY 10036",
        placeId: "ChIJMyaNolFYwokRBVksM1l4aWM",
    }
];

// Pets
const pets = [
    {
        name: 'Max',
        breed: 'Golden Retriever',
        age: 2,
        gender: "Male",
        spayed_neutered: true,
        vaccinated: true,
        traits: "traits1",
        owner_id: 1 // Belongs to John Smith
    },
    {
        name: 'Bella',
        breed: 'Labrador Retriever',
        age: 4,
        gender: "Female",
        spayed_neutered: true,
        vaccinated: true,
        traits: "traits2",
        owner_id: 2 // Belongs to Jane Doe
    }
];

// Meetups
const meetups = [
    {
        name: 'Dog park playdate',
        location: 'Central Park',
        dateTime: '2023-03-15 10:00:00',
        description: 'Bring your furry friends for a fun morning at the dog park!',
        address: "Central Park, New York, NY 10024",
        placeId: "ChIJHa5fkWJYwokR_psiHLKKLQg",
        owner_id: 1 // Hosted by John Smith
    },
    {
        name: 'Puppy training session',
        location: 'Petco',
        datetime: '2023-03-20 14:00:00',
        description: 'Learn how to train your new puppy with professional trainers.',
        address: "860 Broadway, New York, NY 10003",
        placeId: "ChIJNe8lF6JZwokRu1tZE7qbWIY",
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





