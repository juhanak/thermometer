module.exports = class GetTemperatures{

  execute(sReq, sRes, sql) {
    var _this = this;
    
    var finish = (sRes, result, data ) => {
      let response = {
        'result':result, 
        'data' : data
      };

      sRes.send(JSON.stringify(response));
    }

    if(sReq.query && sReq.query.deviceId) {
      new sql.Request()
        .input('input_deviceid', sql.Char, sReq.query.deviceId)
        .query('SELECT temperature, updatetime FROM measurement where iddevice = @input_deviceid ORDER BY updatetime DESC OFFSET 0 ROWS FETCH NEXT 30 ROWS ONLY').then(function(recordset) {
        return finish(sRes,1,recordset)
      }).catch(function(err) {
        return finish(sRes,0)
      });
    } else 
    {
      return finish(sRes,0);
    }
  }
}