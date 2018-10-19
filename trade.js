$(document).ready(function(){
    $("#buyRed").click(function(){
        var price = objectOmega[currentTradePartner].red.price;
        var totalStorage = objectOmega[currentTradePartner].red.amount;
        if(amount == "max"){
            amount = cash/price;
        }
        if(price * amount <= cash){
            log("purchased", amount, "red for", price * amount);
            cash -= price * amount;
            totalStorage -= amount;
            account.red += amount;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
    })
    $("#buyYellow").click(function(){
        var price = objectOmega[currentTradePartner].yellow.price;
        var totalStorage = objectOmega[currentTradePartner].yellow.amount;
        if(amount == "max"){
            amount = cash/price;
        }
        if(price * amount <= cash){
            log("purchased", amount, "yellow for", price * amount);
            cash -= price * amount;
            totalStorage -= amount;
            account.yellow += amount;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
    })
    $("#buyBlue").click(function(){
        var price = objectOmega[currentTradePartner].blue.price;
        var totalStorage = objectOmega[currentTradePartner].blue.amount;
        if(amount == "max"){
            amount = cash/price;
        }
        if(price * amount <= cash){
            log("purchased", amount, "blue for", price * amount);
            cash -= price * amount;
            totalStorage -= amount;
            account.blue += amount;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
    })
    $("#sellRed").click(function(){
        var price = objectOmega[currentTradePartner].red.price;
        var totalStorage = objectOmega[currentTradePartner].red.amount;
        if(amount == "max"){
            amount = account.red;
        }
        if(account.red >= amount){
            log("sold", amount, "red for", price * amount);
            account.red -= amount;
            cash += price * amount;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
    })
    $("#sellYellow").click(function(){
        var price = objectOmega[currentTradePartner].yellow.price;
        var totalStorage = objectOmega[currentTradePartner].yellow.amount;
        if(amount == "max"){
            amount = account.yellow;
        }
        if(account.yellow >= amount){
            log("sold", amount, "yellow for", price * amount);
            account.yellow -= amount;
            cash += price * amount;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
    })
    $("#sellBlue").click(function(){
        var price = objectOmega[currentTradePartner].blue.price;
        var totalStorage = objectOmega[currentTradePartner].blue.amount;
        if(amount == "max"){
            amount = account.blue;
        }
        if(account.blue >= amount){
            log("sold", amount, "blue for", price * amount);
            account.blue -= amount;
            cash += price * amount;
            console.log("in loop", "cash:",cash,"red:",account.red,"yellow:",account.yellow,"blue:",account.blue);
        }
    })   
})
