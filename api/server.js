var sql = require('mssql');

var connectionString = process.env.mssqlconnection;

sql.connect(connectionString).then(function() {

    new sql.Request().query('select * from device').then(function(recordset) {
        console.dir(recordset);
    }).catch(function(err) {
        console.log(err) 
    });
 
}).catch(function(err) {
    console.log(err)
});