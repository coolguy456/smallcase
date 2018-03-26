created 3 collections:
1) stocks
2) buy transactions
3) sell transactions

The design of these collections are made to ensure less number of reads and writes

APIS:

A trade is identified by the transaction_type(buy or sell) and object_id in the corresponding collection

1) /portfolio/retreive(GET):

	http://localhost:8000/retreive?user_id=1000
	returns portfolio based on user_id

2) /portfolio/add(POST):

	http://localhost:8000/portfolio/add
	body: {
		"user_id":1000,
		"transaction_type":"sell",
		"volume":100,"
		stock_id":"5ab5ee5cddbb6d37a0cf2a01",
		"total_cost":"5000"
	}
	adds trade 

3) /portfolio/delete(POST):
	
	http://localhost:8000/portfolio/delete
	body:{
		"trade_id":"5ab602056749f24167791c0f",
		"transaction_type":"buy"
	}
	deletes trade

4) /portfolio/modify(POST):

	http://localhost:8000/portfolio/modify
	body:{
		"trade_id":"5ab602056749f24167791c0f",
		"transaction_type":"buy",
		"previous_transaction_type":"sell",
		"user_id":1000,
		"total_cost":10000,
		"stock_id":"5ab5ee5cddbb6d37a0cf2a01",
		"volume":"78524"
	}
	modifies trade

5) /portfolio/holdings(POST):

	http://localhost:8000/portfolio/holdings
	body:{
		"user_id":1000
	}
	display holdings based on user id

6) /portfolio/cummulative_returns(POST):

	http://localhost:8000/portfolio/cummulative_returns
	body:{
		"user_id":1000
	}
	display cummulative returns
