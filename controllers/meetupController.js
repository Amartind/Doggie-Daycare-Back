const router = require('express').Router();
const Owner = require('../models/Owner');
const Pet = require('../models/Pet');
const Meetup = require('../models/Meetup');

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

router.put('/:id', (req, res) => {
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
});

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