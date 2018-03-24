var variables = require('./variables')
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var buy_transaction = new Schema({
	volume: Number,
	date: Date,
	total_cost: Number,
	user_id: Number,
	stock_id: String
});

var sell_transaction = new Schema({
	volume: Number,
	date: Date,
	total_cost: Number,
	user_id: Number,
	stock_id: String
});


var mongo_url = variables.mongo_url;
var mongo_port = variables.mongo_port;
var database = variables.database;
var database_user = variables.database_user;
var database_user_password = variables.database_user_password;


console.log("eaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
mongoose.connect('mongodb://'+database_user+':'+database_user_password+'@'+mongo_url+':'+mongo_port+'/'+database);

mongoose.connection.on("open", function(ref) {
	console.log("escaoeeeeeeeeeeeeeeeee");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

exports.buy_transactions = mongoose.model("buy_transaction",buy_transaction);
exports.sell_transactions = mongoose.model("sell_transaction",sell_transaction);	


// stocks = mongoose.model("stocks",stocks);
// buy_transactions = mongoose.model("buy_transaction",buy_transaction);
// sell_transactions = mongoose.model("sell_transaction",sell_transaction);	

// var buy = new buy_transactions({
// 	volume: 100,
// 	date: new Date(2018, 3, 25),
// 	total_cost: 205.6,
// 	user_id: 1000,
// 	stock_id: mongoose.Types.ObjectId("5ab2a3498f8f5819a22f53db")
// });

// var sell = new sell_transactions({
// 	volume: 100,
// 	date: new Date(2018, 3, 26),
// 	total_cost: 100,
// 	user_id: 1000,
// 	stock_id: mongoose.Types.ObjectId("5ab2a3498f8f5819a22f53dd")
// });

// buy.save();
// sell.save();