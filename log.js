log = function(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15,arg16){
	
	var argArray = [arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15,arg16];
	for(var i = 0;i < argArray.length;i++){
		if(argArray[i] == undefined){
			break;
		}
		if(argArray[i] == "<" || argArray[i+1] == ">" || argArray[i] == "[" || argArray[i+1] == "]"){
			document.getElementById("mainOutput").innerHTML += argArray[i];
		}
		else{
			document.getElementById("mainOutput").innerHTML += argArray[i] + " ";
		}
		
	}
	document.getElementById("mainOutput").scrollTop = document.getElementById("mainOutput").scrollHeight;
	document.getElementById("mainOutput").innerHTML += "\n"


	
	
}