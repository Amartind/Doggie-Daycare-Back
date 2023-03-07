const router = require('express').Router();
const { Pet, User } = require('../models');

router.post('/', (req, res) => {
    Pet.create(req.body)
        .then(data => {
            res.status(200).json(data)
        })
})

// Find all pets 
router.get('/', (req, res) => {

    Pet.findAll({
        include: [User]
    }).then(data => {
        res.json(data)
    })
});

// Find pet by id
router.get('/:id', (req, res) => {

    Pet.findByPk(req.params.id, {
        include: [User]
    }).then(data => {
        res.json(data)
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
    }).then(data => {
        res.json('Pet has been updated ')
    })
});

// Delete pet
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
