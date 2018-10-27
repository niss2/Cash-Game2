$(document).ready(function(){
	$(".buy").hide();
	$(".battleNav").hide();
	$(".sell").hide();
	$(".navigation").hide();
	$(".currentTrade").hide();
	$(".title").hide();
	$(".buyAmount").hide();
	$(".mapImage").hide();
	$("#mapHome").show();
	$("#commodityBuyTable").hide();
	$(".enemy").hide();
	$(".enemyImg").hide();
	$(".enemyGif").hide();
	$("#playerAvatar").hide();
	$("#battleWrapper").hide();
	$("#storeBackBtn").hide();
	$(".storeList").hide();
	$(".store").hide();
	$(".devTool").hide();
	document.getElementById("mainOutput").innerHTML = "";
	updatePlayer = function(){
		player.spaceUsed = player.account.Red + player.account.Blue + player.account.Yellow;
		player.spaceLeft = player.totalSpace - player.spaceUsed;
		player.maxDamagePerTurn = (player.weapon.maxDamage) + player.attackMulti;
		player.minDamagePerTurn = (player.weapon.minDamage) + player.attackMulti;
		player.avgDamagePerTurn = (player.maxDamagePerTurn + player.minDamagePerTurn) / 2

		console.log("updating player");
		document.getElementById("playerHealth").innerHTML = "Health: " + player.currentHealth + "/" + player.maxHealth;
		document.getElementById("playerStamina").innerHTML = "Stamina: " + player.currentStamina+ "/" + player.maxStamina;
		document.getElementById("playerLevel").innerHTML = "Level: " + player.level +" ("+player.currentXp + "/" + player.xpUntilLevel+")";
		document.getElementById("playerHealthTop").innerHTML = "Health: " + player.currentHealth+ "/" + player.maxHealth;
		document.getElementById("cash").innerHTML = "Cash: " + player.cash;
		document.getElementById("space").innerHTML = "Space: " + player.spaceUsed + "/" + player.totalSpace;
		document.getElementById("red").innerHTML = "Red: " + player.account.Red;
		document.getElementById("yellow").innerHTML = "Yellow: " + player.account.Yellow;
		document.getElementById("blue").innerHTML = "Blue: " + player.account.Blue;
		document.getElementById("playerDamage").innerHTML = player.avgDamagePerTurn;
		document.getElementById("playerWeaponWeightClass").innerHTML = player.weapon.weightClass;
		document.getElementById("playerWeaponRarity").innerHTML = player.weapon.rarity;
		document.getElementById("playerWeaponLevel").innerHTML = player.weapon.level;
		document.getElementById("playerWeaponAttacksPerTurn").innerHTML = player.weapon.attacksPerTurn;
		if(player.currentXp >= player.xpUntilLevel){
			levelUp();
		}
		if(player.currentHealth <= 0 && !playerDeadFlag){
			playerDeadFlag = true;
			document.getElementById("skipBtn").disabled = true;
			setTimeout(playerDead,1000);
		}
		console.log(player);
	}
	updatePlayer();


	console.log("main function working")
	$("#devToolBtn").click(function(){
		$(".devTool").show();
	})
	$("#skipTravel").click(function(){
		travelHack = !travelHack;
	})
	$("#addCash").click(function(){
		player.cash += 100000;
	})
	$("#toggleStats").click(function(){
		
    	$(".statsGrid").toggle();
    	
    })

    $("#1xbuy").click(function(){
    	amount = 1;
    })
    $("#5xbuy").click(function(){
    	amount = 5;
    })
    $("#10xbuy").click(function(){
    	amount = 10;
    })
    $("#50xbuy").click(function(){
    	amount = 50;
    })
    $("#100xbuy").click(function(){
    	amount = 100;
    })
    $("#maxbuy").click(function(){
    	amount = "max";
    })
    $("#back").click(function(){
    	$(".trade").show();
    	$(".buy").hide();
    	$(".sell").hide();
    	$("#back").hide();
    	$(".currentTrade").hide();
    })



})