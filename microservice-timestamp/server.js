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
  var dateNow = Date.now();
  var date = new dateHandler(dateNow);
  response.unix = new Date(parseInt(dateNow)).getTime();
  response.utc = date.convertUnixToDate();
  res.json(response);    
  
})

app.get("/api/:timestamp", (req,res) => {
  var timestamp = req.params.timestamp;
  var date = new dateHandler(timestamp);
  
  if(date.isValidUnix()){
    response.unix = new Date(parseInt(timestamp)).getTime();
    response.utc = date.convertUnixToDate();
    res.json(response);
  }
  else if(date.isValidDate()){
    response.unix = Date.parse(timestamp);
    response.utc = date.convertDateToUtc();
    res.json(response);
  }
  else{
    res.json({"error":"Invalid Date"});
  }

})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
