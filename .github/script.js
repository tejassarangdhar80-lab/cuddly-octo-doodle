// Send OTP
document.querySelectorAll(".btn-green")[0].onclick = async () => {
    const email = document.getElementById("signupEmail").value;

    const res = await fetch("otp.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `email=${email}`
    });

    alert(await res.text());
};

// Verify OTP
document.querySelectorAll(".btn-green")[1].onclick = async () => {
    const otp = document.getElementById("signupOtp").value;

    const res = await fetch("verify_otp.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `otp=${otp}`
    });

    const result = await res.text();

    if(result === "verified"){
        alert("OTP Verified ✅");
    } else {
        alert("Invalid OTP ❌");
    }
};