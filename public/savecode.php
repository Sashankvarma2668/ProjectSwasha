<?php
    $data = json_decode(file_get_contents("php://input"), true);
   // echo json_encode($_POST);
   // exit;
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "learning";

    // Create connection
    $conn = new mysqli($servername, $username, $password,$dbname);

    $sql = "INSERT INTO codesave (Student ID,Program ID, Title,Program Type,Code)  VALUES ('".$data['s_id']."',".$data['p_id'].",".$data['file_name'].",'".$data['code_type'].",'".$data['code']."')";
    //echo $sql;exit;

    if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
