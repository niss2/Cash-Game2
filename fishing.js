$(document).ready(function(){
	$("#fishingBtn").click(function(){
		fishing();
	})
})

fishing = function(){
	var fishingHtml = $("#fishingBtn").html()
	if(fishingHtml == "Reel in"){
		reelIn();
		$("#fishingBtn").html("Throw line");
	}
	else{
		throwOut();
		$("#fishingBtn").html("Reel in");
	}
	
}
throwOut = function(){
	
}