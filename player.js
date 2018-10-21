var account = {Red: 0, Blue: 0, Yellow: 0};
var cash = 100;
var amount = 1;

var playerLevel = 1;
var currentXp = 0;

var xpUntilLevel = Math.round(75 * playerLevel + 0.20*(150*playerLevel)); 

var currentTradePartner = "";

var playerMaxHealth = 100;
var playerMaxStamina = 100;
var playerStaminaRegen = 5;
var staminaUsePerAttack = 20;

var weaponMulti = 1;
var attackMulti = playerLevel * 5;
var playerMaxDamagePerTurn = 10 + attackMulti * weaponMulti;
var playerMinDamagePerTurn = 7.5 + attackMulti * weaponMulti;
var critChance = 0;

levelUp = function(){
	playerMaxHealth = playerMaxHealth + (playerLevel * 7);
	playerStaminaRegen += 5;
	playerMaxStamina += 5;
	attackMulti = playerLevel * 5;
	playerMaxDamagePerTurn = 10 + attackMulti * weaponMulti;
	playerMinDamagePerTurn = 7.5 + attackMulti * weaponMulti;
	xpUntilLevel = Math.round(75 * playerLevel + 0.20*(150*playerLevel)); 

}


var staminaUsePerAttackMulti = 1;
var currentAttackAnimation = "playerAttackStickGif";
var playerIdle = "playerAttackStickIdle";
