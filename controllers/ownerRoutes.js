const router = require('express').Router();
const { Owner, User } = require('../models');


// Find all Owners
router.get('/', (req, res) => {
    Owner.findAll({
        inclued: [User]
    }).then(data => {
        res.json(data)
    })
});

// Find Owner by id
router.get('/:id', (req, res) => {
    Owner.findByPk(req.params.id, {
        include: [User]
    }).then(data => {
        res.json(data)
    })
});

// Update Owner 
router.put('/:id', (req, res) => {
    Owner.update({
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        userName: req.body.userName,
        password: req.body.password
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('Owner has been updated')
    })
});

// Delete Owner
router.delete('/:id', (req, res) => {
    Owner.destroy({
        where: {
            id: req.body.id
        }
    }).then(data => {
        res.json('Owner has been deleted ')
    })
});

module.exports = router;











