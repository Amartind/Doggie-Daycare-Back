const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Pet, Owner } = require('../models');
const jwt = require('jsonwebtoken')

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


  Pet.findByPk(req.params.id, {
    include: [Owner]
  }).then(data => {
    res.json(data)
  })
}
);

// Create a pet PROTECTED
router.post("/", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    Pet.create({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      breed: req.body.breed,
      personality: req.body.personality,
      spayed_neutered: req.body.spayed_neutered,
      vaccinated: req.body.vaccinated,
      UserId: tokenData.id
    })
      .then((newPet) => {
        res.json(newPet);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Error creating new pet",
          err,
        });
      });
    res.json(tokenData)
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" })
  }
});

// Update pet PROTECTED
router.put('/:id', (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    Pet.findByPk(req.params.id).then(foundPet => {
      if (!foundPet) {
        return res.status(404).json({ msg: "No such pet" })
      }
      if (foundPet.UserId !== tokenData.id) {
        return res.status(403).json({ msg: "Unauthorized access" })
      }
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
        res.json({ msg: 'Pet has been edited', data })
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Error editting pet",
          err,
        });
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Couldn't find the pet", err })
    })

    res.json(tokenData)
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" })
  }

});

// Delete pet PROTECTED
router.delete('/:id', (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    Pet.findByPk(req.params.id).then(foundPet => {
      if (!foundPet) {
        return res.status(404).json({ msg: "No such pet" })
      }
      if (foundPet.UserId !== tokenData.id) {
        return res.status(403).json({ msg: "Unauthorized access" })
      }
      Pet.destroy({
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.json({ msg: 'Pet has been deleted', data })
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Error deleting pet",
          err,
        });
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Couldn't find the pet", err })
    })

    res.json(tokenData)
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" })
  }


});

module.exports = router;
