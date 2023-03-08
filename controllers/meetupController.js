const router = require('express').Router();
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
router.post("/", (req, res) => {
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
  });

// // Update Meetup PROTECTED
// router.put('/:id', (req, res) => {
//   Meetup.update(
//     {
//       address: req.body.address,
//       lat: req.body.lat,
//       lon: req.body.lon,
//       date: req.body.date,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedMeetup) => {
//       res.json(updatedMeetup);
//     })
//     .catch((err) => res.json(err));
// });

// Delete Meetup PROTECTED
router.delete('/:id', (req, res) => {
    Meetup.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedMeetup) => {
        res.json(deletedMeetup);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;