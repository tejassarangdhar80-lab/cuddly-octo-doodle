<?php
require 'db.php';

header('Content-Type: application/json');

$endpoint = $_GET['endpoint'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

switch($endpoint){

    case "members":
        if($method=="GET") getMembers($conn);
        if($method=="POST") addMember($conn);
        break;

    case "vehicles":
        if($method=="GET") getVehicles($conn);
        if($method=="POST") addVehicle($conn);
        break;

    default:
        echo json_encode(["error"=>"Invalid endpoint"]);
}

function getMembers($conn){
    $res = $conn->query("SELECT * FROM MEMBER");
    echo json_encode($res->fetch_all(MYSQLI_ASSOC));
}

function addMember($conn){
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("INSERT INTO MEMBER (M_name, M_fname, M_enic, M_contactno, M_address) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss",
        $data['m_name'],
        $data['m_fname'],
        $data['m_enic'],
        $data['m_contactno'],
        $data['m_address']
    );

    $stmt->execute();

    echo json_encode(["success"=>true]);
}

function getVehicles($conn){
    $res = $conn->query("SELECT * FROM VEHICLE");
    echo json_encode($res->fetch_all(MYSQLI_ASSOC));
}

function addVehicle($conn){
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("INSERT INTO VEHICLE (V_regno, V_engno, V_name, V_model, V_color, V_chasesno, M_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssi",
        $data['v_regno'],
        $data['v_engno'],
        $data['v_name'],
        $data['v_model'],
        $data['v_color'],
        $data['v_chasesno'],
        $data['m_id']
    );

    $stmt->execute();

    echo json_encode(["success"=>true]);
}
?>