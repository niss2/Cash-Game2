$(document).ready(function(){
    $("#buyRed").click(function(){
        var currentTradePartner2 = currentTradePartner.name;
        var price = objectOmega[currentTradePartner2].red.price;
        var totalStorage = objectOmega[currentTradePartner2].red.amount;
        if(amount == "max"){
            amount2 = cash/price;
        }
        if(price * amount2 <= cash){
            log("purchased", amount2, "red for", price * amount2);
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
        if(amount == "max"){
            amount2 = cash/price;
        }
        if(price * amount2 <= cash){
            log("purchased", amount2, "yellow for", price * amount2);
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
        if(amount == "max"){
            amount2 = cash/price;
        }
        if(price * amount2 <= cash){
            log("purchased", amount2, "blue for", price * amount2);
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
        if(amount == "max"){
            amount2 = account.red;
        }
        if(account.red >= amount2){
            log("sold", amount2, "red for", price * amount2);
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
        if(amount == "max"){
            amount2 = account.yellow;
        }
        if(account.yellow >= amount2){
            log("sold", amount2, "yellow for", price * amount2);
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
        if(amount == "max"){
            amount2 = account.blue;
        }
        if(account.blue >= amount2){
            log("sold", amount2, "blue for", price * amount2);
            account.blue -= amount2;
            cash += price * amount2;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
        updatePlayer(); 
    })

})
