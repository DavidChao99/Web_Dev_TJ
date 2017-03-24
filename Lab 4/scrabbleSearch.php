<?php
	
	$startText  = $_REQUEST["startText"];
	$endText    = $_REQUEST["endText"];
	$nPos       = $_REQUEST["nNum"];
	$nChar      = $_REQUEST["nText"];
	$nCharText  = $_REQUEST["nCharText"];
	$nVowText   = $_REQUEST["nVowText"];
	$letterAvail= $_REQUEST["letterAvail"];

	header('Content-Type: text/plain');

	$file = 'wordsEn.txt';

	$contents = file_get_contents($file);


	if($startText != "") {
		$pattern = "/^".$startText.".*/m";
		if(preg_match_all($pattern, $contents, $matches)){
   			$contents = implode("\n", $matches[0]);
   			//do something to find what part matches
		}
		else {
			$contents = "";
		}
	}
	if($endText != "") {
		$pattern = "/^.*".$endText."\r$/m";
		if(preg_match_all($pattern, $contents, $matches)){
   			$contents = implode("\n", $matches[0]);
		}
		else {
			$contents = "";
		}
	}
	if($nCharText != "") {
		$pattern = "/^.{".($nCharText+1)."}$/m";
		if(preg_match_all($pattern, $contents, $matches)){
   			$contents = implode("\n", $matches[0]);
		}
		else {
			$contents = "";
		}
	}

	if($nPos != "" && $nChar !="") {
		$pattern = "/^.{".($nPos-1)."}".$nChar.".*$/m";
		if(preg_match_all($pattern, $contents, $matches)) {
			$contents = implode("\n", $matches[0]);
		}
		else {
			$contents = "";
		}
	}

	if($nVowText !=""){ 
		$pattern = "/^[^aeiouyAEIOUY]*";
		for($i = 0; $i<$nVowText; $i++) {
			$pattern .= "[aeiouyAEIOUY][^aeiouyAEIOUY]*";
		}

		$pattern .= "$/m";	
		if(preg_match_all($pattern, $contents, $matches)) {
			$contents = implode("\n", $matches[0]);
		}
		else {
			$contents = "";
		}

	}

	if($letterAvail !="") {
		$letters = array();
		for($i = 0; $i < 26; $i++) {
			$letters[$i] = substr_count($letterAvail, chr(65+$i));
			$letters[$i] += substr_count($letterAvail, chr(97+$i));
		}
		$contents = findLettAvail($letters, $contents);
	}

	//recursively call for each less
	function findLettAvail($fArray, $contents) {
		$numLetter =0;
		$pattern ="";

		$contents1 = $contents;

		for($i = 0; $i < 26; $i++) {
			$numLetter += $fArray[$i];
		}

		if($numLetter != 0) {
			for($i = 0; $i < 26; $i++) {

				//First match with each value within the array of our letters available.  We match only words with the specified amount or more
				$pattern = "/^";
				for($j = 0; $j< $fArray[$i]; $j++) {
					$pattern .= ".*[".chr(65+$i).chr(97+$i)."]";
				}
				if($fArray[$i] != 0) {
					$pattern .=".*";
				}
				$pattern .="$/m";

				//echo $pattern;
				//echo("PRE- PREGMATCH");
				//echo($pattern);
				//echo($contents1);
				if(preg_match_all($pattern, $contents1, $matches)) {
					$contents1 = implode("\n", $matches[0]);
				}
				else {
					if($pattern == "/^$/m") {

					}
					else {
						$contents1 = "";
					}
				}

				$pattern = "/^.{".($numLetter+1)."}$/m";
				if(preg_match_all($pattern, $contents1, $matches)) {
					$contents1 = implode("\n", $matches[0]);
				}
				else {
					$contents1 = "";
					//echo("FAILED!!!!!!");
				}

				//echo "SOMEWHAT BEFORE: " . $contents1;
				
				//Then shorten it down by size so it corresponds exactly with those with EXACTLY the amount specified

			}

			//recursion, not sure why i used all these holders of the true value, but it shouldn't matter
			//echo "SOMEWHAT FINAL        " . $contents1;
			for($i = 0; $i < count($fArray); $i ++) {
				if($fArray[$i] > 0) {
					$fArray[$i] --;
					$contents1 = $contents1 . findLettAvail($fArray, $contents);
					$fArray[$i] ++;
				}
			}
		
			//echo "FINAL THATS MESSED UP             " . $contents1;

			return $contents1;	
		}
		
		else {
			return "";
		}
	}

	// $new = htmlspecialchars($contents, ENT_COMPAT,'ISO-8859-1', true);
	// echo $new;

	$contentArray = explode("\n", $contents);
	for($i = 0; $i < count($contentArray); $i ++) {
		//echo " HI " . $contentArray[$i];
	}
	$contentArray = array_unique($contentArray);

	$contents = implode("\n", $contentArray);
	//echo implode("\n", $matches[0]);
	echo $contents;



?>