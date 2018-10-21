var currentPlayerHP = playerMaxHealth;
var enemyHP = 0;
var enemy = [];
var currentPlayerStamina = playerMaxStamina;
var enemyMultiplier = "";
var enemyDeadFlag = false;

$(document).ready(function(){
	document.getElementById("playerStamina").innerHTML = "player: " + playerMaxStamina + " Stamina";
    $("#attackBtn").click(function(){
    	attackEnemy();
    });
    $("#runBtn").click(function(){
    	fleeBattle();
    });
    $("#skipBtn").click(function(){
    	var regenMulti = 3;
    	enemyAttack(regenMulti);
    });
});
battleEvent = function(){
	log("Battle!");
	$("#playerAvatar").show();
	enemyGen();
	$("#battleWrapper").show();
	$("#endDay").hide();
	$(".battleNav").show();
	$("#travellingTitle").hide();

}
enemyGen = function(){
	var randomNum = Math.floor((Math.random() * 100) + 1);

	$("#enemyHealth").show();
	$(".player").show();
	if(randomNum > 50){
		spawnEnemy("Gnome");

	}
	if(randomNum ==50){
		spawnEnemy("Gnome");
	}
	if(randomNum < 50){
		spawnEnemy("Highwayman");	
	}
	
}
spawnEnemy = function(enemyName){
	enemyDeadFlag = false;
	document.getElementById("runBtn").disabled = false;
	document.getElementById("attackBtn").disabled = false; 
	$(".enemyImg").hide();
	$(".enemyGif").hide();
	var enemyRarityInfo = enemyRarity();
	var rarity = enemyRarityInfo.rarity
	enemyMultiplier = enemyRarityInfo.multiplier;
	console.log(rarity," ",enemyMultiplier,"-------")

	var maxPossibleHP = enemyListObj[enemyName].maxPossHP;
	var minPossibleHP = enemyListObj[enemyName].minPossHP;
	console.log(minPossibleHP,maxPossibleHP);
	enemyHP = Math.floor((Math.random() * (maxPossibleHP - minPossibleHP) +minPossibleHP) * enemyMultiplier);
	enemy[0] = enemyName;
	enemy[1] = rarity;
	var id = "#" + enemyName;
	console.log("trying to display ", id);
	$(id).show();
	log(enemyListObj[enemyName].tagLine);
	log(enemyListObj[enemyName].name,"[",rarity,"]","is blocking the way!")
	updateEnemy();
	var ememyAnimationId = "#" + enemyListObj[enemy[0]].animation;
	var ememyLegendaryAnimationId = "#" + enemyListObj[enemy[0]].legendaryAnimation;
	console.log(rarity,ememyAnimationId,ememyLegendaryAnimationId);
	if(ememyAnimationId != "#" && rarity != "Legendary"){
		console.log("normal animation playing");
		$(ememyAnimationId).show();
	}
	if(ememyAnimationId != "#" && rarity == "Legendary"){
		console.log("legendary animation playing");
		$(ememyLegendaryAnimationId).show();
	}
	
}
enemyRarity = function(){
	var randomNum = Math.floor((Math.random() * 1000) + 1);
	var enemyInfo = {
		rarity:"common",
		multiplier: 1,
	}
	if(randomNum >=500){
		enemyInfo.rarity = "Common";
		enemyInfo.multiplier = 1;
	}
	if(randomNum < 500 && randomNum >= 200){
		enemyInfo.rarity = "Uncommon";
		enemyInfo.multiplier = 1.5;
	}
	if(randomNum < 60 && randomNum >= 1){
		enemyInfo.rarity = "Medium Rare";
		enemyInfo.multiplier = 2;
	}
	if(randomNum < 200 && randomNum >= 100){
		enemyInfo.rarity = "Rare";
		enemyInfo.multiplier = 3;
	}
	if(randomNum < 100 && randomNum >= 75){
		enemyInfo.rarity = "Ultra-Rare";
		enemyInfo.multiplier = 6;
	}
	if(randomNum < 75 && randomNum >= 65){
		enemyInfo.rarity = "Mythical";
		enemyInfo.multiplier = 10;
	}
	if(randomNum < 65 && randomNum >= 60){
		enemyInfo.rarity = "Legendary";
		enemyInfo.multiplier = 50;
	}
	return enemyInfo;

}
attackEnemy = function(){
	if(enemyDeadFlag){
		console.log("enemy is dead");
		return;
	}
	currentPlayerStamina -= staminaUsePerAttack * staminaUsePerAttackMulti;
	if(currentPlayerStamina < staminaUsePerAttack * staminaUsePerAttackMulti){
		log("Not enough stamina!");
		return;
	}
	var attackAnimVar = "#" + currentAttackAnimation;
	var gif=document.getElementById(currentAttackAnimation);
	console.log(gif);
	gif.src=gif.src.replace(/\?.*/,function () {
      return '?'+new Date()
    })
	var damage = Math.floor((Math.random() * (maxDamagePerTurn - minDamagePerTurn) + minDamagePerTurn));
	enemyHP -= damage;
	log("You did", damage, "damage!");
	updateEnemy(enemyHP);
	
	document.getElementById("attackBtn").disabled = true; 
	document.getElementById("runBtn").disabled = true; 
	if(enemyHP <= 0){
		enemyHP = 0;
		updateEnemy();
		setTimeout(enemyDead,1000);
		return;
	}
	
	setTimeout(enemyAttack,300,1);
}
enemyAttack = function(regenMulti){
	console.log(regenMulti, playerStaminaRegen)
	if(currentPlayerStamina + playerStaminaRegen * regenMulti >= 100){
		currentPlayerStamina = 100;
	}else{currentPlayerStamina += playerStaminaRegen*regenMulti;}
	
	var enemyAttackAnimation = enemyListObj[enemy[0]].animation;
	var ememyAnimationId = "#" + enemyListObj[enemy[0]].animation;
	var ememyLegendaryAnimation = enemyListObj[enemy[0]].legendaryAnimation;
	var ememyLegendaryAnimationId = "#" + enemyListObj[enemy[0]].legendaryAnimation;
	var rarity = enemy[1];
	console.log(rarity);
	if(ememyAnimationId !== "#" && rarity != "Legendary"){
		console.log(enemyAttackAnimation,"is now playing-----");
		
		var gif=document.getElementById(enemyAttackAnimation);
		console.log(gif);
		gif.src=gif.src.replace(/\?.*/,function () {
	      return '?'+new Date()
	    })
	}
	if(ememyAnimationId !== "#" && rarity == "Legendary"){
		console.log("legendary animation is now playing-----");
		var gif=document.getElementById(ememyLegendaryAnimation);
		console.log(gif);
		gif.src=gif.src.replace(/\?.*/,function () {
	      return '?'+new Date()
	    })
	}

	var enemyMaxDmg = enemyListObj[enemy[0]].maxDmg * enemyMultiplier;
	var enemyMinDmg = enemyListObj[enemy[0]].minDmg *enemyMultiplier;
	var enemyDamage = Math.floor((Math.random() * (enemyMaxDmg - enemyMinDmg) +enemyMinDmg));
	currentPlayerHP -= enemyDamage;
	log(enemy[0],"[",enemy[1],"]","did",enemyDamage ,"damage.");
	updatePlayer();
	if(currentPlayerHP <= 0){
		setTimeout(playerDead,1000,enemy,enemyMultiplier);
		return;
	}
	enemyTurnOver = function(){
		document.getElementById("runBtn").disabled = false;
		document.getElementById("attackBtn").disabled = false; 
	}
	setTimeout(enemyTurnOver,500);

}
fleeBattle = function(){
	log("You ran away!");
	$("#battleWrapper").hide();
	$("#endDay").show();
	$(".battleNav").hide();
	$("#travellingTitle").show();
}
enemyDead = function(){
	document.getElementById("attackBtn").disabled = true;
	enemyDeadFlag = true;
	$("#battleWrapper").hide();
	var id = "#" + enemyListObj[enemy[0]].name;
	$(id).hide();
	$(".battleNav").hide();
	$("#travellingTitle").show();
	var xpDrop = enemyListObj[enemy[0]].xpDrop;
	currentXp += xpDrop * enemyMultiplier;
	console.log("gained xp",xpDrop);
	if(currentXp >= xpUntilLevel){
		playerLevel +=1;
		log("Level up! You are now level",playerLevel);
		xpUntilLevel = 75 * playerLevel + 0.05*(75*playerLevel)
	}
	currentPlayerStamina = playerMaxStamina;
	var cashGained = Math.floor((Math.random() * 50) + 50) * enemyMultiplier;
	cash += cashGained;
	log(enemy[0],"[",enemy[1],"]","has been killed!","You got",cashGained,"cash and",xpDrop, "xp!",);
	dayEnd();
}
playerDead = function(){ 
	currentPlayerStamina = playerMaxStamina;
	var id = "#" + enemyListObj[enemy[0]].name;
	$(id).hide();
	$("#battleWrapper").hide();
	$("#enemyHealth").hide();
	$(".player").hide();
	$(".battleNav").hide();
	$("#travelTable").show();
	$("#mapHome").show();
	$(".travelGridWrapper").show();
	halfCash = cash * .5;
	cash -= Math.floor(halfCash);
	log("You fell unconscious after a fierce battle with",enemy[0],"[",enemy[1],"]","and wake up at home with",halfCash,"cash missing from your pockets.");
	currentPlayerHP = playerMaxHealth;
	currentLocation.locationX = 0;
	currentLocation.locationY = 0;
	travelTableUpdate();
	updatePlayer();
}

updateEnemy = function(){
	document.getElementById("enemyHealth").innerHTML = "Health: " + enemyHP;
}