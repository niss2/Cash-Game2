var objectOmega = 
{
    Scientists:  
    {
        blue: 
        {
            price: 110, 
            amount: 100,
            produce: 0,
            need: 2,
        },
        red: 
        {
            price: 90, 
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
    Caravan:
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
            price: 110, 
            amount: 100,
            produce: 0,
            need: 2,

        },
        yellow: 
        {
            price: 90, 
            amount: 1000,
            produce: 100,
            need: 0,
        },
    },
    Army: 
    {
        blue: 
        {
            price: 90, 
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
            price: 110, 
            amount: 100,
            produce: 0,
            need: 2
        }
    }
};

$(document).ready(function(){
    $("#buyRed").click(function(){
        var currentTradePartner2 = currentTradePartner.name;
        var price = objectOmega[currentTradePartner2].red.price;
        var totalStorage = objectOmega[currentTradePartner2].red.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = Math.floor(cash/price);
        }
        if(amount2 == 0){
            return;
        }
        if(price * amount2 <= cash){
            log("purchased", amount2, "red for", price * amount2," cash.");
            cash -= price * amount2;
            totalStorage -= amount2;
            account.red += amount2;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
        updatePlayer();
    })
    $("#buyYellow").click(function(){
        var currentTradePartner2 = currentTradePartner.name;
        var price = objectOmega[currentTradePartner2].yellow.price;
        var totalStorage = objectOmega[currentTradePartner2].yellow.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = Math.floor(cash/price);
        }
        if(amount2 == 0){
            return;
        }
        if(price * amount2 <= cash){
            log("purchased", amount2, "yellow for", price * amount2," cash.");
            cash -= price * amount2;
            totalStorage -= amount2;
            account.yellow += amount2;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
        updatePlayer();
    })
    $("#buyBlue").click(function(){
        var currentTradePartner2 = currentTradePartner.name;
        var price = objectOmega[currentTradePartner2].blue.price;
        var totalStorage = objectOmega[currentTradePartner2].blue.amount;
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
            log("purchased", amount2, "blue for", price * amount2," cash.");
            cash -= price * amount2;
            totalStorage -= amount2;
            account.blue += amount2;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
        updatePlayer();
    })
    $("#sellRed").click(function(){
        var currentTradePartner2 = currentTradePartner.name;
        var price = objectOmega[currentTradePartner2].red.price;
        var totalStorage = objectOmega[currentTradePartner2].red.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = account.red;
        }
        if(amount2 == 0){
            return;
        }
        if(account.red >= amount2){
            log("Sold", amount2, "red for", price * amount2," cash.");
            account.red -= amount2;
            cash += price * amount2;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
        updatePlayer();
    })
    $("#sellYellow").click(function(){
        var currentTradePartner2 = currentTradePartner.name;
        var price = objectOmega[currentTradePartner2].yellow.price;
        var totalStorage = objectOmega[currentTradePartner2].yellow.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = account.yellow;
        }
        if(amount2 == 0){
            return;
        }
        if(account.yellow >= amount2){
            log("Sold", amount2, "yellow for", price * amount2," cash.");
            account.yellow -= amount2;
            cash += price * amount2;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
        updatePlayer();
    })
    $("#sellBlue").click(function(){
        var currentTradePartner2 = currentTradePartner.name;
        var price = objectOmega[currentTradePartner2].blue.price;
        var totalStorage = objectOmega[currentTradePartner2].blue.amount;
        var amount2 = amount;
        
        if(amount == "max"){
            amount2 = account.blue;
        }
        if(amount2 == 0){
            return;
        }
        if(account.blue >= amount2){
            log("Sold", amount2, "blue for", price * amount2," cash.");
            account.blue -= amount2;
            cash += price * amount2;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
        updatePlayer(); 
    })
    buyTableUpdate = function(){
        var currentTradePartner2 = currentTradePartner.name;
        document.getElementById("redPrice").innerHTML = "price: " + objectOmega[currentTradePartner2].red.price;
        document.getElementById("yellowPrice").innerHTML = "price: " + objectOmega[currentTradePartner2].yellow.price;
        document.getElementById("bluePrice").innerHTML = "price: " + objectOmega[currentTradePartner2].blue.price;
    }

})
