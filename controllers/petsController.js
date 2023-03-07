const router = require('express').Router();
const { Pet, User } = require('../models');

router.post('/', (req, res) => {
    Pet.create(req.body)
        .then((createPet) => {
            res.status(200).json(createPet)
        })
})

// Find all pets 
router.get('/', (req, res) => {

    Pet.findAll({
        include: [User]
    }).then((petData) => {
        res.json(petData)
    })
});

// Find pet by id
router.get('/:id', (req, res) => {

    Pet.findByPk(req.params.id, {
        include: [User]
    }).then((petData) => {
        res.json(petData)
    })
});

//Update pet 
router.put('/:id', (req, res) => {

    Pet.update({
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        personality: req.body.personality
    }, {
        where: {
            id: req.params.id
        }
    }).then((updatedPet) => {
        res.json(updatedPet)
    })
        .catch((err) => res.json(err));
});

// Delete pet
router.delete('/:id', (req, res) => {
    Pet.destroy({
        where: {
            id: req.params.id
        }
    }).then((deletedPet) => {
        res.json(deletedPet)
    })
        .catch((err) => res.json(err));
});

module.exports = router;
