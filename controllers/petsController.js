const router = require('express').Router();
const { Pet, Owner } = require('../models');

// Get all 
router.get('/', (req, res) => {

    Pet.findAll({
        include: [Owner]
    }).then(data => {
        res.json(data)
    })
});

// Find pet by id
router.get('/:id', (req, res) => {
    if(session.Owner.id==Pet.Owner.id){

        Pet.findByPk(req.params.id, {
            include: [Owner]
        }).then(data => {
            res.json(data)
        })
    } else return res.status(401).html("No Access")
});

//Update pet 
router.put('/:id', (req, res) => {

    Pet.update({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        breed: req.body.breed,
        personality: req.body.personality,
        spayed_neutered: req.body.spayed_neutered,
        vaccinated: req.body.vaccinated
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('Pet has been updated ')
    })
});

// Delet pet
router.delete('/:id', (req, res) => {
    Pet.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('Pet has been deleted')
    })
});

module.exports = router;
