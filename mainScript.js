
var objectOmega = 
{
	scientists:  
	{
		blue: 
		{
			price: 200, 
			amount: 100,
			produce: 0,
			need: 2,
		},
		red: 
		{
			price: 40, 
			amount: 1000,
			produce: 100,
			need: 0,
		},
		yellow: 
		{
			price: 100, 
			amount: 500,
			produce: 10,
			need: 0.5,
		}
	},
	caravan:
	{
		blue: 
		{
			price: 100, 
			amount: 500,
			produce: 10,
			need: .5,

		},
		red: 
		{
			price: 200, 
			amount: 100,
			produce: 0,
			need: 2,

		},
		yellow: 
		{
			price: 40, 
			amount: 1000,
			produce: 100,
			need: 0,
		},
	},
	army: 
	{
		blue: 
		{
			price: 40, 
			amount: 1000,
			produce: 100,
			need: 0,

		},
		red: 
		{
			price: 100, 
			amount: 500,
			produce: 10,
			need: .5,
		},
		yellow: 
		{
			price: 200, 
			amount: 100,
			produce: 0,
			need: 2
		}
 	}
};	

$(document).ready(function(){
	$(".buy").hide();
	$(".sell").hide();
	$(".navigation").hide();
	$(".currentTrade").hide();
	$(".title").hide();
	$(".buyAmount").hide();
	$(".mapImage").hide();
	$("#mapHome").show();
	updatePlayer = function(){
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