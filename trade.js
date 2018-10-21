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
    $("#buyRed").click(function(){
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Red.price;
        var totalStorage = objectOmega[currentTradePartnerName].Red.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = Math.floor(cash/price);
        }
        if(amount2 == 0){
            return;
        }
        if(price * amount2 <= cash){
            log("Purchased", amount2, "Red for", price * amount2,"cash.");
            cash -= price * amount2;
            totalStorage -= amount2;
            account.Red += amount2;
            console.log("in loop", "cash:",cash,"Red:",account.Red,"Yellow:",account.Yellow,"Blue:",account.Blue);
        }
        updatePlayer();
    })
    $("#buyYellow").click(function(){
        console.log("attempting yellow buy")
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Yellow.price;
        var totalStorage = objectOmega[currentTradePartnerName].Yellow.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = Math.floor(cash/price);
        }
        if(amount2 == 0){
            return;
        }
        if(price * amount2 <= cash){
            log("Purchased", amount2, "Yellow for", price * amount2,"cash.");
            cash -= price * amount2;
            totalStorage -= amount2;
            account.Yellow += amount2;
            console.log("in loop", "cash:",cash,"Red:",account.Red,"Yellow:",account.Yellow,"Blue:",account.Blue);
        }
        updatePlayer();
    })
    $("#buyBlue").click(function(){
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Blue.price;
        var totalStorage = objectOmega[currentTradePartnerName].Blue.amount;
        var amount2 = amount;
        
        if(amount == "max"){

            amount2 = Math.floor(cash/price);
            console.log(amount2);
        }
        if(amount2 == 0){
            console.log("amount2 is zero");
            return;
        }
        if(price * amount2 <= cash){
            log("Purchased", amount2, "Blue for", price * amount2,"cash.");
            cash -= price * amount2;
            totalStorage -= amount2;
            account.Blue += amount2;
            console.log("in loop", "cash:",cash,"Red:",account.Red,"Yellow:",account.Yellow,"Blue:",account.Blue);
        }
        updatePlayer();
    })
    $("#sellRed").click(function(){
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Red.price;
        var totalStorage = objectOmega[currentTradePartnerName].Red.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = account.Red;
        }
        if(amount2 == 0){
            return;
        }
        if(account.Red >= amount2){
            log("Sold", amount2, "Red for", price * amount2,"cash.");
            account.Red -= amount2;
            cash += price * amount2;
            console.log("in loop", "cash:",cash,"Red:",account.Red,"Yellow:",account.Yellow,"Blue:",account.Blue);
        }
        updatePlayer();
    })
    $("#sellYellow").click(function(){
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Yellow.price;
        var totalStorage = objectOmega[currentTradePartnerName].Yellow.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = account.Yellow;
        }
        if(amount2 == 0){
            return;
        }
        if(account.Yellow >= amount2){
            log("Sold", amount2, "Yellow for", price * amount2,"cash.");
            account.Yellow -= amount2;
            cash += price * amount2;
            console.log("in loop", "cash:",cash,"Red:",account.Red,"Yellow:",account.Yellow,"Blue:",account.Blue);
        }
        updatePlayer();
    })
    $("#sellBlue").click(function(){
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Blue.price;
        var totalStorage = objectOmega[currentTradePartnerName].Blue.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = account.Blue;
        }
        if(amount2 == 0){
            return;
        }
        if(account.Blue >= amount2){
            log("Sold", amount2, "Blue for", price * amount2,"cash.");
            account.Blue -= amount2;
            cash += price * amount2;
            console.log("in loop", "cash:",cash,"Red:",account.Red,"Yellow:",account.Yellow,"Blue:",account.Blue);
        }
        updatePlayer(); 
    })
    buyTableUpdate = function(){
        var currentTradePartnerName = currentTradePartner.name;
        document.getElementById("redPrice").innerHTML = "price: " + objectOmega[currentTradePartnerName].Red.price;
        document.getElementById("yellowPrice").innerHTML = "price: " + objectOmega[currentTradePartnerName].Yellow.price;
        document.getElementById("bluePrice").innerHTML = "price: " + objectOmega[currentTradePartnerName].Blue.price;
    }

})
