const router = require('express').Router();
const jwt = require("jsonwebtoken");
const Owner = require('../models/Owner');
const Pet = require('../models/Pet');
const Meetup = require('../models/Meetup');

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

// create a meetup PROTECTED
router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, 'mysecretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
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
    }
  });
});

// Update Meetup PROTECTED
router.put('/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, 'mysecretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
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
    }
  });
});


// Delete Meetup PROTECTED
router.delete('/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, 'mysecretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Meetup.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((deletedMeetup) => {
          res.json(deletedMeetup);
        })
        .catch((err) => res.json(err));
    }
  });
});

module.exports = router;