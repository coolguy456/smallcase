var variables = require('./variables')
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stocks = new Schema({
	stock_id: String,
	company: String
});

var buy_transaction = new Schema({
	volume: Number,
	date: Date,
	total_cost: Number,
	user_id: Number,
	stock_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'stocks'
	}
});

var sell_transaction = new Schema({
	volume: Number,
	date: Date,
	total_cost: Number,
	user_id: Number,
	stock_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'stocks'
	}
});


var mongo_url = variables.mongo_url;
var mongo_port = variables.mongo_port;
var database = variables.database;
var database_user = variables.database_user;
var database_user_password = variables.database_user_password;


// console.log("eaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
exports.stocks = mongoose.model("stocks",stocks);