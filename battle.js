var currentEnemyHealth = 0;
var enemy = [];
var enemyMultiplier = "";
var enemyDeadFlag = false;
var playerDeadFlag = false;
var enemyMaxHealth = 1;
var playerAttacks = 0;
$(document).ready(function(){
	document.getElementById("playerStamina").innerHTML = "player: " + player.maxStamina + " Stamina";
    $("#attackBtn").click(function(){
    	attackEnemy();
    });
    $("#runBtn").click(function(){
    	fleeBattle();
    });
    $("#skipBtn").click(function(){
    	turnOver(3)
    	document.getElementById("skipBtn").disabled = true;
    	document.getElementById("attackBtn").disabled = true;
    	document.getElementById("runBtn").disabled = true;
    });
    $("#suicideBtn").click(function(){
    	
    	if(confirm("Are you sure you would like to die?")){
    		player.currentHealth = 0;
    		updatePlayer();
    	}
    	
    });
});
battleEvent = function(){
	
	playerAttacks = 0;
	clearInterval(autoTravelTimer);
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
	if(randomNum > 60){
		spawnEnemy("Gnome");

	}
	if(randomNum <=60 &&randomNum > 30 ){
		spawnEnemy("Goblin");
	}
	if(randomNum <= 30){
		spawnEnemy("Highwayman");	
	}
	
}
spawnEnemy = function(enemyName){
	$("#skull").hide();
	enemyDeadFlag = false;
	var enemyObject = enemyListObj[enemyName];
	document.getElementById("skipBtn").disabled = false;
	document.getElementById("runBtn").disabled = false;
	document.getElementById("attackBtn").disabled = false; 
	$(".enemyImg").hide();
	$(".enemyGif").hide();
	var enemyRarityInfo = enemyRarity();
	var rarity = enemyRarityInfo.rarity
	enemyMultiplier = enemyRarityInfo.multiplier;

	var maxPossibleHP = enemyObject.maxPossHP;
	var minPossibleHP = enemyObject.minPossHP;
	var enemyLevel = Math.floor((Math.random() * (enemyObject.maxLevel - enemyObject.minLevel) + enemyObject.minLevel) * enemyMultiplier);

	currentEnemyHealth = Math.floor((Math.random() * (maxPossibleHP - minPossibleHP) +minPossibleHP) * enemyMultiplier);
	enemyMaxHealth = currentEnemyHealth;
	enemy[0] = enemyName;
	enemy[1] = rarity;
	var id = "#" + enemyName;
	$(id).show();
	log(enemyObject.tagLine);
	log(enemyObject.name,"[",rarity,"]","is blocking the way!")
	updateEnemy();
	var enemyAnimationId = "#" + enemyObject.animation;
	var enemyLegendaryAnimationId = "#" + enemyObject.legendaryAnimation;
	if(enemyAnimationId != "#" && rarity != "Legendary"){
		$(enemyAnimationId).show();
	}
	if(enemyAnimationId != "#" && enemyLegendaryAnimationId == "#" && rarity == "Legendary"){
		$(enemyAnimationId).show();
	}
	if(enemyLegendaryAnimationId != "#" && rarity == "Legendary"){
		$(enemyLegendaryAnimationId).show();
	}
	if(enemyMultiplier > 2){
		console.log(enemyMultiplier)
		$("#skull").show();
	}
	
}
enemyRarity = function(){
	var randomNum = Math.floor((Math.random() * 1000) + 1);
	var enemyInfo = {
		rarity:"common",
		multiplier: 1,
	}
	if(randomNum >=500 && randomNum < 999){
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
	if(randomNum == 999){
		enemyInfo.rarity = "Well Done";
		enemyInfo.multiplier = 500;
	}
	return enemyInfo;

}
turnOver = function(staminaRegenMulti){
	document.getElementById("runBtn").disabled = true;
	document.getElementById("attackBtn").disabled = true; 
	document.getElementById("skipBtn").disabled = true;
	playerAttacks = 0;
	console.log(staminaRegenMulti,"stamina regen");
	setTimeout(enemyAttack,800,1);
	console.log("turn over, enemy attack starting soon...");
	if(staminaRegenMulti == undefined){
		staminaRegenMulti == 1;
	}
	if(player.currentStamina + player.staminaRegen * staminaRegenMulti >= player.maxStamina){
		player.currentStamina = player.maxStamina;
	}
	if(player.currentStamina + player.staminaRegen * staminaRegenMulti < player.maxStamina){
		player.currentStamina += player.staminaRegen * staminaRegenMulti;
	}
}
attackEnemy = function(){
	if(enemyDeadFlag){
		return;
	}
	if(player.currentStamina < player.weapon.staminaUsePerAttack * player.weapon.staminaUsePerAttackMulti){
		log("Not enough stamina!");
		return;
	}
	player.currentStamina -= player.weapon.staminaUsePerAttack * player.weapon.staminaUsePerAttackMulti;
	
	updatePlayer();
	var attackAnimVar = "#" + player.currentAttackAnimation;
	var gif=document.getElementById(player.currentAttackAnimation);
	gif.src=gif.src.replace(/\?.*/,function () {
      return '?'+new Date()
    })
	var damage = Math.floor((Math.random() * (player.maxDamagePerTurn - player.minDamagePerTurn) + player.minDamagePerTurn));
	currentEnemyHealth -= damage;
	log("You did", damage, "damage!");
	updateEnemy();
	
	
	if(currentEnemyHealth <= 0){
		document.getElementById("attackBtn").disabled = true; 
		document.getElementById("skipBtn").disabled = true; 
		document.getElementById("runBtn").disabled = true; 
		currentEnemyHealth = 0;
		updateEnemy();
		setTimeout(enemyDead,500);
		return;
	}
	playerAttacks++;
	if(playerAttacks >= player.weapon.attacksPerTurn){
		document.getElementById("attackBtn").disabled = true; 
		document.getElementById("skipBtn").disabled = true; 
		document.getElementById("runBtn").disabled = true; 
		turnOver();
	}
	
	
}
enemyAttack = function(regenMulti){
	
	var enemyAttackAnimation = enemyListObj[enemy[0]].animation;
	var enemyAnimationId = "#" + enemyListObj[enemy[0]].animation;
	var enemyLegendaryAnimation = enemyListObj[enemy[0]].legendaryAnimation;
	var enemyLegendaryAnimationId = "#" + enemyListObj[enemy[0]].legendaryAnimation;
	var rarity = enemy[1];
	if(enemyAnimationId != "#" && rarity != "Legendary" ){
		var gif=document.getElementById(enemyAttackAnimation);
		gif.src=gif.src.replace(/\?.*/,function () {
	      return '?'+new Date()
	    })
	}

	if(enemyAnimationId != "#" && rarity == "Legendary" && enemyLegendaryAnimationId == "#"){
		var gif=document.getElementById(enemyAttackAnimation);
		gif.src=gif.src.replace(/\?.*/,function () {
	      return '?'+new Date()
	    })
	}

	if(rarity == "Legendary" && enemyLegendaryAnimationId != "#"){
		var gif=document.getElementById(enemyLegendaryAnimation);
		gif.src=gif.src.replace(/\?.*/,function () {
	      return '?'+new Date()
	    })
	}

	var enemyMaxDmg = enemyListObj[enemy[0]].maxDmg * enemyMultiplier;
	var enemyMinDmg = enemyListObj[enemy[0]].minDmg *enemyMultiplier;
	var enemyDamage = Math.floor((Math.random() * (enemyMaxDmg - enemyMinDmg) +enemyMinDmg));
	player.currentHealth -= enemyDamage;
	log(enemy[0],"[",enemy[1],"]","did",enemyDamage ,"damage.");
	updatePlayer();
	if(player.currentHealth <= 0){
		player.currentHealth = 0;
		updatePlayer();
		return;
	}
	document.getElementById("skipBtn").disabled = false;
	document.getElementById("runBtn").disabled = false;
	document.getElementById("attackBtn").disabled = false; 
	updatePlayer();
}
fleeBattle = function(){
	log("You ran away!");
	
	$("#battleWrapper").hide();
	$("#endDay").show();
	$(".battleNav").hide();
	$("#travellingTitle").show();
	if(document.getElementById("autoTravel").checked){
			autoTravel();
	}
}
enemyDead = function(){
	$("#skull").hide();
	document.getElementById("attackBtn").disabled = true;
	enemyDeadFlag = true;
	$("#battleWrapper").hide();
	var id = "#" + enemyListObj[enemy[0]].name;
	$(id).hide();
	$(".battleNav").hide();
	$("#travellingTitle").show();
	var xpDrop = enemyListObj[enemy[0]].xpDrop * enemyMultiplier;
	player.currentXp += xpDrop;
	
	player.currentStamina = player.maxStamina;
	var enemyObject = enemyListObj[enemy[0]];
	console.log(enemyObject)
	var cashGained = Math.round((Math.random() * (enemyObject.maxCashDrop-enemyObject.minCashDrop)+ enemyObject.minCashDrop) * enemyMultiplier);
	cash += cashGained;
	log(enemy[0],"[",enemy[1],"]","has been killed!","You got",cashGained,"cash and",xpDrop, "xp!",);
	if(player.currentXp >= player.xpUntilLevel){
		
		log("Level up! You are now level",player.level + 1);
		levelUp();
		
	}
	if(document.getElementById("autoTravel").checked){
			autoTravel();
	}
	dayEnd();
}
playerDead = function(){ 
	var audio = new Audio('audio/death.mp3');
	audio.volume = 0.1;
	audio.play();
	$("#skull").hide();
	player.currentStamina = player.maxStamina;
	var id = "#" + enemyListObj[enemy[0]].name;
	$(id).hide();
	$("#battleWrapper").hide();
	$("#enemyHealth").hide();
	$(".player").hide();
	$(".battleNav").hide();
	$("#travelTable").show();
	$("#mapHome").show();
	$(".travelGridWrapper").show();
	var cashLoss = Math.floor(player.cash * .25);
	player.cash -= cashLoss;
	var xpLoss = Math.floor((player.xpUntilLevel-player.currentXp) *.25);
	console.log(player.prevXpUntilLevel-player.currentXp)
	if(player.prevXpUntilLevel == 0){
		xpLoss = Math.floor(player.currentXp * 0.25)
	}
	else{
		xpLoss = Math.floor((player.currentXp - player.prevXpUntilLevel) * .25)
	}
	player.currentXp -= xpLoss;
	if(xpLoss <= 1){
		log("You fell unconscious after a fierce battle with",enemy[0],"[",enemy[1],"]","and wake up at home with",cashLoss,"cash missing from your pockets.");

	}
	else{
		log("You fell unconscious after a fierce battle with",enemy[0],"[",enemy[1],"]","and wake up at home with",cashLoss,"cash missing from your pockets","and",xpLoss,"memories missing from your brain.");	
	}
	document.getElementById("autoTravel").disabled = false;
	player.currentHealth = player.maxHealth;
	currentLocation.locationX = 0;
	currentLocation.locationY = 0;
	travelTableUpdate();
	playerDeadFlag = false;
	updatePlayer();
}

updateEnemy = function(){
	document.getElementById("enemyHealth").innerHTML = "Health: " + currentEnemyHealth+ "/" + enemyMaxHealth;
}