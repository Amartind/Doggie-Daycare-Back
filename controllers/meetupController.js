const router = require('express').Router();
const jwt = require("jsonwebtoken");
const Owner = require('../models/Owner');
const Pet = require('../models/Pet');
const Meetup = require('../models/Meetup');
const { getDistance } = require('../utilities/google');


// Find all Meetups
router.get('/', (req, res) => {
  Meetup.findAll({
    include: [
      { model: Pet },
      { model: Owner }
    ]
  }).then((meetupData) => {
    res.json(meetupData);
  });
});

// Find Meetup by id
router.get('/:id', (req, res) => {
  Meetup.findOne({
    where: {
      id: req.params.id
    },
    include: [
      { model: Pet },
      { model: Owner }
    ]
  }).then((meetupData) => {
    res.json(meetupData);
  });
});

// Find meetups within a certain radius of the user.
router.get('/:userName/:radius', (req, res) => {
  let ownerLocation;
  let calculatedResult = []
  Owner.findOne({
    where: {
      username: req.params.userName
    }}).then((ownerData) => {
      ownerLocation = ownerData.placeId;
    })
  Meetup.findAll({
    include: [
      { model: Pet },
      { model: Owner }
    ]
  }).then(async (meetUpData) => {
    for (const meetup of meetUpData){
      meetupLocation = meetup.dataValues.placeId
      meetup.dataValues.distance = await getDistance(ownerLocation, meetupLocation)
      if (meetup.dataValues.distance <= parseFloat(req.params.radius)){
        calculatedResult.push(meetup);
      }
    }
    res.json(calculatedResult);
  });
});

// create a meetup PROTECTED
router.post("/", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    Meetup.create({
      address: req.body.address,
      lat: req.body.lat,
      lon: req.body.lon,
      date: req.body.date,
    })
      .then((newMeetup) => {
        res.json(newMeetup);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Error creating new Meetup",
          err,
        });
      });
  } catch (error) {
    res.status(403).json({ msg: 'Unauthorized access' });
  }
});

// Update Meetup PROTECTED
router.put('/:id', (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    Meetup.findByPk(req.params.id).then(foundMeetup => {
      if (!foundMeetup) {
        return res.status(404).json({ msg: "No such meetup" })
      }
      if (foundMeetup.OwnerId !== tokenData.id) {
        return res.status(403).json({ msg: 'Unauthorized access' })
      }
      Meetup.update(
        {
          address: req.body.address,
          lat: req.body.lat,
          lon: req.body.lon,
          date: req.body.date,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((updatedMeetup) => {
          res.json(updatedMeetup);
        })
        .catch((err) => res.json(err));
    })
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" })
  }
});



// Delete Meetup PROTECTED
router.delete('/:id', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    Meetup.findByPk(req.params.id).then(foundMeetup => {
      if (!foundMeetup) {
        return res.status(404).json({ msg: "Meetup not found" })
      }
      if (foundMeetup.UserId !== tokenData.id) {
        return res.status(403).json({ msg: 'Unauthorized access' })
      }
      Meetup.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((deletedMeetup) => {
          res.json(deletedMeetup);
        })
        .catch((err) => res.json(err));
    })
  } catch (error) {
    return res.status(403).json({ msg: 'Unauthorized access' })
  }
});

module.exports = router;
