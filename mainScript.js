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
	$("#characterWrapper").hide();
	$("#inventoryCloseBtn").hide();
	$("#tradeTravelWrapper").hide();
	$("#skillTravelWrapper").hide();
	$("#tradeTravelTitle").hide();
	$("#skillTravelTitle").hide();
	$("#fishingWrapper").hide();
	document.getElementById("mainOutput").innerHTML = "";
	updatePlayer = function(){
		player.spaceUsed = player.account.Red + player.account.Blue + player.account.Yellow;
		player.spaceLeft = player.totalSpace - player.spaceUsed;
		player.maxDamagePerTurn = (player.weapon.maxDamage) + player.attackMulti;
		player.minDamagePerTurn = (player.weapon.minDamage) + player.attackMulti;
		player.avgDamagePerTurn = (player.maxDamagePerTurn + player.minDamagePerTurn) / 2

		console.log("updating player");
		console.log(player.currentStamina,"stamina")
		document.getElementById("playerHealth").innerHTML = "Health: " + player.currentHealth + "/" + player.maxHealth;
		document.getElementById("playerHealthBar").value = player.currentHealth/player.maxHealth*100;
		document.getElementById("playerStaminaBar").value = player.currentStamina/player.maxStamina*100;
		document.getElementById("playerStamina").innerHTML = "Stamina: " + player.currentStamina+ "/" + player.maxStamina;
		document.getElementById("playerLevel").innerHTML = "Level: " + player.level +" ("+player.currentXp + "/" + player.xpUntilLevel+")";
		document.getElementById("playerHealthTop").innerHTML = "Health: " + player.currentHealth+ "/" + player.maxHealth;
		document.getElementById("cash").innerHTML = "Cash: " + player.cash;
		document.getElementById("space").innerHTML = "Space: " + player.spaceUsed + "/" + player.totalSpace;
		document.getElementById("red").innerHTML = "Red: " + player.account.Red;
		document.getElementById("yellow").innerHTML = "Yellow: " + player.account.Yellow;
		document.getElementById("blue").innerHTML = "Blue: " + player.account.Blue;
		document.getElementById("playerDamage").innerHTML = player.avgDamagePerTurn;
		document.getElementById("playerWeaponType").innerHTML = player.weapon.spec;
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
	}
	updatePlayer();

	$(".button").click(function(){
		updatePlayer();
	})
	$("#tradeTravelBtn").click(function(){
		$("#travelOptions").hide();
		$("#tradeTravelWrapper").show();
		$("#travelOptionsBackBtn").show();
		$("#travelOptionsTitle").hide();
		$("#tradeTravelTitle").show();
	})
	$("#skillTravelBtn").click(function(){
		$("#travelOptions").hide();
		$("#skillTravelWrapper").show();
		$("#travelOptionsBackBtn").show();
		$("#travelOptionsTitle").hide();
		$("#skillTravelTitle").hide();
		$("#skillTravelTitle").show();
	})
	$("#travelOptionsBackBtn").click(function(){
		$("#travelOptions").show();
		$("#skillTravelWrapper").hide();
		$("#travelOptionsBackBtn").hide();
		$("#tradeTravelWrapper").hide();
		$("#travelOptionsTitle").show();
		$("#tradeTravelTitle").hide();
		$("#skillTravelTitle").hide();
	})
	console.log("main function working")
	$("#devToolBtn").click(function(){
		$(".devTool").show();
	})
	$("#skipTravel").click(function(){
		travelHackSave();
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


$("#submitInput").click(function(){
	var intData00 = []
	var str = [];
	var input = $("#textIn").val();
	var split = input.split("");
	for(var i = 0;i < input.length;i++){

		str[i] = split[i];
		if(i+1%4 == 0){
			data00[i] = str[0] + (str[1] * 22) + (str[2] * 0x10000) + (str[3] * 0x1000000);
		}
	}
	console.log(input,intData00)
})

})
