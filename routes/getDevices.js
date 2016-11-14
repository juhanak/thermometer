module.exports = class GetDevices{
 
  execute(sReq, sRes, sql) {
    var _this = this;
    
    var finish = (sRes, result, data ) => {
      let response = {
        'result':result, 
        'data' : data
      };
      sRes.send(JSON.stringify(response));
    }

    new sql.Request()
        .query('SELECT iddevice FROM device').then(function(recordset) {
        return finish(sRes,1,recordset)
      }).catch(function(err) {
        return finish(sRes,0)
      });
  }
}