log = function(arg1,arg2,arg3,arg4,arg5,arg6,arg7){
	document.getElementById("mainOutput").scrollTop = document.getElementById("mainOutput").scrollHeight 
	var argArray = [arg1,arg2,arg3,arg4,arg5,arg6,arg7];
	for(var i = 0;i < argArray.length;i++){
		if(argArray[i] == undefined){
			break;
		}
		console.log("trying to log:" , argArray[i]);
		
		document.getElementById("mainOutput").innerHTML += argArray[i] + " ";
	}
	document.getElementById("mainOutput").innerHTML += "\n"

	
	
	
}