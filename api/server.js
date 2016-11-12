var sql = require('mssql');
var http = require('http')
var port = process.env.PORT || 1337;
var connectionString = process.env.mssqlconnection;
var errLog = "no error";

sql.connect(connectionString).then(function() {
}).catch(function(err) {
    errLog = err; 
});

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

    new sql.Request().query('select * from device').then(function(recordset) {
        //console.dir(recordset);
        res.end('request fine\n');
    }).catch(function(err) {
        res.end('request failed\n' + err + errLog);
    });
 
}).listen(port);