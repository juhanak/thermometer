var eachSeries = require('async/eachSeries');
var mapSeries = require('async/mapSeries');

module.exports = class UploadTemperature{
  constructor( ) {
  }

  execute(sReq, sRes, sql) {
    var _this = this;
    var finish = (sRes, result ) => {
      let response = {
        'result':result 
      };
      sRes.send(JSON.stringify(response));
    }
    
    new sql.Request()
      .input('input_parameter1', sql.Char, sReq.body.deviceId)
      .input('input_parameter2', sql.Real, sReq.body.celsius)
      .query('INSERT INTO measurement(iddevice, temperature) VALUES (@input_parameter1,@input_parameter2)').then(function(recordset) {
      return finish(sRes,1)        
    }).catch(function(err) {
        return finish(sRes,1)
    });
  }
}