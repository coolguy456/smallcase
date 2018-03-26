var mongoose = require('mongoose');
var collections = require('./models.js');

exports.retreive_buy_transactions_by_user_id = function(user_id) {

	return new Promise(function(resolve, reject){

		collections.buy_transactions.find({'user_id' : user_id}, function (error,response) {

			if(error){
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	})
}


exports.retreive_sell_transactions_by_user_id = function(user_id) {

	return new Promise(function(resolve, reject){

		collections.sell_transactions.find({'user_id' : user_id}, function (error,response) {

			if(error){
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	})
}

exports.add_buy_transaction_by_user_id = function(data) {

	data['date'] = Date.now();
	return new Promise(function(resolve, reject){

		new collections.buy_transactions(data).save(function (error,response) {
			if (error) {console.log(error);
				reject(error);
			}
			else{
				console.log("ssssssssssssssssssssssssss");
				resolve(response);
			}
		});
	})
}

exports.add_sell_transaction_by_user_id = function(data) {

	data['date'] = Date.now();
	// data['stock_id'] = mongoose.Types.ObjectId(data['stock_id']);
	return new Promise(function(resolve, reject) {

		new collections.sell_transactions(data).save(function (error,response) {
			if (error) {
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	})
}

exports.delete_buy_transaction_by_trade_id = function(data) {
	
	return new Promise(function(resolve, reject) {
		
		collections.buy_transactions.remove({'_id' : mongoose.Types.ObjectId(data)}, function(error,response) {
		
			if(error) {
				reject(error);
			}
		
			else{
				resolve(response);
			}

		});

	});

}

exports.delete_sell_transaction_by_trade_id = function(data) {
	return new Promise(function(resolve, reject) {
		collections.sell_transactions.remove({'_id' : mongoose.Types.ObjectId(data)}, function(error,response) {
			if(error) {
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	});
}

exports.modify_buy_transaction = function(data) {
	var _id = mongoose.Types.ObjectId(data['trade_id']);
	delete data['trade_id'];

	return new Promise(function(resolve, reject) {

		collections.buy_transactions.findOneAndUpdate({'_id' : _id}, data, {'upsert' : true}, function(error, response) {
			if(error) {
				reject(error);
			}
			else{
				resolve(response);
			}
		})

	});
}

exports.modify_sell_transaction = function(data) {
	var _id = mongoose.Types.ObjectId(data['trade_id']);
	delete data['trade_id'];

	return new Promise(function(resolve, reject) {

		collections.sell_transactions.findOneAndUpdate({'_id' : _id}, data, {'upsert' : true}, function(error, response) {
			if(error) {
				reject(error);
			}
			else{
				resolve(response);
			}
		})

	});
}

exports.retreive_company_by_id = function(_id) {

	return new Promise(function(resolve, reject){

		collections.stocks.find({'_id' : mongoose.Types.ObjectId(_id)}, function (error,response) {

			if(error){
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	})
}

exports.cummulative_returns_buy_transactions_by_user_id = function(_id) {
	return new Promise(function(resolve,reject){
		collections.buy_transactions.aggregate([
			{
				$match: { "user_id": _id }
			},
			{
				$group: { _id: "$stock_id", cummulative: {$sum:{$multiply:[{$divide:[{$subtract:[100,"$total_cost"]},"$total_cost"]},"$volume"]}}}
			},
			{
				$project: { _id: 1, cummulative: 1}
			}
		],function(error,response){
			if(error){
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	});
}

// exports.cummulative_returns_sell_transactions_by_user_id = function(_id) {
// 	return new Promise(function(resolve,reject){
// 		collections.sell_transactions.aggregate([
// 			{
// 				$match: { "user_id": _id }
// 			},
// 			{
// 				$group: { _id: "$stock_id", sell_price: { $sum: volume} }
// 			}
// 		],function(error,response){
// 			if(error){
// 				reject(error);
// 			}
// 			else{
// 				resolve(response);
// 			}
// 		});
// 	});
// }

exports.holdings_buy_transactions_by_user_id = function(_id) {
	return new Promise(function(resolve,reject){
		collections.buy_transactions.aggregate([
			{
				$match: { "user_id": _id }
			},
			{
				$group: { _id: "$stock_id", buy_price: { $sum: {$multiply: ["$volume","$total_cost"]}}, stock_count: { $sum: "$volume" } }
			},
			{
				$addFields: { holdings: {$divide:["$buy_price","$stock_count"]}}
			},
			{
				$project: {holdings:1,_id:1,stock_count:1}
			}
		],function(error,response){
			if(error){
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	});
}

exports.holdings_sell_transactions_by_user_id = function(_id) {
	return new Promise(function(resolve,reject){
		collections.sell_transactions.aggregate([
			{
				$match: { "user_id": _id }
			},
			{
				$group: { _id: "$stock_id", stock_count: { $sum: "$volume" } }
			}
		],function(error,response){
			if(error){
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	});
}
// retreive_sell_transactions_by_user_id(1000);
// exports.cummulative_returns_buy_transactions_by_user_id()