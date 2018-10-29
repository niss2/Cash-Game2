$(document).ready(function(){
	$("#inventoryBtn").click(function(){
		$("#characterWrapper").show();
		$(".grid-container").hide();
		$("#inventoryWrapper").show();
		$("#inventoryCloseBtn").show();
	})
	$("#inventoryCloseBtn").click(function(){
		$("#characterWrapper").hide();
		$(".grid-container").show();
		$("#inventoryWrapper").hide();
		$("#inventoryCloseBtn").hide();
	})
})
var inventory = {
}

inventoryBuild = function(){
	var slots = player.totalSpace;
	for(var i = 1 ;i <= slots;i++){
		console.log("E");
		var inventorySlot = "inventorySlot" + i;
		var inventorySlotId = "#inventorySlot" + i;
		$(inventorySlotId).show();
		inventory[inventorySlot] = {
			empty: true
		};
	}
	console.log(inventory)
}
setTimeout(inventoryBuild,300);
itemAcquire = function(item){
	var slots = player.totalSpace;
	for(var i = 1 ;i <= slots;i++){
		var inventorySlot = "inventorySlot" + i;
		console.log("YEET",inventory[inventorySlot])
		if(inventory[inventorySlot].empty){
			console.log("found slot to place item:",inventorySlot)
			inventory[inventorySlot] = item;
			inventory[inventorySlot].empty = false;
			inventoryUpdate();
			return true;
		}
	}
	

}
inventoryUpdate = function(){
	for(var i = 1;i <= player.totalSpace;i++){
		var inventorySlot = "inventorySlot" + i;
		var inventorySlotId = "#inventorySlot" + i;
		if(inventory[inventorySlot].empty){
			console.log("found empty spot in display at",inventorySlot)
			break;
		}
		if(!inventory[inventorySlot].empty){
			console.log(inventory[inventorySlot].empty)
			$(inventorySlotId).attr("src", inventory[inventorySlot].inventoryImg);
		}
	}
	console.log("inventory",inventory)
}
