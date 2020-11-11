<?php
  include "get-data.php";

  $apiURL = 'https://restcountries.eu/rest/v2/all';
  echo getData($apiURL); // JSON data
?>
