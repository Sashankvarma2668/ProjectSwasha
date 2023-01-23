<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $unique_id = $data->email;
    $email = strtolower($data->email);
    $password = $data->password;
    $password = hash("sha256", $password);
    $condition = "(Email='$email' OR UniqueID='$unique_id') AND Password='$password' AND (Status='Active' OR Status='Pending') AND isActive='Yes'";

    $response = $db->get('students', "*", $condition);
    $total = $db->count('students', "ID", $condition);
    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'Login Successfull'
        ];
        $response['Password'] = '';
        $request->data = $response;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Wrong Email or Password'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
