const express = require('express');
const router = express.Router();

const ownersRoutes = require("./ownersController")
router.use("/api/owners",ownersRoutes)

const meetupRoutes = require("./meetupController")
router.use("/api/meetups",meetupRoutes)

const petsRoutes = require("./petsController")
router.use("/api/pets",petsRoutes)


module.exports = router;