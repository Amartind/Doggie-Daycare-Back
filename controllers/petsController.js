const router = require('express').Router();
const jwt = require('jsonwebtoken');
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

  Pet.findByPk(req.params.id, {
    include: [Owner]
  }).then(data => {
    res.json(data)
  })
});

// Create a pet PROTECTED
router.post("/", (req, res) => {
  // const token = req.headers?.authorization?.split(" ")[1];
  // if (!token) {
  //   return res
  //     .status(403)
  //     .json({ msg: "you must be logged in to create a pet!" });
  // }
  // try {
  //   const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  Pet.create({
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    breed: req.body.breed,
    personality: req.body.personality,
    spayed_neutered: req.body.spayed_neutered,
    vaccinated: req.body.vaccinated
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
  // } catch (err) {
  //   return res.status(403).json({ msg: "invalid token" });
  // }
});

// checks for a valid JWT token 
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied. Token is missing." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Authorization denied. Token is invalid." });
  }
};


// Update pet PROTECTED
router.put('/:id', auth, (req, res) => {
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


// Delete pet PROTECTED
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
