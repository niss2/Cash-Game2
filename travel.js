var totalDaysForTravel = 0;
var day = 1;
var currentLocation = {
	name: "home",
	locationX: 0,
	locationY: 0
}
$(document).ready(function(){
	$("#tradeArmy").click(function(){
		currentTradePartner = {
			name:"army",
			locationX: -4.33,
			locationY: -2.5
		}
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));
	})
	$("#tradeCaravan").click(function(){
		currentTradePartner = {
			name:"caravan",
			locationX: 0,
			locationY: 5
		}
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));	
	})
	$("#tradeScientists").click(function(){
		currentTradePartner = {
			name:"scientists",
			locationX: 4.33,
			locationY: -2.5
		} 
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));

	})
	$(".trade").click(function(){
		if(totalDaysForTravel == 0){
			log("You are at this location already, stubid!");
			return;
		}
		console.log("trade function working");
		day = 1
		$(".mapImage").hide();
		$("#travelTable").hide();
		$(".navigation").hide();
		$(".buy").hide();
		$(".sell").hide();
		document.getElementById("travellingTitle").innerHTML =  "Currently Travelling day: "+ day;
		$("#travellingTitle").show();
		console.log("running new day for first time");
		newDay();
	})
	$("#endDay").click(function(){
		console.log("running next day button");
		day += 1;
		newDay();
	})
	travelTableUpdate = function(){
	console.log("travelTableUpdate running");
	var armyTravelTime = Math.round(calcDistance(currentLocation.locationX,-4.33,currentLocation.locationY,-2.5));
	var caravanTravelTime = Math.round(calcDistance(currentLocation.locationX,0,currentLocation.locationY,5));
	var scientistsTravelTime = Math.round(calcDistance(currentLocation.locationX,4.33,currentLocation.locationY,-2.5));
	document.getElementById("armyTravel").innerHTML =  "Distance: " + armyTravelTime + " days";
	document.getElementById("caravanTravel").innerHTML =  "Distance: " + caravanTravelTime + " days";
	document.getElementById("scientistsTravel").innerHTML =  "Distance: " + scientistsTravelTime + " days"; 
	}
	travelTableUpdate();
});

calcDistance = function(x1,x2,y1,y2){
	return(Math.sqrt(((x2 - x1)*(x2 - x1)) + ((y2-y1)*(y2-y1))));
}
mapCheck = function(){
	if(currentTradePartner.name == "army"){
		$("#mapArmy").show();
	}
	if(currentTradePartner.name == "caravan"){
		$("#mapCaravan").show();
	}
	if(currentTradePartner.name == "scientists"){
		$("#mapScientists").show();
	}
}
arrived = function(){
	mapCheck();
	log("Arrived at",currentTradePartner.name,"after",day,"days");
	day = 1;
	$("#travelTable").show();
	$(".travelButton").show();
	$(".navigation").hide();
	$(".buy").show();
	$(".sell").show();
	$(".buyAmount").show();
	$("#travellingTitle").hide();
	currentLocation.locationX = currentTradePartner.locationX;
	currentLocation.locationY = currentTradePartner.locationY;
	console.log("arrived. updating table.");
	travelTableUpdate();
}

newDay = function(){
	if(day >= totalDaysForTravel){
		arrived();
		return;
	}
	console.log("--------------");
	console.log("New day",day);
	document.getElementById("travellingTitle").innerHTML =  "Currently Travelling day: "+ day;
	eventGen();
}
eventGen = function(){
	console.log("eventGen running");
	var randomNum = Math.floor((Math.random() * 5) + 1);
	console.log("randomNum is",randomNum);
	if(randomNum >= 4 ){
		log("Nothing happened today.");
		dayEnd();
	}
	if(randomNum == 1){
		battleEvent();
	}
	if(randomNum >= 2 && randomNum < 4){
		bonusEvent();
	}

}
bonusEvent = function(){
	console.log("bonus running");
	var randomNum = Math.floor((Math.random() * 100) + 1);
	console.log("randomNum for bonus is:", randomNum);
	if(randomNum >= 80){
		cash += 1000;
		log("Random event! You gained 1000 credits!");
	}
	if(randomNum >= 60 && randomNum < 80){
		account.red += 5;
		account.yellow += 5;
		account.blue += 5;

		log("Random event! All units +5!");
	}
	if(randomNum >= 40 && randomNum < 60){
		var bonus = cash * 0.05
		bonus = Math.round(bonus);
		cash += bonus;
		console.log(cash)
		log("Random event!you gained ", bonus,"(5% of current)credits");
	}
	if(randomNum < 40){
		log("Nothing Happened today");
	}
	dayEnd();
}
dayEnd = function(){
	console.log("day end running");
	updatePlayer();
	$("#endDay").show();
}

