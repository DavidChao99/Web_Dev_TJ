<html>
<head>
	<title>Thank You</title>
	<script type="text/javascript">
		var obj = <?php echo json_encode($array); ?>;

	</script>
</head>
<body>
Thank you <?php echo $_POST["username"]; ?>

<?php 
	class myDB extends SQLITE3 {
		function __construct() {
			$this->open("Lab5.db");
		}
	}

	$db = new myDB();
	if(!$db) {
		echo $db ->lastErrorMsg();
	}
	else {
		echo "Opened database successfully";
	}



	$sql = "
		INSERT INTO pokemon (Username, Zip, Generation, Pokemon) 
		VALUES (\"" . $_REQUEST["username"] . "\", " . $_REQUEST["zip"] . ", " . $_REQUEST["generation"]. ", \"" . $_REQUEST["pokemon"]."\");
	";

	echo $sql;

	$ret = $db->exec($sql);
    if(!$ret){
       //echo $db->lastErrorMsg();
       $sql = "
		UPDATE Pokemon
		SET Generation='".$_REQUEST["generation"]."', Pokemon='".$_REQUEST["pokemon"]. "'
		WHERE Username='".$_REQUEST["username"]."';
        ";

        $ret = $db->exec($sql);
        if(!$ret) {
        	echo $db->lastErrorMsg();
        }


    } else {]]]]]]
       echo "Records created successfully\n";
    }

    $sql = "
    	SELECT * FROM pokemon;
    ";

    $ret = $db->query($sql);
    echo "<table border=\"1\" style=\"width:100%\">";
    echo "<tr> <td>Name</td> <td>Zip Code</td> <td>Generation</td> <td>Pokemon</td>";
    while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
    	echo "<tr>";
      echo "<td>". $row['Username'] . "</td>";
      echo "<td>". $row['Zip'] ."</td>";
      echo "<td>". $row['Generation'] ."</td>";
      echo "<td>". $row['Pokemon'] ."</td>";
      echo "</tr>";
   	}

    $db -> close();
?>


</body>
</html>