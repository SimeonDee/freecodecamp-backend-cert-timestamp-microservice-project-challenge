// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Timestamp API
app.route('/api')
  .get((req, res) => {
    const unix = new Date() / 1  
    const utc = new Date().toUTCString()
    res.json({ unix, utc })
  })

app.get('/api/:date', (req, res) => {
  let unix;
  let utc;
  try{
    if(!req?.params?.date){
      unix = new Date() / 1  
      utc = new Date().toUTCString()
    } else if(req.params.date.includes('-') || req.params.date.includes('/')){
      unix = new Date(req.params.date) / 1  
      utc = new Date(req.params.date).toUTCString()
    } else{
      unix = new Date(Number.parseInt(req.params.date)) / 1  
      utc = new Date(Number.parseInt(req.params.date)).toUTCString()
    }

    if(utc === 'Invalid Date' || unix === 0){
      res.json({ error: 'Invalid Date'})
    } else {
      res.json({ unix, utc })
    }

  } catch(err){
    res.json({ error: 'Invalid Date'})
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
