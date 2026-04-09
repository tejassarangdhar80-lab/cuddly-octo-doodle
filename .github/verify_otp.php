<?php
session_start();

$userOtp = $_POST['otp'];

if(isset($_SESSION['otp']) && $userOtp == $_SESSION['otp']){
    echo "verified";
} else {
    echo "invalid";
}
?>