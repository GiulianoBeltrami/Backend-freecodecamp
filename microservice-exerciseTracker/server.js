const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const registrationController = require('./controllers/RegistrationController');
require('dotenv').config()

try {
  mongoose.connect(process.env.MONGODB_URI);
  app.use(cors());
  app.use(express.static('public'));
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', registrationController);
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
} catch (error) {
  console.error(error);
}



