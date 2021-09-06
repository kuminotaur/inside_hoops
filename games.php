<?php
	$ofs=$_POST['index'];
	$host = "summer-2021.cs.utexas.edu";
	$user = "cs329e_mitra_kumar";
	$pwd = "Plasma3Cork4Ignite";
	$dbs = "cs329e_mitra_kumar";
	$port = "3306";
	$conn = new mysqli($host, $user, $pwd, $dbs);
	if ($conn->connect_errno){
		die("mysqli_connect failed: " . mysqli_connect_errno());
	}
	$table='inside_hoops_game_data';
	$ret=array();
	$quer='select * from '.$table.' order by game_date desc limit 4 offset '.$ofs*4;
	$result=$conn->query($quer);
	if($result->num_rows>0){
		while($row=$result->fetch_assoc()){
			array_push($ret,array('game_num'=>$row['game_num'],'opp_name'=>$row['opp_name'],'hm_score'=>$row['hm_score'],'opp_score'=>$row['opp_score'],'hm_ast'=>$row['hm_ast'],'opp_ast'=>$row['opp_ast'],'hm_rb'=>$row['hm_rb'],'opp_rb'=>$row['opp_rb'],'hm_fg'=>$row['hm_fg'],'opp_fg'=>$row['opp_fg'],'game_date'=>$row['game_date'],'type'=>$row['type']));
		}
	}
	echo json_encode($ret);
?>