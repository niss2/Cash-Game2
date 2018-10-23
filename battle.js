var currentPlayerHP = playerMaxHealth;
var currentEnemyHealth = 0;
var enemy = [];
var currentPlayerStamina = playerMaxStamina;
var enemyMultiplier = "";
var enemyDeadFlag = false;
var playerDeadFlag = false;
var enemyMaxHealth = 0;
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
    	document.getElementById("skipBtn").disabled = true;
    	document.getElementById("attackBtn").disabled = true;
    	document.getElementById("runBtn").disabled = true;
    });
});
battleEvent = function(){
	clearInterval(autoTravelTimer);
	$("#playerAvatar").show();
	enemyGen();
	$("#battleWrapper").show();
	$("#endDay").hide();
	$(".battleNav").show();
	$("#travellingTitle").hide();

}
enemyGen = function(){
	var randomNum = Math.floor((Math.random() * 1000) + 1);
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
	document.getElementById("skipBtn").disabled = false;
	document.getElementById("runBtn").disabled = false;
	document.getElementById("attackBtn").disabled = false; 
	$(".enemyImg").hide();
	$(".enemyGif").hide();
	var enemyRarityInfo = enemyRarity();
	var rarity = enemyRarityInfo.rarity
	enemyMultiplier = enemyRarityInfo.multiplier;

	var maxPossibleHP = enemyListObj[enemyName].maxPossHP;
	var minPossibleHP = enemyListObj[enemyName].minPossHP;

	currentEnemyHealth = Math.floor((Math.random() * (maxPossibleHP - minPossibleHP) +minPossibleHP) * enemyMultiplier);
	enemyMaxHealth = currentEnemyHealth;
	enemy[0] = enemyName;
	enemy[1] = rarity;
	var id = "#" + enemyName;
	$(id).show();
	log(enemyListObj[enemyName].tagLine);
	log(enemyListObj[enemyName].name,"[",rarity,"]","is blocking the way!")
	updateEnemy();
	var ememyAnimationId = "#" + enemyListObj[enemy[0]].animation;
	var ememyLegendaryAnimationId = "#" + enemyListObj[enemy[0]].legendaryAnimation;
	if(ememyAnimationId != "#" && rarity != "Legendary"){
		$(ememyAnimationId).show();
	}
	if(ememyAnimationId != "#" && rarity == "Legendary"){
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
		return;
	}
	if(currentPlayerStamina < staminaUsePerAttack * staminaUsePerAttackMulti){
		log("Not enough stamina!");
		return;
	}
	currentPlayerStamina -= staminaUsePerAttack * staminaUsePerAttackMulti;
	
	updatePlayer();
	var attackAnimVar = "#" + currentAttackAnimation;
	var gif=document.getElementById(currentAttackAnimation);
	gif.src=gif.src.replace(/\?.*/,function () {
      return '?'+new Date()
    })
	var damage = Math.floor((Math.random() * (playerMaxDamagePerTurn - playerMinDamagePerTurn) + playerMinDamagePerTurn));
	currentEnemyHealth -= damage;
	log("You did", damage, "damage!");
	updateEnemy();
	
	document.getElementById("attackBtn").disabled = true; 
	document.getElementById("skipBtn").disabled = true; 
	document.getElementById("runBtn").disabled = true; 
	if(currentEnemyHealth <= 0){
		currentEnemyHealth = 0;
		updateEnemy();
		setTimeout(enemyDead,1000);
		return;
	}
	
	setTimeout(enemyAttack,300,1);
}
enemyAttack = function(regenMulti){
	if(currentPlayerStamina + playerStaminaRegen * regenMulti >= 100){
		currentPlayerStamina = 100;
	}else{currentPlayerStamina += playerStaminaRegen*regenMulti;}
	
	var enemyAttackAnimation = enemyListObj[enemy[0]].animation;
	var ememyAnimationId = "#" + enemyListObj[enemy[0]].animation;
	var ememyLegendaryAnimation = enemyListObj[enemy[0]].legendaryAnimation;
	var ememyLegendaryAnimationId = "#" + enemyListObj[enemy[0]].legendaryAnimation;
	var rarity = enemy[1];

	if(ememyAnimationId !== "#" && rarity != "Legendary"){
		var gif=document.getElementById(enemyAttackAnimation);
		gif.src=gif.src.replace(/\?.*/,function () {
	      return '?'+new Date()
	    })
	}
	if(ememyAnimationId !== "#" && rarity == "Legendary"){
		var gif=document.getElementById(ememyLegendaryAnimation);
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
		currentPlayerHP = 0;
		updatePlayer();
		return;
	}
	enemyTurnOver = function(){
		document.getElementById("runBtn").disabled = false;
		document.getElementById("attackBtn").disabled = false; 
		document.getElementById("skipBtn").disabled = false;
	}
	setTimeout(enemyTurnOver,500);
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

	document.getElementById("attackBtn").disabled = true;
	enemyDeadFlag = true;
	$("#battleWrapper").hide();
	var id = "#" + enemyListObj[enemy[0]].name;
	$(id).hide();
	$(".battleNav").hide();
	$("#travellingTitle").show();
	var xpDrop = enemyListObj[enemy[0]].xpDrop * enemyMultiplier;
	currentXp += xpDrop;
	
	currentPlayerStamina = playerMaxStamina;
	var cashGained = Math.round((Math.random() * 50) + 50 * enemyMultiplier);
	cash += cashGained;
	log(enemy[0],"[",enemy[1],"]","has been killed!","You got",cashGained,"cash and",xpDrop, "xp!",);
	if(currentXp >= xpUntilLevel){
		playerLevel +=1;
		log("Level up! You are now level",playerLevel);
		levelUp();
		
	}
	if(document.getElementById("autoTravel").checked){
			autoTravel();
	}
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
	var cashLoss = Math.floor(cash * .25);
	cash -= cashLoss;
	var xpLoss = Math.floor(currentXp *.25);
	currentXp -= xpLoss;
	if(xpLoss < 2){
		log("You fell unconscious after a fierce battle with",enemy[0],"[",enemy[1],"]","and wake up at home with",cashLoss,"cash missing from your pockets.");

	}
	else{
		log("You fell unconscious after a fierce battle with",enemy[0],"[",enemy[1],"]","and wake up at home with",cashLoss,"cash missing from your pockets","\n","and",xpLoss,"memories missing from your brain.");	
	}
	document.getElementById("autoTravel").disabled = false;
	currentPlayerHP = playerMaxHealth;
	currentLocation.locationX = 0;
	currentLocation.locationY = 0;
	travelTableUpdate();
	playerDeadFlag = false;
	updatePlayer();
}

updateEnemy = function(){
	document.getElementById("enemyHealth").innerHTML = "Health: " + currentEnemyHealth+ "/" + enemyMaxHealth;
}