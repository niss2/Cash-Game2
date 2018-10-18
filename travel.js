var totalDaysForTravel = 0;
var currentLocation = "start";
$(document).ready(function(){
	$("#tradeArmy").click(function(){
		currentTradePartner = "army";
		if(currentLocation == "start"){
			totalDaysForTravel = 5;
		}
	})
	$("#tradeCaravan").click(function(){
		currentTradePartner = "caravan";
		if(currentLocation == "start"){
			totalDaysForTravel = 8;
		}	
	})
	$("#tradeScientists").click(function(){
		currentTradePartner = "scientists";
		if(currentLocation == "start"){
			totalDaysForTravel = 7;
		}
	})
	var day = 1;
	$(".trade").click(function(){
		console.log("trade function working");
		var day = 1;
		$(".trade").hide();
		$(".navigation").hide();
		$(".buy").hide();
		$(".sell").hide();
		document.getElementById("travellingTitle").innerHTML =  "Currently Travelling day: "+ day;
		$("#travellingTitle").show();
		console.log("running new day for first time");
		newDay(day);
		updatePlayer();
	})
	$("#endDay").click(function(){
		console.log("running next day button");
		day += 1;
		newDay(day);
	})
});
arrived = function(){
	console.log("arrived");
	$(".navigation").hide();
	$(".buy").show();
	$(".sell").show();
	$(".buyAmount").show();
	$("#travellingTitle").hide();
	currentLocation = currentTradePartner;
}

newDay = function(day){
	if(day > totalDaysForTravel){
		arrived();
		return;
	}
	console.log("--------------");
	console.log("New day",day);
	document.getElementById("travellingTitle").innerHTML =  "Currently Travelling day: "+ day;
	eventGen(day);
}
eventGen = function(day){
	console.log("eventGen running");
	var randomNum = Math.floor((Math.random() * 5) + 1);
	console.log("randomNum is",randomNum);
	if(randomNum >= 4 ){
		console.log("nothing happened");
		dayEnd(day);
	}
	if(randomNum == 1){
		battleEvent(day);
	}
	if(randomNum >= 2 && randomNum < 4){
		bonusEvent(day);
	}

}
battleEvent = function(day){
	console.log("Battle!")
	dayEnd(day);
}
bonusEvent = function(day){
	console.log("bonus running");
	var randomNum = Math.floor((Math.random() * 100) + 1);
	if(randomNum >= 80){
		cash += 1000;
		console.log("Cash + 1k");
	}
	if(randomNum >= 60 && randomNum < 80){
		account.red += 5;
		account.yellow += 5;
		account.blue += 5;

		console.log("Account + 5 each");
	}
	if(randomNum >= 40 && randomNum < 60){
		var bonus = cash * 0.05
		bonus = Math.round(bonus);
		cash += bonus;
		console.log(cash)
		console.log("cash + 5%", "(" + bonus + ")");
	}
	else{
		console.log("empty bonus")
	}
	dayEnd(day);
}
dayEnd = function(day){
	console.log("day end running");
	updatePlayer();
	$("#endDay").show();
}

