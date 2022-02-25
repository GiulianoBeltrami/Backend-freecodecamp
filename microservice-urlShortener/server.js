
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const urlHandler = require('./urlHandler.js');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public',express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({extended:true}));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const shortUrl = [];


app.post('/api/shorturl',function(req,res){

    const { url:original_url } = req.body;

    const url = new urlHandler(original_url);

    let hostname = url.getHostname();

    dns.lookup(hostname, (err) => {
      if( err?.code === "ENOTFOUND") {
        res.json({error : 'invalid url'});
      }
      else{
          shortUrl.push({
            original_url:original_url,
            short_url:shortUrl.length + 1
          });
          const {original_url, short_url} = shortUrl.filter(attribute => attribute.original_url === original_url)[0];
          return res.json({original_url,short_url});
      }
    });

});


app.get('/api/shorturl/:siteId',(req,res) => {
  const siteId = parseInt(req.params.siteId);
  const siteIdExists = shortUrl.some(attribute => attribute.short_url === siteId);
  if(siteIdExists){
    const original_url = shortUrl.filter(attribute => attribute.short_url === siteId)[0].original_url
    res.redirect(original_url);
  }
  else{
    res.json({"error":"No short URL found for the given input"});
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
