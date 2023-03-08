const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Owner, Pet } = require('../models');


// Find all Owners
router.get('/', (req, res) => {
    Owner.findAll({
        inclued: [Pet]
    }).then(data => {
        res.json(data)
    })
});

// Find Owner by id
router.get('/:id', (req, res) => {
    Owner.findByPk(req.params.id, {
        include: [Pet]
    }).then(data => {
        res.json(data)
    })
});

// signup/create owner
router.post("/", (req, res) => {
    Owner.create({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      username: req.body.username,
      password: req.body.password,
    })
      .then((newOwner) => {
        const token = jwt.sign(
          {
            username: newOwner.username,
            id: newOwner.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "6h",
          }
        );
        res.json({
          token,
          user: newOwner,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "There has been a problem creating this owner", err });
      });
  });

  // login
router.post("/login", (req, res) => {
    Owner.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((foundOwner) => {
        if (!foundOwner) {
          return res.status(401).json({ msg: "invalid login credentials" });
        }
        //is password wrong
        if (!bcrypt.compareSync(req.body.password, foundOwner.password)) {
          return res.status(401).json({ msg: "invalid password credentials" });
        }
        const token = jwt.sign(
          {
            username: foundOwner.username,
            id: foundOwner.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "6h",
          }
        );
        res.json({
          token,
          user: foundOwner,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "There was a problem logging in", err });
      });
  });

// Update Owner PROTECTED
router.put('/:id', (req, res) => {
    Owner.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('Owner has been updated')
    })
});

// Delete Owner PROTECTED
// router.delete('/:id', (req, res) => {
//     Owner.findByPk(req.params.id)
//     .then((id) =>{
//     if (!id) {
//         return res.status(404).json({ msg: "No such owner exists" })
//     }});
//     Owner.destroy({
//         where: {
//             id: req.body.id
//         },
//     }).then(data => {
//         res.json('Owner has been deleted')
//     })
//     // .catch((err) => {
//     //     console.log(err);
//     //     res.status(500).json({
//     //       msg: "This didn't work",
//     //       err,
//     //     });
// });

module.exports = router;











