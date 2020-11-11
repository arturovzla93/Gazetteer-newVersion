<?php
  include "get-data.php";

  $apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=26e93c5ec4abe76207f910820d11c766",
  echo getData($apiURL); // JSON data
?>
