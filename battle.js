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
	var randomNum = Math.floor((Math.random() * 10) + 1);
	console.log("enemyGen: ",randomNum);
	$("#enemyHealth").show();
	$("#playerHealth").show();
	if(randomNum >= 1){
		$("#gnome").show();
		enemy = "gnome";
		enemyHP = enemyListObj.gnome.maxHP;
		log(enemyListObj.gnome.tagLine);
		updateEnemy(enemyHP);
	}
	else{
		enemy = "goblin";
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
	halfCash = cash * .5;
	cash -= Math.floor(halfCash);
	log("You died to", enemy,"and lost",halfCash,"cash");
	currentLocationX = 0;
	currentLocationY = 0;
}
enemyAttack = function(){
	var enemyDamage = Math.floor((Math.random() * (enemyListObj.gnome.maxDmg - enemyListObj.gnome.minDmg) + enemyListObj.gnome.minDmg));
	currentPlayerHP -= enemyDamage;
	log(enemy,"did ",enemyDamage ,"damage");
	updatePlayer();
	if(currentPlayerHP <= 0){
		playerDead();
		return;
	}

}
updateEnemy = function(){
	document.getElementById("enemyHealth").innerHTML =  enemyHP + " health";
}