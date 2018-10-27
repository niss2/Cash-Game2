var totalDaysForTravel = 0;
var day = 0;
var currentLocation = {
	name: "home",
	locationX: 0,
	locationY: 0
}
var autoTravelTimer;
$(document).ready(function(){
	$("#travelArmy").click(function(){
		currentTradePartner = {
			name:"Army",
			locationX: -4.33,
			locationY: -2.5
		}
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));
	totalDaysForTravel = totalDaysForTravel * player.travelMultiplier;
	})
	$("#travelCaravan").click(function(){
		currentTradePartner = {
			name:"Caravan",
			locationX: 0,
			locationY: 5
		}
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));	
	totalDaysForTravel = totalDaysForTravel * player.travelMultiplier;
	})
	$("#travelScientists").click(function(){
		currentTradePartner = {
			name:"Scientists",
			locationX: 4.33,
			locationY: -2.5
		} 
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,currentTradePartner.locationX,currentLocation.locationY,currentTradePartner.locationY));
totalDaysForTravel = totalDaysForTravel * player.travelMultiplier;
	})
	$(".travel").click(function(){
		document.getElementById("endDay").disabled = false;
		if(totalDaysForTravel == 0){
			log("You are at this location already, stubid!");
			return;
		}
		document.getElementById("autoTravel").disabled = true;
		if(document.getElementById("autoTravel").checked){
			autoTravel();
		}
		console.log("trade function working");
		day = 0
		$(".storeList").hide();
		$(".store").hide();
		$(".storeNav").hide();
		$(".buyAmount").hide();
		$("#tradeTitle").hide();
		$(".mapImage").hide();
		$(".travelGridWrapper").hide();
		$(".navigation").hide();
		$("#buyTable").hide();
		$("#commodityBuyTable").hide();
		document.getElementById("travellingTitle").innerHTML =  "Currently Travelling day: "+ day;
		$("#travellingTitle").show();
		console.log("running new day for first time");
		newDay();
	})
	$("#endDay").click(function(){
		console.log("running next day button");
		
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
autoTravel = function(){
	console.log("autoTravel activated");
	document.getElementById("endDay").disabled = true;
	autoTravelTimer = setInterval(newDay,300);
}
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
	document.getElementById("autoTravel").disabled = false;
	document.getElementById("endDay").disabled = false;
	clearInterval(autoTravelTimer);
	buyTableUpdate();
	mapCheck();
	log("Arrived at",currentTradePartner.name,"after",day-1,"days");
	day = 0;
	player.currentHealth = player.maxHealth;
	document.getElementById("tradeTitle").innerHTML = "Trading with " + currentTradePartner.name;
	$("#tradeTitle").show();
	$(".storeList").show();
	$(".travelGridWrapper").show();
	$(".travelButton").show();
	$(".navigation").hide();
	$(".buy").show();
	$(".sell").show();
	$(".buyAmount").show();
	$("#travellingTitle").hide();
	currentLocation.locationX = currentTradePartner.locationX;
	currentLocation.locationY = currentTradePartner.locationY;
	updatePlayer();
	travelTableUpdate();
}

newDay = function(){
	day += 1;
	console.log("Running newDay");
	if(day > totalDaysForTravel){
		arrived();
		return;
	}
	document.getElementById("travellingTitle").innerHTML =  "Currently Travelling day: "+ day;
	eventGen();
}
eventGen = function(){
	var randomNum = Math.floor((Math.random() * 5) + 1);
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

	var randomNum = Math.floor((Math.random() * 100) + 1);
	if(randomNum >= 80){
		player.cash += 50;
		log("<","Day",day ,">","Random event! You got 50 cash!");
	}
	if(randomNum >= 60 && randomNum < 80){
		if(player.totalSpace-player.spaceUsed > 0){
		var randomNum2 = Math.floor((Math.random() * 3));
		var tempArray = ["Red","Yellow","Blue"];
		player.account[tempArray[randomNum2]] += 1;

		log("<","Day",day ,">","Random event!",tempArray[randomNum2],"+ 1");
		}
		else{
			
		}
		
	}
	if(randomNum >= 40 && randomNum < 60){
		var bonus = player.cash * 0.05;
		bonus = Math.round(bonus);
		player.cash += bonus;

		log("<","Day",day ,">","Random event! You got", bonus,"cash!");
	}
	if(randomNum < 40){
		var bonus = Math.round(player.currentXp * 0.01 + 5);
		player.currentXp +=bonus;
		log("<","Day",day ,">","You feel your mind fill with knowledge! +",bonus,"xp");
	}
	dayEnd();
}
dayEnd = function(){
	updatePlayer();
	currentPlayerStamina = player.maxStamina;
	$("#endDay").show();
}

