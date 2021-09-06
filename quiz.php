<?php
    $grade=0;
    settype($grade,'integer');

	//quiz answers
	$ans=array('b','d','a','d','c','c','b','a','d','b','a');

	for($i=0;$i<sizeof($_POST);$i++){
		$ques=$_POST[''.$i.''];
		if($ques==$ans[$i]){$grade+=1;}
	}

	//returns grade to ajax response
    echo $grade;
?>