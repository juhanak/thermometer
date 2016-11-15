var appInsights = require("applicationinsights");
var sql = require('mssql');
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var UploadTemperature = require('./routes/uploadTemperature.js');
var GetTemperatures = require('./routes/getTemperatures.js');
var GetDevices = require('./routes/getDevices.js');

var jsonParser = bodyParser.json();
var uploadTemperatureObj = new UploadTemperature();
var getTemperaturesObj = new GetTemperatures();
var getDevicesObj = new GetDevices();

var port = process.env.PORT || 1337;
var connectionString = process.env.mssqlconnection;

var instrumentationKey = process.env.instrumentation_key || null;

if(instrumentationKey) {
  appInsights.setup(instrumentationKey)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .start();
}

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

app.post('/api/uploadTemperature', jsonParser, function(sReq, sRes){
  if (!sReq.body) return sRes.sendStatus(400)
  uploadTemperatureObj.execute(sReq, sRes, sql);
  console.log('uploadTemperature finished');
});

app.get('/api/getTemperatures', function(sReq, sRes){
  getTemperaturesObj.execute(sReq,sRes,sql);
  console.log('getTemperatures finished');
});

app.get('/api/getDevices', function(sReq, sRes){
  getDevicesObj.execute(sReq,sRes,sql);
  console.log('getDevicesObj finished');
});

app.get('/api/getStatus', function(sReq, sRes){
  sRes.send('Status OK');
});

app.listen(port, function () {
  console.log('Service listening on port' + port);
});

process.on('uncaughtException', function (err) {
  log.log('uncaughtException',err);
  console.log('Caught exception: ' + err);
});