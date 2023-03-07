const router = require('express').Router();
const petRoutes = require('./PetRoutes');
// // const ownerRoutes = require('./ownerRoutes');
// // const meetupRoutes= require('./meetupRoutes');


router.use('/pets', petRoutes)






module.exports = router; 