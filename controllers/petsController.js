const router = require('express').Router();
const Pet = require('../models/Pet');

router.get('/', (req, res) => {
  Pet.findAll().then((petData) => {
    res.json(petData);
  });
});

router.get('/:id', (req, res) => {
  Pet.findOne(
    {
      where: { 
        id: req.params.id 
      },
    }
  ).then((petData) => {
    res.json(petData);
  });
});

router.put('/:id', (req, res) => {
  Pet.update(
    {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        personality_traits: req.body.personality_traits,
        spayed_neutered: req.body.spayed_neutered,
        vaccinated: req.body.vaccinated
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPet) => {
      res.json(updatedPet);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    Pet.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedPet) => {
        res.json(deletedPet);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;