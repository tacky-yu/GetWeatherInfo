<?php
	header('Content-Type: text/html; charset=UTF-8');

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $_GET["url"]);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 60);

	$info = curl_getinfo($ch);
	$result = curl_exec($ch);
	if (curl_errno($ch)) {
		print curl_error($ch);
	}
	curl_close($ch);
	echo $result;
?>
