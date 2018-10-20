var currentPlayerHP = maxHealth;
var enemyHP = 0;
var enemy = "";
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
	console.log("setting timerrunning to 0");

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
	console.log("enemyGen: ",randomNum);
	$("#enemyHealth").show();
	$(".player").show();
	console.log("randomNum from enemyGen is",randomNum);
	if(randomNum > 50){
		$("#gnome").show();
		// var audio = new Audio('audio/gnomedLong.mp3');
		// audio.play();
		enemy = "gnome";
		enemyHP = enemyListObj.gnome.maxHP;
		log(enemyListObj.gnome.tagLine);
		updateEnemy(enemyHP);
	}
	if(randomNum < 51){
		$("#highwayman").show();
		enemy = "highwayman";
		enemyHP = enemyListObj.highwayman.maxHP;
		log(enemyListObj.highwayman.tagLine);
		updateEnemy(enemyHP);
	}
	var attackTimer = enemyListObj[enemy].attackInterval;
	enemyAttackTimer = window.setInterval(enemyAttack, attackTimer);
	var attackTimer = enemyListObj[enemy].attackInterval;
	var enemyAttackAnimation = "#" + enemyListObj[enemy].animation;
	if(enemyAttackAnimation !== "#"){
		console.log(enemyAttackAnimation,"is now playing-----");
		$(enemyAttackAnimation).show();
	}
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




enemyAttack = function(){
	var enemyMaxDmg = enemyListObj[enemy].maxDmg;
	var enemyMinDmg = enemyListObj[enemy].minDmg;
	var enemyDamage = Math.floor((Math.random() * (enemyMaxDmg - enemyMinDmg) +enemyMinDmg));
	currentPlayerHP -= enemyDamage;
	log(enemy,"did ",enemyDamage ,"damage");
	updatePlayer();
	if(currentPlayerHP <= 0){
		playerDead();
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
	currentPlayerStamina = playerMaxStamina;
	var cashGained = Math.floor((Math.random() * 100) + 1);
	log(enemy,"has been killed!","You got",cashGained,"cash from his corpse!");
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
	log("You died to", enemy,"and lost",halfCash,"cash");
	currentPlayerHP = maxHealth;
	currentLocation.locationX = 0;
	currentLocation.locationY = 0;
	travelTableUpdate();
}

updateEnemy = function(){
	document.getElementById("enemyHealth").innerHTML = "enemy: " + enemyHP + " health";
}