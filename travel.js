var totalDaysForTravel = 0;
var day = 1;
var currentLocation = {
	name: "home",
	locationX: 0,
	locationY: 0
}
$(document).ready(function(){
	$("#travelArmy").click(function(){
		currentTradePartner = {
			name:"Army",
			locationX: -4.33,
			locationY: -2.5
		}
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));
	})
	$("#travelCaravan").click(function(){
		currentTradePartner = {
			name:"Caravan",
			locationX: 0,
			locationY: 5
		}
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));	
	})
	$("#travelScientists").click(function(){
		currentTradePartner = {
			name:"Scientists",
			locationX: 4.33,
			locationY: -2.5
		} 
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));

	})
	$(".travel").click(function(){
		if(totalDaysForTravel == 0){
			log("You are at this location already, stubid!");
			return;
		}
		console.log("trade function working");
		day = 1
		$(".buyAmount").hide();
		$(".mapImage").hide();
		$(".travelGridWrapper").hide();
		$(".navigation").hide();
		$("#buyTable").hide();
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
		var ArmyTravelTime = Math.round(calcDistance(currentLocation.locationX,-4.33,currentLocation.locationY,-2.5));
		var CaravanTravelTime = Math.round(calcDistance(currentLocation.locationX,0,currentLocation.locationY,5));
		var ScientistsTravelTime = Math.round(calcDistance(currentLocation.locationX,4.33,currentLocation.locationY,-2.5));
		document.getElementById("ArmyTravel").innerHTML =  "Distance: " + ArmyTravelTime + " days";
		document.getElementById("CaravanTravel").innerHTML =  "Distance: " + CaravanTravelTime + " days";
		document.getElementById("ScientistsTravel").innerHTML =  "Distance: " + ScientistsTravelTime + " days"; 
	}
	travelTableUpdate();

});

calcDistance = function(x1,x2,y1,y2){
	return(Math.sqrt(((x2 - x1)*(x2 - x1)) + ((y2-y1)*(y2-y1))));
}
mapCheck = function(){
	if(currentTradePartner.name == "Army"){
		$("#mapArmy").show();
	}
	if(currentTradePartner.name == "Caravan"){
		$("#mapCaravan").show();
	}
	if(currentTradePartner.name == "Scientists"){
		$("#mapScientists").show();
	}
}
arrived = function(){
	buyTableUpdate();
	mapCheck();
	log("Arrived at",currentTradePartner.name,"after",day-1,"days");
	day = 1;
	currentPlayerHP = playerMaxHealth;
	$("#buyTable").show();
	$(".travelGridWrapper").show();
	$(".travelButton").show();
	$(".navigation").hide();
	$(".buy").show();
	$(".sell").show();
	$(".buyAmount").show();
	$("#travellingTitle").hide();
	currentLocation.locationX = currentTradePartner.locationX;
	currentLocation.locationY = currentTradePartner.locationY;
	console.log("arrived. updating table.");
	updatePlayer();
	travelTableUpdate();
}

newDay = function(){
	if(day > totalDaysForTravel){
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
	if(randomNum == 5){
		log("<","Day",day ,">","Nothing happened today.");
		dayEnd();
	}
	if(randomNum < 3){
		log("<","Day",day,">","Battle!");
		battleEvent();
	}
	if(randomNum > 2 && randomNum < 5){
		bonusEvent();
	}

}
bonusEvent = function(){
	console.log("bonus running");
	var randomNum = Math.floor((Math.random() * 100) + 1);
	console.log("randomNum for bonus is:", randomNum);
	if(randomNum >= 80){
		cash += 100;
		log("<","Day",day ,">","Random event! You got 100 cash!");
	}
	if(randomNum >= 60 && randomNum < 80){
		var randomNum2 = Math.floor((Math.random() * 3));
		var tempArray = ["Red","Yellow","Blue"];
		account[tempArray[randomNum2]] += 1;

		log("<","Day",day ,">","Random event!",tempArray[randomNum2],"+ 1");
	}
	if(randomNum >= 40 && randomNum < 60){
		var bonus = cash * 0.05;
		bonus = Math.round(bonus);
		cash += bonus;
		console.log(cash)
		log("<","Day",day ,">","Random event! You got", bonus,"cash!");
	}
	if(randomNum < 40){
		var bonus = Math.round(currentXp * 0.01 + 5);
		currentXp +=bonus;
		log("<","Day",day ,">","You feel your mind fill with knowledge! +",bonus,"xp");
	}
	dayEnd();
}
dayEnd = function(){
	console.log("day end running");
	updatePlayer();
	currentPlayerStamina = playerMaxStamina;
	$("#endDay").show();
}

