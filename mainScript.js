	

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
	$("#buyTable").hide();
	$(".enemy").hide();
	$(".enemyImg").hide();
	$(".enemyGif").hide();
	$("#playerAvatar").hide();
	$("#battleWrapper").hide();
	
	updatePlayer = function(){
		console.log("updating player");
		document.getElementById("playerHealth").innerHTML = "Health: " + currentPlayerHP + "/" + playerMaxHealth;
		document.getElementById("playerStamina").innerHTML = "Stamina: " + currentPlayerStamina+ "/" + playerMaxStamina;
		document.getElementById("playerLevel").innerHTML = "Level: " + playerLevel +" ("+currentXp + "/" + xpUntilLevel+")";
		document.getElementById("playerHealthTop").innerHTML = "Health: " + currentPlayerHP+ "/" + playerMaxHealth;
		document.getElementById("cash").innerHTML = "Cash: " + cash;
		document.getElementById("red").innerHTML = "Red: " + account.Red;
		document.getElementById("yellow").innerHTML = "Yellow: " + account.Yellow;
		document.getElementById("blue").innerHTML = "Blue: " + account.Blue;
		if(currentPlayerHP <= 0 && !playerDeadFlag){
			playerDeadFlag = true;
			document.getElementById("skipBtn").disabled = true;
			setTimeout(playerDead,1000);
		}
	}
	updatePlayer();


	console.log("main function working")


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

	$("button").click(function(){
		updatePlayer();
	})

})