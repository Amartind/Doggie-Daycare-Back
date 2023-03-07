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
      age: req.body.age,
      breed: req.body.breed,
      personality: req.body.personality,
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