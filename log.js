log = function(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12){
	document.getElementById("mainOutput").scrollTop = document.getElementById("mainOutput").scrollHeight 
	var argArray = [arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12];
	for(var i = 0;i < argArray.length;i++){
		if(argArray[i] == undefined){
			break;
		}
		
		document.getElementById("mainOutput").innerHTML += argArray[i] + " ";
	}
	document.getElementById("mainOutput").innerHTML += "\n"

	
	
	
}