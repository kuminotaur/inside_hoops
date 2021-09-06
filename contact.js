function checkCF(){
	if(document.getElementById('cusnm')!=null){
		var user=document.getElementById('cusnm').value;
		var mssg=document.getElementById('mssg').value;
		if(user==''){
			alert("Please enter a valid name!");
			return false;
		}
		else if(user>20){
			alert("Please enter a shorter name!");
			return false;
		}
		else if(mssg==''){
			alert("Please enter a valid message!");
			return false;
		}
		else if(mssg>255){
			alert("Message too long!");
			return false;
		}
		else{
			return true;
		}
	}
	else{
		var mssg=document.getElementById('mssg').value;
		if(mssg==''){
			alert("Please enter a valid message!");
			return false;
		}
		else if(mssg>255){
			alert("Message too long!");
			return false;
		}
		else{
			return true;
		}
	}
}