$(document).ready(function(){
    $("#attackBtn").click(function(){
    	attackEnemy();
    });
});
var currentPlayerHP = maxHealth;
var enemyHP = 0;
var enemy = "";
battleEvent = function(day){
	log("Battle!");
	enemyGen();
	$("#endDay").hide();
	$("#attackBtn").show();
	$("#travellingTitle").hide();
	
}
enemyGen = function(){
	var randomNum = Math.floor((Math.random() * 100) + 1);
	console.log("enemyGen: ",randomNum);
	$("#enemyHealth").show();
	$("#playerHealth").show();
	console.log("randomNum from enemyGen is",randomNum);
	if(randomNum > 50){
		$("#gnome").show();
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
}
attackEnemy = function(){
	var damage = Math.floor((Math.random() * (maxDamagePerTurn - minDamagePerTurn) + minDamagePerTurn));
	enemyHP -= damage;
	log("You did", damage, "damage!");
	updateEnemy(enemyHP);
	if(enemyHP <= 0){
		enemyDead();
		return;
	}
	enemyAttack();

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
	$("#enemyHealth").hide();
	$("#playerHealth").hide();
	$(".enemy").hide();
	$("#attackBtn").hide();
	$("#travellingTitle").show();
	var cashGained = Math.floor((Math.random() * 100) + 1);
	log(enemy,"has been killed!","You got",cashGained,"cash from his corpse!");
	dayEnd();
}
playerDead = function(){
	$("#enemyHealth").hide();
	$("#playerHealth").hide();
	$(".enemy").hide();
	$("#attackBtn").hide();
	$("#travelTable").show();
	$("#mapHome").show();
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