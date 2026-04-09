<?php
session_start();

$email = $_POST['email'];
$otp = rand(100000, 999999);

$_SESSION['otp'] = $otp;

echo "OTP: $otp";
?>