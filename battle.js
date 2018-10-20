var currentPlayerHP = playerMaxHealth;
var enemyHP = 0;
var enemy = [];
var currentPlayerStamina = playerMaxStamina;
var playerRegenTimer = "";
var checkStaminaTimer = "";
var enemyAttackTimer = "";
var timerRunning = 0;
$(document).ready(function(){
	document.getElementById("playerStamina").innerHTML = "player: " + playerMaxStamina + " Stamina";
    $("#attackBtn").click(function(){
    	attackEnemy();
    });
});
battleEvent = function(){
	timerRunning = 0;
	checkStaminaTimer = window.setInterval(checkStamina, 10,timerRunning);
	log("Battle!");
	enemyGen();
	$("#battleWrapper").show();
	document.getElementById("playerStamina").innerHTML = "player: " + Math.floor(currentPlayerStamina) + " Stamina";
	$("#endDay").hide();
	$("#attackBtn").show();
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
spawnEnemy = function(enemyName,){
	var enemyRarityInfo = enemyRarity();
	var rarity = enemyRarityInfo.rarity
	var enemyMultiplier = enemyRarityInfo.multiplier;
	console.log(rarity," ",enemyMultiplier,"-------")

	enemyHP = enemyListObj[enemyName].maxHP;
	var id = "#" + enemyName;
	$(id).show();
	enemy[0] = enemyName;
	enemy[1] = rarity;
	log(enemyListObj[enemyName].tagLine);
	updateEnemy();
	var attackTimer = enemyListObj[enemy[0]].attackInterval;
	enemyAttackTimer = window.setInterval(enemyAttack, attackTimer,enemy,enemyMultiplier);
	var attackTimer = enemyListObj[enemy[0]].attackInterval;
	var enemyAttackAnimation = "#" + enemyListObj[enemy[0]].animation;
	if(enemyAttackAnimation !== "#"){
		console.log(enemyAttackAnimation,"is now playing-----");
		$(enemyAttackAnimation).show();
	}
}
enemyRarity = function(){
	var randomNum = Math.floor((Math.random() * 1000) + 1);
	var enemyInfo = {
		rarity:"common",
		multiplier: 1,
	}
	if(randomNum >=500){
		enemyInfo.rarity = "common";
		enemyInfo.multiplier = 1;
	}
	if(randomNum < 500 && randomNum >= 200){
		enemyInfo.rarity = "uncommon";
		enemyInfo.multiplier = 1.5;
	}
	if(randomNum < 200 && randomNum >= 100){
		enemyInfo.rarity = "Rare";
		enemyInfo.multiplier = 3;
	}
	if(randomNum < 100 && randomNum >= 75){
		enemyInfo.rarity = "ultra-rare";
		enemyInfo.multiplier = 6;
	}
	if(randomNum < 75 && randomNum >= 65){
		enemyInfo.rarity = "mythical";
		enemyInfo.multiplier = 10;
	}
	if(randomNum < 65 && randomNum >= 60){
		enemyInfo.rarity = "legendary";
		enemyInfo.multiplier = 50;
	}
	if(randomNum < 60 && randomNum >= 1){
		enemyInfo.rarity = "Medium Rare";
		enemyInfo.multiplier = 2;
	}
	return enemyInfo;

}
attackEnemy = function(){
	if(currentPlayerStamina < staminaUsePerAttack * staminaUsePerAttackMulti){
		log("Not enough stamina!");
		return;
	}
	var attackAnimVar = "#" + currentAttackAnimation;
	$(attackAnimVar).show();
	var gif=document.getElementById(currentAttackAnimation);
	console.log(gif);
	gif.src=gif.src.replace(/\?.*/,function () {
      return '?'+new Date()
    })
	var damage = Math.floor((Math.random() * (maxDamagePerTurn - minDamagePerTurn) + minDamagePerTurn));
	enemyHP -= damage;
	log("You did", damage, "damage!");
	updateEnemy(enemyHP);
	currentPlayerStamina -= staminaUsePerAttack * staminaUsePerAttackMulti;
	console.log(staminaUsePerAttack * staminaUsePerAttackMulti)
	if(enemyHP <= 0){
		enemyDead();
		return;
	}
}
checkStamina = function(){
	if(currentPlayerStamina < playerMaxStamina && timerRunning == 0){
		
		timerRunning++;

		playerRegenTimer = window.setInterval(regenerateStamina, 10);
	}
	if(currentPlayerStamina >= playerMaxStamina){
		clearInterval(playerRegenTimer);
		timerRunning = 0;
	}
}


regenerateStamina = function(){
	currentPlayerStamina += playerStaminaRegen;
	document.getElementById("playerStamina").innerHTML = "player: " + Math.floor(currentPlayerStamina) + " Stamina";
}




enemyAttack = function(enemy,multi){
	var enemyMaxDmg = enemyListObj[enemy[0]].maxDmg * multi;
	var enemyMinDmg = enemyListObj[enemy[0]].minDmg * multi;
	var enemyDamage = Math.floor((Math.random() * (enemyMaxDmg - enemyMinDmg) +enemyMinDmg));
	currentPlayerHP -= enemyDamage;
	log(enemy[0],"[",enemy[1],"]","did ",enemyDamage ,"damage.");
	updatePlayer();
	if(currentPlayerHP <= 0){
		playerDead(enemy,multi);
		return;
	}

}
enemyDead = function(){
	clearInterval(playerRegenTimer);
	clearInterval(checkStaminaTimer);
	clearInterval(enemyAttackTimer);
	$("#enemyHealth").hide();
	$(".player").hide();
	$(".enemy").hide();
	$("#attackBtn").hide();
	$("#travellingTitle").show();
	var xpDrop = enemyListObj[enemy[0]].xpDrop;
	currentXp += xpDrop;
	console.log("gained xp",xpDrop);
	if(currentXp >= xpUntilLevel){
		console.log("Level up!")
		playerLevel +=1;
		xpUntilLevel = 75 * playerLevel + 0.05*(75*playerLevel)
	}
	currentPlayerStamina = playerMaxStamina;
	var cashGained = Math.floor((Math.random() * 100) + 1);
	cash += cashGained;
	log(enemy[0],"[",enemy[1],"]","has been killed!","You got",cashGained,"credits and",xpDrop, "xp!",);
	dayEnd();
}
playerDead = function(){
	clearInterval(playerRegenTimer);
	clearInterval(checkStaminaTimer);
	clearInterval(enemyAttackTimer);
	currentPlayerStamina = playerMaxStamina;
	$("#enemyHealth").hide();
	$(".player").hide();
	$(".enemy").hide();
	$("#attackBtn").hide();
	$("#travelTable").show();
	$("#mapHome").show();
	$(".travelGridWrapper").show();
	halfCash = cash * .5;
	cash -= Math.floor(halfCash);
	log("You died to",enemy[0],"[",enemy[1],"]","and lost",halfCash,"cash");
	currentPlayerHP = playerMaxHealth;
	currentLocation.locationX = 0;
	currentLocation.locationY = 0;
	travelTableUpdate();
	updatePlayer();
}

updateEnemy = function(){
	document.getElementById("enemyHealth").innerHTML = "enemy: " + enemyHP + " health";
}