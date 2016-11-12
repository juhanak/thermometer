var sql = require('mssql');
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var jsonParser = bodyParser.json();
var uploadTemperature = require('./uploadTemperature.js');
var uploadTemperatureObj = new uploadTemperature();
var port = process.env.PORT || 1337;
var connectionString = process.env.mssqlconnection;
var errLog = "no error";


sql.connect(connectionString).then(function() {
}).catch(function(err) {
    errLog = err; 
    console.log(err);
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/uploadTemperature', jsonParser, function(sReq, sRes){
  if (!sReq.body) return sRes.sendStatus(400)
  uploadTemperatureObj.execute(sReq, sRes, sql);
  console.log('finished');
});

app.listen(port, function () {
  console.log('Service listening on port' + port);
});

process.on('uncaughtException', function (err) {
  log.log('uncaughtException',err);
  console.log('Caught exception: ' + err);
});