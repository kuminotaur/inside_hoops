function checkUpdate(){
	var boxes=document.getElementsByClassName('updatetick');
	for(i=0;i<boxes.length;i++){
		if(boxes[i].checked){
			document.getElementById('submit').disabled=false;
			return true;
		}
	}
	document.getElementById('submit').disabled=true;
	return false;
}