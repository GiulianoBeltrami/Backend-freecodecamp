var express = require('express');
var cors = require('cors');
var dateHandler = require('./dateHandler.js');

var app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

let response = {
  unix:"",
  utc:""
}

app.get("/api",(req,res) => {
  const dateNow = Date.now();
  const date = new dateHandler(dateNow);
  const {unix, utc} = date.getUnixAndUTC();
  response.unix = unix;
  response.utc = utc;
  return res.json(response);    
})

app.get("/api/:timestamp", (req,res) => {
  const timestamp = req.params.timestamp;
  const date = new dateHandler(timestamp);

  const { unix, utc } = date.getUnixAndUTC();

  if(unix == 'Invalid Date' || utc == 'Invalid Date'){
    return res.json({"error":"Invalid Date"});
  }

  response.unix = unix;
  response.utc = utc;

  return res.json(response);
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});