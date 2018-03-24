// var reliance = new stocks({
// 	stock_id: "rel",
// 	company: "reliance"
// });

// var tata = new stocks({
// 	stock_id: "tata",
// 	company: "tata"
// });

// var idea = new stocks({
// 	stock_id: "ide",
// 	company: "idea"
// });

// var airtel = new stocks({
// 	stock_id: "air",
// 	company: "airtel"
// });

// reliance.save();
// tata.save();
// idea.save();
// airtel.save();

var buy = new buy_transaction({
	volume: 100,
	date: new Date(2018, 3, 25),
	total_cost: 205.6,
	user_id: 1000,
	stock_id: mongoose.Types.ObjectId("5ab2a3498f8f5819a22f53db")
});

var sell = new sell_transaction({
	volume: 100,
	date: new Date(2018, 3, 26),
	total_cost: 100,
	user_id: 1000,
	stock_id: mongoose.Types.ObjectId("5ab2a3498f8f5819a22f53dd")
});

buy.save();
sell.save();