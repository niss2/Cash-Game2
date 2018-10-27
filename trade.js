var itemList;
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
        $(".storeList").hide();
        $("#storeBackBtn").show();
    })
    $("#storeBackBtn").click(function(){
        $(".storeList").show();
        $(".store").hide();
        $("#storeBackBtn").hide();
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
            amount2 = Math.floor(player.cash/price);
            if(amount2 > player.spaceLeft){
                amount2 = player.spaceLeft
            }
        }
        if(amount2 * price > player.cash){
            amount2 = Math.floor(player.cash/price);
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
            log("Purchased ", amount2 , "Red for" , price*amount2 , "cash at", price,"each.");
            updatePlayer();
        }

    })
    $("#buyYellow").click(function(){
        player.spaceLeft = player.totalSpace-player.spaceUsed;
        var currentTradePartnerName = currentTradePartner.name;
        var price = objectOmega[currentTradePartnerName].Yellow.price;
        var locationStock = objectOmega[currentTradePartnerName].Yellow.amount;
        var amount2 = amount;
         if(amount2 > player.spaceLeft){
            amount2 = "max";
        }
        if(amount2 == "max"){
            amount2 = Math.floor(player.cash/price);
            if(amount2 > player.spaceLeft){
                amount2 = player.spaceLeft
            }
        }
        if(amount2 * price > player.cash){
            amount2 = Math.floor(player.cash/price);
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
            amount2 = Math.floor(player.cash/price);
            if(amount2 > player.spaceLeft){
                amount2 = player.spaceLeft
            }
        }
        if(amount2 * price > player.cash){
            amount2 = Math.floor(player.cash/price);
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
    $("#armyGeneralStoreBtn").click(function(){
        itemList = generateArmyStore();
        $("#armyGeneralStore").show();
        $(".storeList").hide();
        $("#storeBackBtn").show();
    })
    $("#armyGeneralItem1Btn").click(function(){
        buyCheck(1)
    })
    $("#armyGeneralItem2Btn").click(function(){
        buyCheck(2)
    })
    $("#armyGeneralItem3Btn").click(function(){
        buyCheck(3)
    })
    $("#armyGeneralItem4Btn").click(function(){
        buyCheck(4)
    })
    $("#armyGeneralItem5Btn").click(function(){
        buyCheck(5)
    })
})
buyCheck = function(num){
    var id = "item" + num
    var object = itemList[id];
    if(player.cash >= object.price){
        player.weapon.spec = object.spec;
        player.weapon.weightClass = object.weightClass;
        player.weapon.maxDamage = object.maxDamage;
        player.weapon.minDamage = object.minDamage;
        player.weapon.weight = object.weight;
        player.weapon.level = object.level;
        player.weapon.staminaUsePerAttack = object.staminaUse;
        player.weapon.attacksPerTurn = object.attacksPerTurn;


        log(object.weightClass,"[",object.rarity,"]","purchased for", object.price,)
        player.cash -= object.price;
        updatePlayer();
    }
}
var itemList = {
        item1: {
        },
        item2: {
        },
        item3: {
        },
        item4: {
        },
        item5: {
        }
    }
generateArmyStore = function(){
    
    for(var i = 1;i < 6;i++){
        var item = "item" + i
        itemList[item] = weaponGen();
        var damagePerTurn = itemList[item].maxDamage * itemList[item].attacksPerTurn;
        itemList[item].price = Math.round((damagePerTurn * (itemList[item].multiplier *(itemList[item].level*.25)) /player.level)*100);
        var priceId = "weaponItem" + i + "Price";
        var typeId = "weaponItem" + i + "Type";
        var damageId = "weaponItem" + i + "Damage";
        var rarityId = "weaponItem" + i + "Rarity";
        var levelId = "weaponItem" + i + "Level";
        var weightClassId = "weaponItem" + i + "WeightClass";
        var weightId = "weaponItem" + i + "Weight";
        var staminaUseId = "weaponItem" + i + "StaminaUse";
        document.getElementById(priceId).innerHTML = itemList[item].price;
        document.getElementById(typeId).innerHTML = itemList[item].spec;
        document.getElementById(damageId).innerHTML = Math.round((itemList[item].maxDamage + itemList[item].minDamage)/2);
        var rarityElem = document.getElementById(rarityId);
        var itemRarity = itemList[item].rarity;
        if(itemRarity == "Poor"){
            rarityElem.style = "color: grey;"
        }
        if(itemRarity == "Average"){
            rarityElem.style = "color: darkgreen;"
        }
        if(itemRarity == "Military"){
            rarityElem.style = "color: teal;"
        }
        if(itemRarity == "Superior"){
            rarityElem.style = "color: magenta;"
        }
        if(itemRarity == "Artifact"){
            rarityElem.style = "color: firebrick;"
        }
        if(itemRarity == "Masterwork"){
            rarityElem.style = "color: darkorange;"
        }
        if(itemRarity == "Legendary"){
            rarityElem.style = "color: gold;"
        }
        if(itemRarity == "God"){
            rarityElem.style = "color: red;"
        }
        rarityElem.innerHTML = itemRarity;
        
        document.getElementById(levelId).innerHTML = itemList[item].level;
        document.getElementById(weightClassId).innerHTML = itemList[item].weightClass;
        document.getElementById(weightId).innerHTML = itemList[item].weight + "kg";
        document.getElementById(staminaUseId).innerHTML = itemList[item].staminaUse;
    }
    return itemList;
}
weaponGen = function(){
        var weapon = {

        }

        weapon.level = Math.floor(Math.random() * ((player.level+4)-(player.level))+ player.level);
        var itemInfo = itemRarityGen()
        weapon.rarity = itemInfo.rarity;
        weapon.multiplier = itemInfo.multiplier;
        weightClassNum = Math.floor(Math.random() * 3 + 1);
        var type;
        if(weightClassNum == 1){
            var weightClass = "Light";
            var maxWeight = 5;
            var minWeight = 2;
            var attacksPerTurn = 3;
            var typeNum = Math.floor(Math.random()* 5 + 1);
            switch(typeNum){
                case 1:
                type = "Wooden Staff";
                break;
                case 2:
                type = "Handwraps";
                break;
                case 3:
                type = "Boxing Gloves";
                break;
                case 4:
                type = "Dagger";
                break;
                case 5:
                type = "Wooden Sword";
                break;
            }
        }
        if(weightClassNum == 2){
            var weightClass = "Medium";
            var maxWeight = 8;
            var minWeight = 5;
            var attacksPerTurn = 2;
            var typeNum = Math.floor(Math.random()* 5 + 1);
            switch(typeNum){
                case 1:
                type = "Shortsword";
                break;
                case 2:
                type = "Scimitar";
                break;
                case 3:
                type = "Scythe";
                break;
                case 4:
                type = "Saber";
                break;
                case 5:
                type = "Katana";
                break;
            }
        }
        if(weightClassNum == 3){
            var weightClass = "Heavy";
            var maxWeight = 10;
            var minWeight = 17;
            var attacksPerTurn = 1;
            var typeNum = Math.floor(Math.random()* 5 + 1);
            switch(typeNum){
                case 1:
                type = "Greatsword";
                break;
                case 2:
                type = "Ultra-Greatsword";
                break;
                case 3:
                type = "Zweihander";
                break;
                case 4:
                type = "Claymore";
                break;
                case 5:
                type = "Great Hammer";
                break;
            }
        }

        weapon.weight = Math.floor(Math.random() * (maxWeight-minWeight)+minWeight);
        weapon.maxDamage = weapon.weight * weapon.level * weapon.multiplier;
        weapon.minDamage = Math.round(weapon.maxDamage * .90); 
        weapon.weightClass = weightClass;
        weapon.staminaUse = weapon.weight*2;
        weapon.attacksPerTurn = attacksPerTurn;
        weapon.spec = type;
        return weapon;
        
}

itemRarityGen = function(){
    var randomNum = Math.floor((Math.random() * 1000) + 1);
    var itemInfo = {
        rarity:"common",
        multiplier: 1,
    }
    if(randomNum >=500 && randomNum < 999){
        itemInfo.rarity = "Poor";
        itemInfo.multiplier = 1;
    }
    if(randomNum < 500 && randomNum >= 200){
        itemInfo.rarity = "Average";
        itemInfo.multiplier = 1.5;
    }
    if(randomNum < 60 && randomNum >= 1){
        itemInfo.rarity = "Military";
        itemInfo.multiplier = 2;
    }
    if(randomNum < 200 && randomNum >= 100){
        itemInfo.rarity = "Superior";
        itemInfo.multiplier = 3;
    }
    if(randomNum < 100 && randomNum >= 75){
        itemInfo.rarity = "Artifact";
        itemInfo.multiplier = 6;
    }
    if(randomNum < 75 && randomNum >= 65){
        itemInfo.rarity = "Masterwork";
        itemInfo.multiplier = 10;
    }
    if(randomNum < 65 && randomNum >= 60){
        itemInfo.rarity = "Legendary";
        itemInfo.multiplier = 20;
    }
    if(randomNum == 999){
        itemInfo.rarity = "God";
        itemInfo.multiplier = 500;
    }
    return itemInfo;

}