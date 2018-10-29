$(document).ready(function(){
	$("#fishingBtn").click(function(){
		fishing();
	})
})

fishing = function(){
	var fishingHtml = $("#fishingBtn").html()
	if(fishingHtml == "Reel in"){
		reelIn();
		$("#fishingBtn").html("Cast line");
	}
	else{
		throwOut();
		$("#fishingBtn").html("Reel in");
	}
	
}
var fish = {

}
throwOut = function(){
	var randomNum = Math.floor(Math.random()*4+1);
	switch(randomNum){
		case 1:
		var audio = new Audio('audio/linecast1.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 2:
		var audio = new Audio('audio/linecast2.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 3:
		var audio = new Audio('audio/linecast3.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 4:
		var audio = new Audio('audio/linecast4.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
	}
	fish.caught = false;
	log("You cast the line.")
	fish.searchTimer = setTimeout(fishHooked,Math.round(Math.random()*2.5 +2)*1000 )
}
fishHooked = function(){
	log("fish hooked!")
	var audio = new Audio('audio/fishhooked.mp3');
	audio.volume = 0.1;
	audio.play();
	fish.hookedTimer = setTimeout(fishEscaped,2500);
	fish.hooked = true;
}
fishEscaped = function(){
	var randomNum = Math.floor(Math.random()*12+1);
	switch(randomNum){
		case 1:
		var audio = new Audio('audio/fishescape-01.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 2:
		var audio = new Audio('audio/fishescape-02.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 3:
		var audio = new Audio('audio/fishescape-03.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 4:
		var audio = new Audio('audio/fishescape-04.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 5:
		var audio = new Audio('audio/fishescape-05.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 6:
		var audio = new Audio('audio/fishescape-06.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 7:
		var audio = new Audio('audio/fishescape-07.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 8:
		var audio = new Audio('audio/fishescape-08.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 9:
		var audio = new Audio('audio/fishescape-09.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 10:
		var audio = new Audio('audio/fishescape-10.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 11:
		var audio = new Audio('audio/fishescape-11.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
		case 12:
		var audio = new Audio('audio/fishescape-12.mp3');
		audio.volume = 0.5;
		audio.play();
		break;
	}
	log("The fish got away.");

	fish.hooked = false;
	$("#fishingBtn").html("Cast line");
}
// function Fish(hooked,length,rarity,rarityMulti,inventoryImg,price);
reelIn = function(){
	if(fish.hooked){
		fish.hooked = false;
		clearTimeout(fish.hookedTimer);
		fish.length = Math.round(Math.random()*200 + 40)/10;
		fishType();
		
		var fishRarityInfo = enemyRarity();
		fish.rarity = fishRarityInfo.rarity;
		fish.rarityMulti = fishRarityInfo.multiplier;
		fish.inventoryImg = "images/fishinventory.png";
		console.log(fishRarityInfo)
		fish.price = Math.round((fish.length * 1.75) * fish.priceMulti + 3 * (fish.rarityMulti * .5)); 
		var space = itemAcquire(fish);
		if(space == undefined){
			log("Inventory Full.");
		}
		if(space){
			player.cash += fish.price;
			log("You caught a","[",fish.rarity,"]",fish.breed,"[",fish.length,"cm","]","worth",fish.price,"cash!")
		}
		
		fish.caught = true;
	}
	if(!fish.hooked && !fish.caught){
		fish.hooked = false;
		clearTimeout(fish.hookedTimer);
		clearTimeout(fish.searchTimer);
		log("No fish hooked.");
	}
}
fishType = function(){
	var randomNum = Math.round(Math.random()*10+1);
	switch(randomNum){
		case 1:
		fish.breed = "Energyfish";
		fish.priceMulti = 1;
		fish.Description = ""
		break;
		case 2:
		fish.breed = "Robertfish";
		fish.priceMulti = 3;
		fish.Description = "You hear it mumbling incoherently about data and birdies..."
		break;
		case 3:
		fish.priceMulti = 4;
		fish.breed = "Cockatoofish";
		break;
		case 4:
		fish.priceMulti = 2;
		fish.breed = "Lobster";
		break;
		case 5:
		fish.priceMulti = 1.5;
		fish.breed = "Bazingafish";
		break;
		case 6:
		fish.priceMulti = 1;
		fish.breed = "Flounder";
		break;
		case 7:
		fish.priceMulti = 1;
		fish.breed = "Tuna";
		break;
		case 8:
		fish.priceMulti = 2;
		fish.breed = "Dogfish";
		break;
		case 9:
		fish.priceMulti = 1.5;
		fish.breed = "Catfish";
		break;
		case 10:
		fish.priceMulti = 1;
		fish.breed = "Bogfish";
		break;
	}

}

