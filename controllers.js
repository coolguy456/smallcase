var model_controllers = require('./model_controllers.js');
var error_response = {"error": true, "message": "your request cannot be satisfied"};

exports.retreive = function(input) {
	var user_id = input;
	var portfolio = [];
	var buy_transactions = model_controllers.retreive_buy_transactions_by_user_id(user_id);
	var sell_transactions = model_controllers.retreive_sell_transactions_by_user_id(user_id);
	return new Promise(function(resolve,reject){
		Promise.all([buy_transactions,sell_transactions]).then(results => {
			// console.log(results);
			let [buy_transactions_portfolio,sell_transactions_portfolio] = results;
			// console.log(buy_transactions_portfolio);
			all_transactions = [];
			for(var i=0;i < buy_transactions_portfolio.length;i++){
				var temp = {};
				temp['transaction_type'] = 'buy';
				temp['user_id'] = buy_transactions_portfolio[i]['user_id'];
				temp['volume'] = buy_transactions_portfolio[i]['volume'];
				temp['stock_id'] = buy_transactions_portfolio[i]['stock_id'];
				temp['total_cost'] = buy_transactions_portfolio[i]['total_cost'];
				temp['date'] = buy_transactions_portfolio[i]['date'];
				// console.log(temp);
				portfolio.push(temp);
			}

			for(var i=0;i < sell_transactions_portfolio.length;i++){
				var temp = {};
				temp['transaction_type'] = 'sell';
				temp['user_id'] = sell_transactions_portfolio[i]['user_id'];
				temp['volume'] = sell_transactions_portfolio[i]['volume'];
				temp['stock_id'] = sell_transactions_portfolio[i]['stock_id'];
				temp['total_cost'] = sell_transactions_portfolio[i]['total_cost'];
				temp['date'] = sell_transactions_portfolio[i]['date'];
				// console.log(temp);
				portfolio.push(temp);
			}
			resolve(portfolio);
		}).catch(error => {reject(error);});
	});
}

exports.retreive_step_two = function(input){
	var promises = [];
	console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrr");
	console.log(input);
	for(var i = 0;i < input.length;i++){
		// var iii = input[i]['stock_id'];
		// console.log(iii);
		promises.push(model_controllers.retreive_company_by_id(input[i]['stock_id']));
	}
	
	return new Promise(function(resolve,reject){console.log(promises);
		Promise.all(promises).then(results => {console.log("hhhhhhhhhhhhhhhhhhhh");
			console.log(results);
			// final_results = [];
			for(var i = 0;i < input.length;i++){
				input[i]['company'] = results[i][0]['company'];
			}
			console.log(input);
			resolve(input);
		}).catch(error => {reject(error);});
	});
}


exports.add = function(input){
	console.log(input['transaction_type']);
	if(input['transaction_type'] == 'buy'){
		delete input['transaction_type'];
		
 var add_buy_transaction_result = model_controllers.add_buy_transaction_by_user_id(input);
 return new Promise(function(resolve,reject){
 	add_buy_transaction_result.then(function(result) {
			result['message'] = 'adding trade successful';
			resolve(result);
		},function(error){
			reject(error);
		});
 });
		 
	}
	else if(input['transaction_type'] == 'sell'){
		delete input['transaction_type'];
			var add_sell_transaction_result = model_controllers.add_sell_transaction_by_user_id(input);
			return new Promise(function(resolve,reject){
				add_sell_transaction_result.then(function(result) {
					result['message'] = 'adding trade successful';
					resolve(result);
				},function(error){
					reject(error);
				});	
		});
				
	}
	else{
		return new Promise.reject("check transaction_type");
	}	
}

exports.delete_record = function(input){
	// console.log("ererererererer");
	// console.log(input);
	trade_id = input['trade_id'];
	transaction_type = input['transaction_type'];

	if(transaction_type == 'buy'){
		console.log(trade_id);
		var delete_query_result = model_controllers.delete_buy_transaction_by_trade_id(trade_id);
		return new Promise(function(resolve,reject){
			delete_query_result.then(function(result){
				resolve({"message":"successfully deleted the given record"})
			},function(error){
				reject(error);
			});
		});
		
	}
	else if(transaction_type == 'sell'){
		var delete_query_result = model_controllers.delete_sell_transaction_by_trade_id(trade_id);
		return new Promise(function(resolve,reject){
			delete_query_result.then(function(result){
				resolve ({"message":"successfully deleted the given record"})
			},function(error){
				reject(error);
			});	
		});
		
	}
	else{return new Promise.reject("check transaction_type");}
}

exports.modify = function(input){
	trade_id = input['trade_id'];
	transaction_type = input['transaction_type'];
	previous_transaction_type = input['previous_transaction_type'];
	delete input['transaction_type'];
	delete input['previous_transaction_type'];

	if(transaction_type == 'buy' && previous_transaction_type == 'sell'){
		input['transaction_type'] = 'sell';
		console.log("iiiiiiiiiiiiii");
		var delete_response = exports.delete_record(input);
		console.log("popopopopopopopopopopopo");
		input['transaction_type'] = 'buy';
		delete input['previous_transaction_type'];
		var add_response = exports.add(input);
		return new Promise(function(resolve,reject){
			Promise.all([delete_response,add_response]).then(results => {
			let [delete_results,add_results] = results;
			resolve({"message" : "modification successful"});
			}).catch(error => {console.log("ttttttttttttttttttt");reject(error);});	
		});
	}
	else if(transaction_type == 'buy' && previous_transaction_type =='buy'){
		input['date'] = Date.now();
		var modify_query_result = model_controllers.modify_buy_transaction(input);
		return new Promise(function(resolve,reject){
			modify_query_result.then(function(result){
				result['message'] = 'modification successful';
				resolve(result);
			},function(error){
				reject(error);
			});		
		});		
	}
	else if(transaction_type == 'sell' && previous_transaction_type == 'sell'){
		input['date'] = Date.now();
		var modify_query_result = model_controllers.modify_sell_transaction(input);
		return new Promise(function(resolve,reject){
			modify_query_result.then(function(result){
				result['message'] = 'modification successful';
				resolve(result);
			},function(error){
				reject(error);
			});
		});
	}
	else if(transaction_type == 'sell' && previous_transaction_type == 'buy'){
		input['transaction_type'] = 'buy';
		var delete_response = exports.delete_record(input);
		input['transaction_type'] = 'sell';
		delete input['previous_transaction_type'];
		var add_response = exports.add(input);
		return new Promise(function(resolve,reject){
			Promise.all([delete_response,add_response]).then(results => {
			let [delete_results,add_results] = results;
			// portfolio = buy_transactions_portfolio.concat(sell_transactions_portfolio);
			// console.log(portfolio);
			resolve({"message" : "modification successful"});
			}).catch(error => {reject(error);});	
		});
	}
	else{
		return Promise.reject();
	}
}

exports.get_holdings_by_user_id = function(input){
	buy_holdings = model_controllers.holdings_buy_transactions_by_user_id(input);
	sell_holdings = model_controllers.holdings_sell_transactions_by_user_id(input);
	return new Promise(function(resolve,reject){
		Promise.all([buy_holdings,sell_holdings]).then(results => {
			console.log(results);
			var id_dict = {}
			for(var i = 0;i < results[0].length;i++){
				id_dict[results[0][i]['_id']] = {};
				id_dict[results[0][i]['_id']]['stock_count'] = results[0][i]['stock_count'];
				id_dict[results[0][i]['_id']]['holdings'] = results[0][i]['holdings'];
			}
			for(var i = 0;i < results[1].length;i++){
				id_dict[results[1][i]['_id']]['stock_count'] -= results[1][i]['stock_count'];
			}
			resolve(id_dict);
		}).catch(error => {reject(error);})});
}

exports.get_holdings_by_user_id_part_two = function(input){
	var promises = [];
	var keys = [];
	output = [];
	console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrr");
	console.log(input);
	for(var k in input){
		// var iii = input[i]['stock_id'];
		// console.log(iii);
		keys.push(k);
		promises.push(model_controllers.retreive_company_by_id(k));
	}
	
	return new Promise(function(resolve,reject){console.log(promises);
		Promise.all(promises).then(results => {console.log("hhhhhhhhhhhhhhhhhhhh");
			console.log(results);
			// final_results = [];
			for(var i = 0;i < keys.length;i++){
				var temp = {};
				temp['company'] = results[i][0]['company'];
				temp['stock_count'] = input[keys[i]]['stock_count'];
				temp['holdings'] = input[keys[i]]['holdings'];
				output.push(temp);
			}
			console.log(output);
			resolve(output);
		}).catch(error => {reject(error);});
	});
}

exports.get_cummulative_returns_by_user_id = function(input){
	var cummulative_returns = model_controllers.cummulative_returns_buy_transactions_by_user_id(input);
	return new Promise(function(resolve,reject){
		cummulative_returns.then(function(result){console.log(result);resolve(result);},function(error){reject(error);});
	});
}