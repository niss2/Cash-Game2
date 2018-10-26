var player = {
	account: {
		Red: 0,
		Blue: 0,
		Yellow: 0
	},
	cash: 1000,
	amount: 1,
	currentWeight: 0,
	totalSpace: 10,
	spaceUsed: 0,
	level: 1,
	currentXp: 149,
	travelMultiplier: 1,
	maxHealth: 100,
	maxStamina: 100,
	staminaRegen: 5,
	staminaUsePerAttack: 20,
	currentTradePartner: "",
	weaponMulti: 1,
	attackMulti: 5,
	critChance: 0,
	staminaUsePerAttackMulti: 1,
	currentAttackAnimation: "playerAttackStickGif",
	idleAnimation:"playerAttackStickIdle"

};
player.currentHealth = player.maxHealth;
player.currentStamina = player.maxStamina;
player.attackMulti = player.level * 5;
player.maxDamagePerTurn = 10 + player.attackMulti * player.weaponMulti;
player.minDamagePerTurn = 7.5 + player.attackMulti * player.weaponMulti;

console.log(player.maxDamagePerTurn)
player.xpUntilLevel = Math.round(75 * player.level + 0.50*(150*player.level)); 
player.prevXpUntilLevel = 0;
levelUp = function(){
	player.prevXpUntilLevel = player.xpUntilLevel;
	player.level +=1;
	audio = new Audio('audio/levelup.mp3');
	audio.volume = 0.1;
	audio.play();
	player.maxHealth = 100 + player.level * (player.level *5);
	player.staminaRegen += 5;
	player.maxStamina += 5;
	player.attackMulti = player.level * 5;
	player.maxDamagePerTurn = 10 + player.attackMulti * player.weaponMulti;
	player.minDamagePerTurn = 7.5 + player.attackMulti * player.weaponMulti;
	player.xpUntilLevel = Math.round(75 * player.level + 0.50*(150*player.level)); 
	player.currentHealth = player.maxHealth;


}