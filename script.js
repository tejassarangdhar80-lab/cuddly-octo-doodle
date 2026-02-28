// ==========================
// PARKING MANAGEMENT SYSTEM
// CLEAN FULL VERSION
// ==========================

// ---------- GLOBAL STATE ----------
let currentLoginMode = "user";

let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
let membersData = JSON.parse(localStorage.getItem("members")) || [];
let vehiclesData = JSON.parse(localStorage.getItem("vehicles")) || [];
let parkingData = JSON.parse(localStorage.getItem("parking")) || [];
let parkingArenaData =
  JSON.parse(localStorage.getItem("parkingArena")) || initializeParkingArena();

// ---------- INITIALIZE PARKING ARENA ----------
function initializeParkingArena() {
  const arena = [];
  for (let i = 1; i <= 20; i++) {
    arena.push({
      slotId: "SLOT-" + i,
      isOccupied: false,
    });
  }
  localStorage.setItem("parkingArena", JSON.stringify(arena));
  return arena;
}

// ---------- SAVE FUNCTIONS ----------
function saveAll() {
  localStorage.setItem("members", JSON.stringify(membersData));
  localStorage.setItem("vehicles", JSON.stringify(vehiclesData));
  localStorage.setItem("parking", JSON.stringify(parkingData));
  localStorage.setItem("parkingArena", JSON.stringify(parkingArenaData));
}

// ================= LOGIN SYSTEM =================

function handleLogin(email, password) {
  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  if (currentLoginMode === "admin") {
    localStorage.setItem("admin", "true");
    showAdminDashboard();
    return;
  }

  const user = registeredUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid Credentials");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  showMainApp();
}

function handleSignup(email, username, password) {
  if (registeredUsers.find((u) => u.email === email)) {
    alert("Email already exists");
    return;
  }

  const newUser = {
    id: Date.now(),
    email,
    username,
    password,
  };

  registeredUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  alert("Account Created!");
}

// ================= MEMBER MANAGEMENT =================

function addMember(name, contact) {
  const member = {
    id: Date.now(),
    name,
    contact,
  };

  membersData.push(member);
  saveAll();
  displayMembers();
}

function deleteMember(id) {
  membersData = membersData.filter((m) => m.id !== id);
  vehiclesData = vehiclesData.filter((v) => v.memberId !== id);
  saveAll();
  displayMembers();
}

// ================= VEHICLE MANAGEMENT =================

function addVehicle(memberId, regNo, model) {
  const vehicle = {
    id: Date.now(),
    memberId,
    regNo,
    model,
  };

  vehiclesData.push(vehicle);
  saveAll();
  displayVehicles();
}

function deleteVehicle(id) {
  vehiclesData = vehiclesData.filter((v) => v.id !== id);
  saveAll();
  displayVehicles();
}

// ================= PARKING SYSTEM =================

function checkIn(memberId) {
  const vehicle = vehiclesData.find((v) => v.memberId == memberId);

  if (!vehicle) {
    alert("Register vehicle first");
    return;
  }

  const freeSlot = parkingArenaData.find((s) => !s.isOccupied);

  if (!freeSlot) {
    alert("No Slots Available");
    return;
  }

  freeSlot.isOccupied = true;

  parkingData.push({
    id: Date.now(),
    memberId,
    vehicleId: vehicle.id,
    slot: freeSlot.slotId,
    checkin: new Date().toLocaleString(),
    checkout: null,
    status: "Active",
  });

  saveAll();
  updateDashboard();
  alert("Vehicle Checked In");
}

function checkOut(parkingId) {
  const parking = parkingData.find((p) => p.id == parkingId);

  if (!parking || parking.status === "Completed") {
    alert("Invalid Parking ID");
    return;
  }

  parking.status = "Completed";
  parking.checkout = new Date().toLocaleString();

  const slot = parkingArenaData.find((s) => s.slotId === parking.slot);
  if (slot) slot.isOccupied = false;

  saveAll();
  updateDashboard();
  alert("Vehicle Checked Out");
}

// ================= DASHBOARD =================

function updateDashboard() {
  const totalMembers = membersData.length;
  const totalVehicles = vehiclesData.length;
  const occupied = parkingArenaData.filter((s) => s.isOccupied).length;
  const available = parkingArenaData.length - occupied;

  const m = document.getElementById("totalMembers");
  const v = document.getElementById("totalVehicles");
  const o = document.getElementById("occupiedSlots");
  const a = document.getElementById("availableSlots");

  if (m) m.textContent = totalMembers;
  if (v) v.textContent = totalVehicles;
  if (o) o.textContent = occupied;
  if (a) a.textContent = available;
}

// ================= DISPLAY FUNCTIONS =================

function displayMembers() {
  const tbody = document.querySelector("#membersTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  membersData.forEach((m) => {
    tbody.innerHTML += `
      <tr>
        <td>${m.id}</td>
        <td>${m.name}</td>
        <td>${m.contact}</td>
        <td><button onclick="deleteMember(${m.id})">Delete</button></td>
      </tr>
    `;
  });
}

function displayVehicles() {
  const tbody = document.querySelector("#vehiclesTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  vehiclesData.forEach((v) => {
    tbody.innerHTML += `
      <tr>
        <td>${v.id}</td>
        <td>${v.regNo}</td>
        <td>${v.model}</td>
        <td><button onclick="deleteVehicle(${v.id})">Delete</button></td>
      </tr>
    `;
  });
}

// ================= NAVIGATION =================

function showMainApp() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
}

function showAdminDashboard() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("adminContainer").style.display = "block";
}

// ================= INIT =================

window.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
  displayMembers();
  displayVehicles();
});
