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
});
battleEvent = function(){
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
spawnEnemy = function(enemyName){
	enemyDeadFlag = false;
	document.getElementById("attackBtn").disabled = false; 
	$(".enemyImg").hide();
	$(".enemyGif").hide();
	var enemyRarityInfo = enemyRarity();
	var rarity = enemyRarityInfo.rarity
	enemyMultiplier = enemyRarityInfo.multiplier;
	console.log(rarity," ",enemyMultiplier,"-------")


	enemyHP = enemyListObj[enemyName].maxHP * enemyMultiplier;
	enemy[0] = enemyName;
	enemy[1] = rarity;
	var id = "#" + enemyName;
	console.log("trying to display ", id);
	$(id).show();
	log(enemyListObj[enemyName].tagLine);
	updateEnemy();
	var ememyAnimationId = "#" + enemyListObj[enemy[0]].animation;
	if(ememyAnimationId !== "#"){
		$(ememyAnimationId).show();
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
	if(enemyDeadFlag){
		console.log("enemy is dead");
		return;
	}
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
	currentPlayerStamina -= staminaUsePerAttack * staminaUsePerAttackMulti;
	console.log(staminaUsePerAttack * staminaUsePerAttackMulti)
	document.getElementById("attackBtn").disabled = true; 
	if(enemyHP <= 0){
		enemyHP = 0;
		updateEnemy();
		setTimeout(enemyDead,1000);
		return;
	}
	currentPlayerStamina += 20;
	
	setTimeout(enemyAttack,300);
}



enemyAttack = function(){
	var enemyAttackAnimation = enemyListObj[enemy[0]].animation;
	var ememyAnimationId = "#" + enemyListObj[enemy[0]].animation;

	if(ememyAnimationId !== "#"){
		console.log(enemyAttackAnimation,"is now playing-----");
		$(ememyAnimationId).show();
		var gif=document.getElementById(enemyAttackAnimation);
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
		playerDead(enemy,enemyMultiplier);
		return;
	}
	enemyTurnOver = function(){
		document.getElementById("attackBtn").disabled = false; 
	}
	setTimeout(enemyTurnOver,500);

}

enemyDead = function(){
	document.getElementById("attackBtn").disabled = true;
	enemyDeadFlag = true;
	$("#battleWrapper").hide();
	var id = "#" + enemyListObj[enemy[0]].name;
	$(id).hide();
	$("#attackBtn").hide();
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
	var cashGained = Math.floor((Math.random() * 20) + 1) * enemyMultiplier;
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
	$("#attackBtn").hide();
	$("#travelTable").show();
	$("#mapHome").show();
	$(".travelGridWrapper").show();
	halfCash = cash * .5;
	cash -= Math.floor(halfCash);
	log("You fell unconscious after a fierce battle with",enemy[0],"[",enemy[1],"]","and wake up at home with",halfCash,"cash missing.");
	currentPlayerHP = playerMaxHealth;
	currentLocation.locationX = 0;
	currentLocation.locationY = 0;
	travelTableUpdate();
	updatePlayer();
}

updateEnemy = function(){
	document.getElementById("enemyHealth").innerHTML = "enemy: " + enemyHP + " health";
}