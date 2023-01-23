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
    $password = $data->password;
    $password = hash("sha256", trim($data->password));
    $token = $data->token;
    // $reference_id = $data->$reference_id;
    $condition = "Token='$token'";
    // $condition = "ReferenceId=$reference_id";

    $response = $db->get('recovery_tokens', "*", $condition);
    $update_password = FALSE;
    if (!empty($response)) {
        $response_id = $response['ReferenceId'];
        $update_password = $db->update('students', array('password' => $password), "ID=$response_id");
        $delete_previous = $db->delete('recovery_tokens', "Token='$token'");
    }
    if ($update_password === TRUE) {
        $request->meta = [
            "error" => false,
            "message" => 'Password successfully updated'
        ];
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Invalid Token or Token Expired'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
