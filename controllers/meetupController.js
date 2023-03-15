const router = require('express').Router();
const jwt = require("jsonwebtoken");
const Owner = require('../models/Owner');
const Pet = require('../models/Pet');
const Meetup = require('../models/Meetup');
const { getDistance } = require('../utilities/google');


// Find all Meetups.
// PROTECTED
router.get('/', (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "User is not logged in." })
  }
  try {
    Meetup.findAll({
      include: [
        { model: Pet },
        { model: Owner }
      ]
    }).then((meetupData) => {
      res.json(meetupData);
    });
  } catch (error) {
    res.status(403).json({ msg: 'Unauthorized access' });
  }
});


// Find Meetup by id.
// PROTECTED
router.get('/:id', (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "User is not logged in." })
  }
  try {
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
  } catch (error) {
    res.status(403).json({ msg: 'Unauthorized access' });
  }
});


// Find meetups within a certain radius of the user. 
// PROTECTED.
router.get('/search/:radius', (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "User is not logged in." })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    let ownerLocation;
    let calculatedResult = []
    Owner.findOne({
      where: {
        id: tokenData.id
      }
    }).then((ownerData) => {
      ownerLocation = ownerData.placeId;
    })
    Meetup.findAll({
      include: [
        { model: Pet },
        { model: Owner }
      ]
    }).then(async (meetUpData) => {
      for (const meetup of meetUpData) {
        meetupLocation = meetup.dataValues.placeId
        meetup.dataValues.distance = await getDistance(ownerLocation, meetupLocation)
        if (meetup.dataValues.distance <= parseFloat(req.params.radius)) {
          calculatedResult.push(meetup);
        }
      }
      res.json(calculatedResult);
    });
  } catch (error) {
    res.status(403).json({ msg: 'Unauthorized access' });
  }
});


// create a meetup.
// PROTECTED
router.post("/", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" })
  }
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  try {
    Meetup.create({
      name: req.body.name,
      dateTime: req.body.dateTime,
      description: req.body.description,
      address: req.body.address,
      OwnerId: tokenData.id,
    })
      .then((newMeetup) => {
        return res.json(newMeetup);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          msg: "Error creating new Meetup",
          err,
        });
      });
  } catch (error) {
    return res.status(403).json({ msg: 'Unauthorized access' });
  }
});


// Update Meetup.
// PROTECTED
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
          name: req.body.name,
          dateTime: req.body.dateTime,
          description: req.body.description,
          address: req.body.address,
        },
        {
          where: {
            id: req.params.id,
            OwnerId: tokenData.id
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


// Delete Meetup. 
// PROTECTED
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
          OwnerId: tokenData.id
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
