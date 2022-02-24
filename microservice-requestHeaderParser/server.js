require('dotenv').config();
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

response = {
  "ipaddress":"",
  "language":"",
  "software":"",
}

app.get("/api/whoami",(req,res) => {
  response.ipaddress = req.ip;
  response.language = req.headers["accept-language"];
  response.software = req.headers["user-agent"];

  res.json(response);
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
