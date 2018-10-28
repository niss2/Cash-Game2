var totalDaysForTravel = 0;
var day = 0;
var currentLocation = {
	name: "home",
	locationX: 0,
	locationY: 0
}
var travelHack = false;
var autoTravelTimer;
$(document).ready(function(){
	$("#travelArmy").click(function(){
		player.currentLocation = "Army";
		player.currentLocationClass = "trade";		
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,objectOmega.Army.locationX,currentLocation.locationY,objectOmega.Army.locationY));
		totalDaysForTravel = totalDaysForTravel * player.travelMultiplier;
	})
	$("#travelCaravan").click(function(){
		player.currentLocation = "Caravan";	
		player.currentLocationClass = "trade";	
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,objectOmega.Caravan.locationX,currentLocation.locationY,objectOmega.Caravan.locationY));	
		totalDaysForTravel = totalDaysForTravel * player.travelMultiplier;
	})
	$("#travelScientists").click(function(){
		player.currentLocation = "Scientists";		
		player.currentLocationClass = "trade";	
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,objectOmega.Scientists.locationX,currentLocation.locationY,objectOmega.Scientists.locationY));
		totalDaysForTravel = totalDaysForTravel * player.travelMultiplier;
	})
	$("#travelFishing").click(function(){
		player.currentLocation = "fishing";	
		player.currentLocationClass = "skill";		
		totalDaysForTravel = Math.round(calcDistance(currentLocation.locationX,objectOmega.fishing.locationX,currentLocation.locationY,objectOmega.fishing.locationY));
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
		$(".travelTitle").hide();
		$("#tradeTitle").hide();
		$(".mapImage").hide();
		$("#tradeTravelWrapper").hide();
		$("#skillTravelWrapper").hide();
		$(".navigation").hide();
		$("#buyTable").hide();
		$("#commodityBuyTable").hide();
		$("#fishingWrapper").hide();
		
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
		var ArmyTravelTime = Math.round(calcDistance(currentLocation.locationX,objectOmega.Army.locationX,currentLocation.locationY,objectOmega.Army.locationY));
		var CaravanTravelTime = Math.round(calcDistance(currentLocation.locationX,objectOmega.Caravan.locationX,currentLocation.locationY,objectOmega.Caravan.locationY));
		var ScientistsTravelTime = Math.round(calcDistance(currentLocation.locationX,objectOmega.Scientists.locationX,currentLocation.locationY,objectOmega.Scientists.locationY));
		var fishingTravelTime = Math.round(calcDistance(currentLocation.locationX,objectOmega.fishing.locationX,currentLocation.locationY,objectOmega.fishing.locationY));
		document.getElementById("ArmyTravel").innerHTML =  "Distance: " + ArmyTravelTime + " days";
		document.getElementById("CaravanTravel").innerHTML =  "Distance: " + CaravanTravelTime + " days";
		document.getElementById("ScientistsTravel").innerHTML =  "Distance: " + ScientistsTravelTime + " days"; 
		document.getElementById("fishingTravelTime").innerHTML =  "Distance: " + fishingTravelTime + " days"; 
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
	if(player.currentLocation == "Army"){
		$("#mapArmy").show();
	}
	if(player.currentLocation == "Caravan"){
		$("#mapCaravan").show();
	}
	if(player.currentLocation == "Scientists"){
		$("#mapScientists").show();
	}
	if(player.currentLocation == "fishing"){
		$("#mapFishing").show();
	}
}
arrived = function(){
	document.getElementById("autoTravel").disabled = false;
	document.getElementById("endDay").disabled = false;
	clearInterval(autoTravelTimer);
	buyTableUpdate();
	mapCheck();
	log("Arrived at",player.currentLocation,"after",day-1,"days");
	day = 0;
	player.currentHealth = player.maxHealth;
	$(".navigation").hide();
	$("#travellingTitle").hide();
	if(player.currentLocationClass == "trade"){
		document.getElementById("tradeTitle").innerHTML = "Trading with " + player.currentLocation;
		$(".storeList").show();
		$("#tradeTitle").show();
		$("#travelWrapper").show()
		$(".travelGridWrapper").show();
		$("#travelOptions").show();
		$(".buy").show();
		$(".sell").show();
		$(".buyAmount").show();

	}
	if(player.currentLocation == "fishing"){
		$(".travelGridWrapper").show();
		$("#travelOptions").show();
		$("#fishingWrapper").show();
	}
	
	currentLocation.locationX = objectOmega[player.currentLocation].locationX;
	currentLocation.locationY = objectOmega[player.currentLocation].locationY;
	updatePlayer();
	travelTableUpdate();
}

newDay = function(){
	if(travelHack){
		arrived();
		return;
	}
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
	currentPlayerStamina = player.maxStamina;
	updatePlayer();
	$("#endDay").show();
}

