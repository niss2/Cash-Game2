var account = {red: 0, blue: 0, yellow: 0};
var cash = 100;
var amount = 1;

var playerLevel = 1;
var currentXp = 0;
var xpUntilLevel = 75 * playerLevel + 0.05*(75*playerLevel); 

var weaponMulti = 1;
var attackMulti = playerLevel * 5;

var currentTradePartner = "";

var playerMaxHealth = 100;
var playerMaxStamina = 100;
var playerStaminaRegen = 5;
var staminaUsePerAttack = 20;

var maxDamagePerTurn = 10 + attackMulti;
var minDamagePerTurn = 7.5 + attackMulti;
var critChance = 0;

var staminaUsePerAttackMulti = 1;
var currentAttackAnimation = "playerAttackStickGif";
var playerIdle = "playerAttackStickIdle";
