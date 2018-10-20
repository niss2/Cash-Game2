	

$(document).ready(function(){
	$(".buy").hide();
	$("#attackBtn").hide();
	$(".sell").hide();
	$(".navigation").hide();
	$(".currentTrade").hide();
	$(".title").hide();
	$(".buyAmount").hide();
	$(".mapImage").hide();
	$("#mapHome").show();
	$("#buyTable").hide();
	$(".enemy").hide();
	$("#battleWrapper").hide();
	
	updatePlayer = function(){
		console.log("updating player");
		document.getElementById("playerHealth").innerHTML = "player: " + currentPlayerHP + " health";
		document.getElementById("playerHealthTop").innerHTML = "Health: " + currentPlayerHP;
		document.getElementById("cash").innerHTML = "Cash: " + cash;
		document.getElementById("red").innerHTML = "Red: " + account.red;
		document.getElementById("yellow").innerHTML = "Yellow: " + account.yellow;
		document.getElementById("blue").innerHTML = "Blue: " + account.blue;
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