var objectOmega = 
{
    Scientists:  
    {
        Blue: 
        {
            price: 110, 
            amount: 100,
            produce: 0,
            need: 2,
        },
        Red: 
        {
            price: 90, 
            amount: 1000,
            produce: 100,
            need: 0,
        },
        Yellow: 
        {
            price: 100, 
            amount: 500,
            produce: 10,
            need: 0.5,
        }
    },
    Caravan:
    {
        Blue: 
        {
            price: 100, 
            amount: 500,
            produce: 10,
            need: .5,

        },
        Red: 
        {
            price: 110, 
            amount: 100,
            produce: 0,
            need: 2,

        },
        Yellow: 
        {
            price: 90, 
            amount: 1000,
            produce: 100,
            need: 0,
        },
    },
    Army: 
    {
        Blue: 
        {
            price: 90, 
            amount: 1000,
            produce: 100,
            need: 0,

        },
        Red: 
        {
            price: 100, 
            amount: 500,
            produce: 10,
            need: .5,
        },
        Yellow: 
        {
            price: 110, 
            amount: 100,
            produce: 0,
            need: 2
        }
    }
};

$(document).ready(function(){
    $("#commodityBuyTable").hide();
    $("#CommodityStoreBtn").click(function(){
        $("#commodityBuyTable").show();
        $(".store").hide();
    })
    $("#buyRed").click(function(){
        player.spaceLeft = player.totalSpace-player.spaceUsed;
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Red.price;
        var locationStock = objectOmega[currentTradePartnerName].Red.amount;
        var amount2 = amount;
        if(amount2 > player.spaceLeft){
            amount2 = "max";
        }
        if(amount2 == "max"){
            amount2 = player.cash/price;
            if(amount2 > player.spaceLeft){
                amount2 = player.spaceLeft
            }
        }
        if(amount2 * price > player.cash){
            amount2 = player.cash/price;
        }
        if(locationStock < amount2){
            log("Not enough stock at location");
            return;
        }
        if(amount2 == 0){
            return;
        }
        if(locationStock >= amount2){
            objectOmega[currentTradePartnerName].Red.amount - amount2;
            player.account.Red += amount2;
            player.cash -= price * amount2;
            console.log(amount2)
            log("Purchased ", amount2 , "Red for" , price*amount2 , "cash at", price,"each.");
            updatePlayer();
        }

    })
    $("#buyYellow").click(function(){
        console.log("attempting yellow buy")
        player.spaceLeft = player.totalSpace-player.spaceUsed;
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Yellow.price;
        var locationStock = objectOmega[currentTradePartnerName].Yellow.amount;
        var amount2 = amount;
         if(amount2 > player.spaceLeft){
            amount2 = "max";
        }
        if(amount2 == "max"){
            amount2 = player.cash/price;
            if(amount2 > player.spaceLeft){
                amount2 = player.spaceLeft
            }
        }
        if(amount2 * price > player.cash){
            amount2 = player.cash/price;
        }
        if(locationStock < amount2){
            log("Not enough stock at location");
            return;
        }
        if(amount2 == 0){
            return;
        }
        if(locationStock >= amount2){
            objectOmega[currentTradePartnerName].Yellow.amount - amount2;
            player.account.Yellow += amount2;
            player.cash -= price * amount2;
            log("Purchased", amount2, "Yellow for",  price*amount2, "cash at", price,"each.");
            updatePlayer();
        }
    })
    $("#buyBlue").click(function(){
        player.spaceLeft = player.totalSpace-player.spaceUsed;
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Blue.price;
        var locationStock = objectOmega[currentTradePartnerName].Blue.amount;
        var amount2 = amount;
        if(amount2 > player.spaceLeft){
            amount2 = "max";
        }
        if(amount2 == "max"){
            amount2 = player.cash/price;
            if(amount2 > player.spaceLeft){
                amount2 = player.spaceLeft
            }
        }
        if(amount2 * price > player.cash){
            amount2 = player.cash/price;
        }
        if(locationStock < amount2){
            log("Not enough stock at location");
            return;
        }
        if(amount2 == 0){
            return;
        }
        if(locationStock >= amount2){
            objectOmega[currentTradePartnerName].Blue.amount - amount2;
            player.account.Blue += amount2;
            player.cash -= price * amount2;
            log("Purchased", amount2 , "Blue for", price*amount2 , " cash at", price,"each.");
            updatePlayer();
        }
    })
    $("#sellRed").click(function(){
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Red.price;
        var amount2 = amount;
        if(amount2 > player.account.Red){
            console.log("amount > account");
            amount2 = player.account.Red;
        }
        if(amount2 == "max"){
            amount2 = player.account.Red;
        }
        if(amount2 == 0){
            return;
        }
        player.account.Red -= amount2;
        player.cash += price * amount2;
        objectOmega[currentTradePartnerName].Red.amount += amount2;
        log("Sold ", amount2 , " Red for", price * amount2 ,"cash at", price,"each.");
        updatePlayer();
    })
    $("#sellYellow").click(function(){
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Red.price;
        var amount2 = amount;
        if(amount2 > player.account.Yellow){
            console.log("amount > account");
            amount2 = "max";
        }
        if(amount2 == "max"){
            amount2 = player.account.Yellow;
        }
        if(amount2 == 0){
            return;
        }
        player.account.Yellow -= amount2;
        player.cash += price * amount2;
        objectOmega[currentTradePartnerName].Yellow.amount += amount2;
        log("Sold ", amount2 , " Yellow for", price * amount2 ,"cash at", price,"each.");
        updatePlayer();
    })
    $("#sellBlue").click(function(){
       var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Red.price;
        var amount2 = amount;
        if(amount2 > player.account.Blue){
            console.log("amount > account");
            amount2 = "max";
        }
        if(amount2 == "max"){
            amount2 = player.account.Blue;
        }
        if(amount2 == 0){
            return;
        }
        player.account.Blue -= amount2;
        player.cash += price * amount2;
        objectOmega[currentTradePartnerName].Blue.amount += amount2;
        log("Sold ", amount2 , " Blue for", price * amount2 ,"cash at", price,"each.");
        updatePlayer();
    })
    buyTableUpdate = function(){
        var currentTradePartnerName = currentTradePartner.name;
        document.getElementById("redPrice").innerHTML = "price: " + objectOmega[currentTradePartnerName].Red.price;
        document.getElementById("yellowPrice").innerHTML = "price: " + objectOmega[currentTradePartnerName].Yellow.price;
        document.getElementById("bluePrice").innerHTML = "price: " + objectOmega[currentTradePartnerName].Blue.price;
    }

})
