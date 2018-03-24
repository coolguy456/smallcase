// var dateFormat = require('dateformat');
// var day=dateFormat(Date.now(), "yyyy-mm-dd h:MM:ss");

// console.log(day);

var ss = require('./model_controllers.js');
// console.log(ss.add({"user_id":1000,"transaction_type":"buy","volume":100,"stock_id":"rel",'cost':5000}));
// console.log(ss.delete({"trade_id":"5ab3d8724d026815f8e9993c"}));
var tt = ss.retreive_company_by_id("5ab55ff1734d1d1aa15482f8")
tt.then(function(result){console.log(result);},function(error){console.log(error);});
// console.log(ss.);