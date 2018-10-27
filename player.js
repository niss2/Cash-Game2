var player = {
	account: {
		Red: 0,
		Blue: 0,
		Yellow: 0
	},
	cash: 300,
	currentWeight: 0,
	totalSpace: 10,
	spaceUsed: 0,
	level: 1,
	currentXp: 0,
	travelMultiplier: 1,
	maxHealth: 100,
	maxStamina: 100,
	staminaRegen: 5,
	currentTradePartner: "",
	weaponMulti: 1,
	attackMulti: 5,
	critChance: 0,
	staminaUsePerAttackMulti: 1,
	currentAttackAnimation: "playerAttackStickGif",
	idleAnimation:"playerAttackStickIdle",
	weapon: {
		type: "stick",
		weightClass: "Light",
		weight: 5,
		rarity: "common",
		level: 1,
		maxDamage: 6,
		minDamage: 4,
		attacksPerTurn: 2,
		staminaUsePerAttack: 10,
		staminaUsePerAttackMulti: 1
	}

};
player.spaceLeft = player.totalSpace - player.spaceUsed;

player.currentHealth = player.maxHealth;
player.currentStamina = player.maxStamina;

player.attackMulti = player.level * 7;
player.maxDamagePerTurn =(player.weapon.maxDamage) + player.attackMulti;
player.minDamagePerTurn = (player.weapon.minDamage) + player.attackMulti;
player.avgDamagePerTurn = (player.maxDamagePerTurn + player.minDamagePerTurn) / 2


player.xpUntilLevel = Math.round(75 * player.level + 0.50*(150*player.level)); 
player.prevXpUntilLevel = 0;

var amount = 1;

levelUp = function(){
	player.prevXpUntilLevel = player.xpUntilLevel;
	player.level +=1;
	audio = new Audio('audio/levelup.mp3');
	audio.volume = 0.05;
	audio.play();
	player.maxHealth = 100 + player.level * (player.level *5);
	player.staminaRegen += 5;
	player.maxStamina += 5;
	player.attackMulti = player.level * 7;
	player.maxDamagePerTurn =	(player.weapon.maxDamage) + player.attackMulti;
	player.minDamagePerTurn = 	(player.weapon.minDamage) + player.attackMulti;
	player.xpUntilLevel = Math.round(75 * player.level + 0.50*(150*player.level)); 
	player.currentHealth = player.maxHealth;
	player.currentStamina = player.maxStamina;
	updatePlayer();

}

// var default = {
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
// 	currentXp: 149,
// 	travelMultiplier: 1,
// 	maxHealth: 100,
// 	maxStamina: 100,
// 	staminaRegen: 5,
// 	staminaUsePerAttack: 20,
// 	currentTradePartner: "",
// 	weaponMulti: 1,
// 	attackMulti: 5,
// 	critChance: 0,
// 	staminaUsePerAttackMulti: 1,
// 	currentAttackAnimation: "playerAttackStickGif",
// 	idleAnimation:"playerAttackStickIdle"

// };
// default.currentHealth = default.maxHealth;
// default.currentStamina = default.maxStamina;
// default.attackMulti = default.level * 5;
// default.maxDamagePerTurn = 10 + default.attackMulti * default.weaponMulti;
// default.minDamagePerTurn = 7.5 + default.attackMulti * default.weaponMulti;

// default.xpUntilLevel = Math.round(75 * default.level + 0.50*(150*default.level)); 
// default.prevXpUntilLevel = 0;