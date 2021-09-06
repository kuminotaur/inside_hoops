pageNum=-1;
upperLim=23;
function removeCurrentGames(){
	var curr=document.querySelector('.main');
	if(typeof(curr)!='undefined' && curr!=null){
		curr.remove();
	}
}
function buttonEnabler(){
	if(pageNum<1){
		document.getElementById('prev').disabled=true;
		document.getElementById('next').disabled=false;
	}
	else if(pageNum>upperLim-1){
		document.getElementById('prev').disabled=false;
		document.getElementById('next').disabled=true;
	}
	else{
		document.getElementById('prev').disabled=false;
		document.getElementById('next').disabled=false;
	}
}
function createTable(game_num,opp_name,hm_score,opp_score,hm_ast,opp_ast,hm_rb,opp_rb,hm_fg,opp_fg,game_date,type){
	var tableau=document.createElement('table');
	var row1=document.createElement('tr');
	var r1c1=document.createElement('th');
	r1c1.appendChild(document.createTextNode('Bucks'));
	row1.appendChild(r1c1);
	var r1c2=document.createElement('th');
	if(type=='pos'){
		r1c2.appendChild(document.createTextNode('Game '+game_num+' ('+game_date+')'));
	}
	else{
		r1c2.appendChild(document.createTextNode('('+game_date+')'));
	}
	row1.appendChild(r1c2);
	var r1c3=document.createElement('th');
	r1c3.appendChild(document.createTextNode(opp_name));
	row1.appendChild(r1c3);
	tableau.appendChild(row1);
	var row2=document.createElement('tr');
	var r2c1=document.createElement('td');
	r2c1.appendChild(document.createTextNode(hm_score));
	row2.appendChild(r2c1);
	var r2c2=document.createElement('td');
	r2c2.appendChild(document.createTextNode('Score'));
	row2.appendChild(r2c2);
	var r2c3=document.createElement('td');
	r2c3.appendChild(document.createTextNode(opp_score));
	row2.appendChild(r2c3);
	tableau.appendChild(row2);
	var row3=document.createElement('tr');
	var r3c1=document.createElement('td');
	r3c1.appendChild(document.createTextNode(hm_ast));
	row3.appendChild(r3c1);
	var r3c2=document.createElement('td');
	r3c2.appendChild(document.createTextNode('Assists'));
	row3.appendChild(r3c2);
	var r3c3=document.createElement('td');
	r3c3.appendChild(document.createTextNode(opp_ast));
	row3.appendChild(r3c3);
	tableau.appendChild(row3);
	var row4=document.createElement('tr');
	var r4c1=document.createElement('td');
	r4c1.appendChild(document.createTextNode(hm_rb));
	row4.appendChild(r4c1);
	var r4c2=document.createElement('td');
	r4c2.appendChild(document.createTextNode('Rebounds'));
	row4.appendChild(r4c2);
	var r4c3=document.createElement('td');
	r4c3.appendChild(document.createTextNode(opp_rb));
	row4.appendChild(r4c3);
	tableau.appendChild(row4);
	var row5=document.createElement('tr');
	var r5c1=document.createElement('td');
	r5c1.appendChild(document.createTextNode(hm_fg));
	row5.appendChild(r5c1);
	var r5c2=document.createElement('td');
	r5c2.appendChild(document.createTextNode('FG%'));
	row5.appendChild(r5c2);
	var r5c3=document.createElement('td');
	r5c3.appendChild(document.createTextNode(opp_fg));
	row5.appendChild(r5c3);
	tableau.appendChild(row5);
	return tableau;
}
function showFour(index){
	var qxhr=new XMLHttpRequest();
	qxhr.onload=function (){
		if(qxhr.readyState==4 && this.status == 200){
			var fstats=JSON.parse(this.responseText);
			var newcurr=document.createElement('div');
			newcurr.classList.add('main');
			if (pageNum==0){
				var head=document.createElement('p');
				head.appendChild(document.createTextNode('Last 4 Games'));
				newcurr.appendChild(head);
				newcurr.appendChild(document.createElement('br'));
			}
			for(i=0;i<fstats.length;i++){
				var ntable=createTable(fstats[i].game_num,fstats[i].opp_name,fstats[i].hm_score,fstats[i].opp_score,fstats[i].hm_ast,fstats[i].opp_ast,fstats[i].hm_rb,fstats[i].opp_rb,fstats[i].hm_fg,fstats[i].opp_fg,fstats[i].game_date,fstats[i].type);
				newcurr.appendChild(ntable);
				newcurr.appendChild(document.createElement('br'));
			}
			document.body.insertBefore(newcurr,document.getElementsByTagName('script')[0]);
		}
	};
	qxhr.open('POST','./games.php',true);
	qxhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	qxhr.send('index='+index);
}
function lastFour(){
	pageNum-=1;
	removeCurrentGames();
	showFour(pageNum);
	buttonEnabler();
}
function nextFour(){
	pageNum+=1;
	removeCurrentGames();
	showFour(pageNum);
	buttonEnabler();
}
nextFour();
document.addEventListener('keydown',function(e){
	if(pageNum>0 && e.keyCode==37){
		lastFour();
	}
	else if(pageNum<upperLim && e.keyCode==39){
		nextFour();
	}
});