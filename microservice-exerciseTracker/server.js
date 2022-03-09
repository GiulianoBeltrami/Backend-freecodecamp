const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const routes = require('./routes/Api');
require('dotenv').config();

try {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.use(cors());
    app.use(express.static('public'));
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/views/index.html');
    });
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', routes);
    const listener = app.listen(process.env.PORT || 3000, () => {
      console.log('Your app is listening on port ' + listener.address().port)
    })
  });
} catch (error) {
  console.error(error);
}



