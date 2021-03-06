var express = require('express');
var app = express();
var controllers = require('./controllers.js');
var body_parser = require('body-parser');
var request_parser = body_parser.urlencoded({extended:false});
app.use(body_parser.json());
var error_response = {"error": true, "message": "your request cannot be satisfied"};

app.get('/portfolio/retreive', function (request, response){
	try{
		user_id = request.query['user_id'];
		if(user_id == undefined){
			response.send(error_response);
		}
		var portfolio = controllers.retreive(user_id);
		portfolio.then(function(result){
			return controllers.retreive_step_two(result);
		},function(error){
			response.send(error_response)
		}).then(function(result){response.send(result)},function(error){response.send(error_response);});
	}
	catch(exception){
		response.send(error_response);
	}
})

app.post('/portfolio/add',function (request, response){
	try{
		data = request.body;
		if(data == undefined){
			response.send(error_response);
		}
		var add_result = controllers.add(data);
		add_result.then(function(result){
			response.send(result);
		},function(error){
			response.send(error_response);
		});
		// response.send(controllers.add(data));
	}
	catch(exception){
		response.send(error_response);
	}
})

app.post('/portfolio/delete',function (request, response){
	try{
		data = request.body;
		if(data == undefined){
			response.send(error_response);
		}
		var delete_result = controllers.delete_record(data);
		delete_result.then(function(result){
			response.send(result);
		},function(error){
			response.send(error_response);
		});
		
	}
	catch(exception){
		response.send(error_response);
	}
})

app.post('/portfolio/modify',function (request, response){
	try{
		data = request.body;
		// console.log(data);
		if(data == undefined){
			response.send(error_response);
		}
		var modify_result = controllers.modify(data);
		modify_result.then(function(result){
			console.log(result);console.log("[[[[[[[[[[[[[[[[[[[");
			response.send(result);	
		},function(error){
			console.log(error);console.log("]]]]]]]]]]]]]]]]");
			response.send(error_response);
		});
		
	}
	catch(exception){
		console.log("qqqqqqqqq");
		response.send(error_response);
	}
})

app.post('/portfolio/holdings',function(request,response){
	try{
		data = request.body;
		user_id = data['user_id'];
		var holdings_result = controllers.get_holdings_by_user_id(user_id);
		holdings_result.then(function(result){
			console.log(result);
			return controllers.get_holdings_by_user_id_part_two(result);
		},function(error){
			console.log(error);
			response.send(error_response);
		}).then(function(result){
			console.log(result);
			response.send(result);
		},function(error){
			console.log(error);response.send(error_response);
		});
	}
	catch(exception){
		response.send(error_response);
	}
})

app.post('/portfolio/cummulative_returns',function(request,response){
	try{
		data = request.body;
		user_id = data['user_id'];
		var cummulative_returns_result = controllers.get_cummulative_returns_by_user_id(user_id);
		cummulative_returns_result.then(function(result){response.send(result);},function(error){console.log(error);response.send(error_response);});
	}
	catch(exception){
		response.send(error_response);
	}
})

// var port = process.env.PORT || 3000
var server = app.listen(8000, function () {
   var host = server.address().address
   var port = 8000
   
   console.log("Example app listening at http://%s:%s", host, port)
})
