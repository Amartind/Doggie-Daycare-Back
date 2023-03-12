const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Owner, Pet } = require("../models");


// Find all Owners
router.get("/", (req, res) => {
  Owner.findAll({
    inclued: [Pet],
  }).then((data) => {
    res.json(data);
  });
});

// Find Owner by id
router.get("/:id", (req, res) => {
  Owner.findByPk(req.params.id, {
    include: [Pet],
  }).then((data) => {
    res.json(data);
  });
});

// signup/create owner
router.post("/", (req, res) => {
  Owner.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
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
router.post("/login", cors(), (req, res) => {
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
router.put("/:id", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" });
  }
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  Owner.findByPk(req.params.id).then((foundowner) => {
    if (!foundowner) {
      return res.status(404).json({ msg: "No such owner exists" });
    }
    if (foundowner.id !== tokenData.id) {
      return res.status(403).json({ msg: "Unauthorized access" });
    }
    Owner.update(
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((data) => {
        res.json({ msg: "Owner has been updated", data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Error editting owner",
          err,
        });
      });
  });
});

// Delete Owner PROTECTED
router.delete("/:id", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "You must be logged in" });
  }
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  Owner.findByPk(req.params.id).then((foundowner) => {
    if (!foundowner) {
      return res.status(404).json({ msg: "No such owner exists" });
    }
    if (foundowner.id !== tokenData.id) {
      return res.status(403).json({ msg: "Unauthorized access" });
    }
    Owner.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        res.json({ msg: "Owner has been deleted", data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Error editting owner",
          err,
        });
      });
  });
});

module.exports = router;
