// ================== LOCAL STORAGE ==================
let users = JSON.parse(localStorage.getItem("users")) || [];

// ================== SIGNUP ==================
document.getElementById("signupFormElement").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    // Check existing user
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        alert("User already exists!");
        return;
    }

    const newUser = { name, email, password };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    showLoginForm();
});

// ================== LOGIN ==================
document.getElementById("loginFormElement").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Login successful!");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);

        showMainApp();
    } else {
        alert("Invalid email or password!");
    }
});

// ================== SHOW LOGIN ==================
function showLoginForm() {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("signupContainer").style.display = "none";
    document.getElementById("mainApp").style.display = "none";
}

// ================== SHOW SIGNUP ==================
function showSignupForm() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("signupContainer").style.display = "block";
    document.getElementById("mainApp").style.display = "none";
}

// ================== SHOW MAIN APP ==================
function showMainApp() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("signupContainer").style.display = "none";
    document.getElementById("mainApp").style.display = "block";

    displayUser();
}

// ================== DISPLAY USER ==================
function displayUser() {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");

    document.getElementById("userNameDisplay").innerText = name;
    document.getElementById("userEmailDisplay").innerText = email;
}

// ================== LOGOUT ==================
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    showLoginForm();
}

// ================== AUTO LOGIN ==================
window.onload = function() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainApp();
    } else {
        showLoginForm();
    }
};
