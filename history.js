function removeHistory(){
	//removes history section
	var hist=document.querySelector('.main');
	hist.remove();
}
function loadQuiz(){
	//loads the quiz and its questions using an ajax response from a json file
	var qxhr=new XMLHttpRequest();
	qxhr.open('GET','./quiz.json');
	qxhr.onload=function (){
		var ques=JSON.parse(this.responseText);
		var quiz=document.createElement('form');
		quiz.id='quiz';
		for(i=0;i<ques.length;i++){
			var quesholder=document.createElement('fieldset');
			var questitle=document.createElement('legend');
			questitle.appendChild(document.createTextNode(ques[i].question));
			quesholder.appendChild(questitle);
			var a=document.createElement('input');
			a.type='radio';
			a.name=i;
			a.id='a';
			a.value='a';
			var al=document.createElement('label');
			al.for='a';
			al.appendChild(document.createTextNode(ques[i].a));
			quesholder.appendChild(a);
			quesholder.appendChild(al);
			var b=document.createElement('input');
			b.type='radio';
			b.name=i;
			b.id='b';
			b.value='b';
			var bl=document.createElement('label');
			bl.for='b';
			bl.appendChild(document.createTextNode(ques[i].b));
			quesholder.appendChild(b);
			quesholder.appendChild(bl);
			var c=document.createElement('input');
			c.type='radio';
			c.name=i;
			c.id='c';
			c.value='c';
			var cl=document.createElement('label');
			cl.for='c';
			cl.appendChild(document.createTextNode(ques[i].c));
			quesholder.appendChild(c);
			quesholder.appendChild(cl);
			var d=document.createElement('input');
			d.type='radio';
			d.name=i;
			d.id='d';
			d.value='d';
			var dl=document.createElement('label');
			dl.for='d';
			dl.appendChild(document.createTextNode(ques[i].d));
			quesholder.appendChild(d);
			quesholder.appendChild(dl);
			quiz.appendChild(quesholder);
		}
		var subholder=document.createElement('div');
		subholder.classList.add('buttonholder');
		var sub=document.createElement('button');
		sub.type='button';
		sub.setAttribute('onclick','gradeQuiz()');
		sub.appendChild(document.createTextNode('Submit'));
		subholder.appendChild(sub);
		quiz.appendChild(subholder);
		document.body.insertBefore(quiz,document.getElementsByTagName('footer')[0]);
	};
	qxhr.send();
}
function checkCompletion(){
	//checks all quiz questions have been answered
	var ques=document.getElementsByTagName('input');
	var fiel=document.getElementsByTagName('fieldset');
	var checks=0;
	for(i=0;i<ques.length;i++){
		if(ques[i].checked){
			checks+=1;
		}
	}
	if(checks!=fiel.length){
		return false;
	}
	return true;
}
function removeQuiz(){
	//removes quiz section
	var quiz=document.querySelector('#quiz');
	quiz.remove();
}
function getQuizResults(){
	//gathers quiz inputs and sends them to a script to be graded server side
	var radios=document.getElementsByTagName('input');
	var numq=document.getElementsByTagName('fieldset').length;
	var count=0;
	var params='';
	for(i=0;i<radios.length;i++){
		if(radios[i].checked){
			params+=count;
			params+='=';
			params+=radios[i].value;
			params+='&';
			count++;
		}
	}
	params=params.substring(0,params.length-1);
	var qxhr=new XMLHttpRequest();
	qxhr.onload=function (){
		if(qxhr.readyState==4 && this.status == 200){
			showQuizResults(this.responseText,numq);
			document.cookie='quiz_score='+this.responseText+'/'+numq+'; max-age='+toString(60*60*24*365)+';';
		}
	};
	qxhr.open('POST','./quiz.php',true);
	qxhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	qxhr.send(params);
}
function showQuizResults(grade,numq,done){
	//displays quiz result
	var dispholder=document.createElement('div');
	dispholder.classList.add('maintext');
	var display=document.createElement('p');
	var mssg='';
	if(done){
		mssg+='You\'ve already taken this quiz! ';
	}
	mssg+='You got '+grade+' questions right out of '+numq+' on the quiz!';
	display.appendChild(document.createTextNode(mssg));
	dispholder.appendChild(display);
	document.body.insertBefore(dispholder,document.getElementsByTagName('footer')[0]);
}
function readCookie(name) {
	//gets a cookie by its name
	var nameEQ=name+'=';
	var ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++){
		var c = ca[i];
		while (c.charAt(0)==' ') c=c.substring(1,c.length);
		if (c.indexOf(nameEQ)==0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function takeQuiz(){
	//sets up the quiz
	removeHistory();
	if(document.cookie.indexOf('quiz_score=')==-1){
		loadQuiz();
	}
	else{
		let cook=readCookie('quiz_score').split('/');
		showQuizResults(cook[0],cook[1],true);
	}
}
function gradeQuiz(){
	//grades the quiz and shows it to user
	if(checkCompletion()){
		getQuizResults();
		removeQuiz();
	}
	else{
		alert('Quiz not complete!');
	}
}