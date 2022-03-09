const express = require('express');
const RegistrationController = require('../controllers/RegistrationController');
const router = express.Router();

router.post('/users', RegistrationController.CreateUser);
router.post('/users/:id/exercise',RegistrationController.CreateExercise);

module.exports = router;