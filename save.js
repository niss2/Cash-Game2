$(document).ready(function(){
	$("#saveBtn").click(function(){

		localStorage.setItem("saveData",JSON.stringify(player))
		console.log("saving....")
	})
	$("#loadBtn").click(function(){
		player = JSON.parse(localStorage.getItem("saveData"));
		console.log(player)
		updatePlayer();
	})
})
// var player = {
// 	account: {
// 		Red: 0,
// 		Blue: 0,
// 		Yellow: 0
// 	},
// 	cash: 1000,
// 	amount: 1,
// 	currentWeight: 0,
// 	totalSpace: 10,
// 	spaceUsed: 0,
// 	level: 1,
// 	currentXp: 0,
// 	travelMultiplier: 1,
// 	maxHealth: 100,
// 	maxStamina: 100,
// 	staminaRegen: 5,
// 	staminaUsePerAttack: 20,
// 	currentTradePartner: "",
// 	weaponMulti: 1,
// 	attackMulti: level * 5,
// 	maxDamagePerTurn: 10 + attackMulti * weaponMulti,
// 	minDamagePerTurn: 7.5 + attackMulti * weaponMulti,
// 	critChance: 0,
// 	staminaUsePerAttackMulti: 1,
// 	currentAttackAnimation: "playerAttackStickGif",
// 	idleAnimation:"playerAttackStickIdle"

// };
// console.log(player.level)
// xpUntilLevel: Math.round(75 * playerLevel + 0.50*(150*playerLevel)); 

// levelUp = function(){
// 	player.level +=1;
// 	audio = new Audio('audio/levelup.mp3');
// 	audio.volume = 0.1;
// 	audio.play();
// 	player.maxHealth = 100 + playerLevel * (playerLevel *5);
// 	player.staminaRegen += 5;
// 	player.maxStamina += 5;
// 	attackMulti = playerLevel * 5;
// 	playerMaxDamagePerTurn = 10 + attackMulti * weaponMulti;
// 	playerMinDamagePerTurn = 7.5 + attackMulti * weaponMulti;
// 	xpUntilLevel = Math.round(75 * playerLevel + 0.50*(150*playerLevel)); 
// 	playerCurrentHP == playerMaxHealth;


// }


