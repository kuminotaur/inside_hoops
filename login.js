function checko(){
	//client side check for login form
	var usnm=document.forms[0].elements[0].value;
	var pswd=document.forms[0].elements[1].value;
	let alpha=/^[a-zA-Z0-9]+$/i;
	let nws=/\S/;
	if(usnm.length>20 || usnm=='' || !alpha.test(usnm)){
		//username is more than 20 characters or empty
		alert("Username not valid!");
		return false;
	}
	else if(pswd.length>20 || pswd=='' || !nws.match(pswd)){
		//password is more than 20 characters or empty
		alert("Password not valid!");
		return false;
	}
	else{
		return true;
	}
}
function checkt(){
	//client side check for registration form
	var usnm=document.forms[1].elements[0].value;
	var pswd=document.forms[1].elements[1].value;
	var pswd2=document.forms[1].elements[2].value;
	let alpha=/^[a-zA-Z0-9]+$/i;
	let nws=/\S/;
	if(usnm.length>20){
		//username is more than 20 characters
		alert("Username too long! Please use only 20 characters or less!");
		return false;
	}
	else if(!alpha.test(usnm)){
		//username has characters that are not alphanumeric
		alert("Please use only alphanumeric characters!");
		return false;
	}
	else if(usnm==''){
		//username is empty
		alert("Username cannot be empty!");
		return false;
	}
	else if(pswd.length>20){
		//password is more than 20 characters
		alert("Password too long! Please use only 20 characters or less!");
		return false;
	}
	else if(!nws.match(pswd)){
		//password has whitespace characters
		alert("Please use only non-whitespace characters!");
		return false;
	}
	else if(pswd=='' || pswd2.length>20 || pswd2==''){
		//password is empty
		alert("Password not valid!");
		return false;
	}
	else if(pswd!=pswd2){
		//password doesn't match password confirm
		alert("Passwords don't match!");
		return false;
	}
	else{
		return true;
	}
}