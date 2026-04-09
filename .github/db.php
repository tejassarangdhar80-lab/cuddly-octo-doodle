<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "parking_management";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success"=>false,"message"=>"DB Connection Failed"]));
}

$conn->set_charset("utf8");
?>