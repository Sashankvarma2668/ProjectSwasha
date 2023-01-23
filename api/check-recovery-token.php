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
    $token = $data->token;
    $condition = "Token='$token'";

    $response = $db->get('recovery_tokens', "*", $condition);
    $total = $db->count('recovery_tokens', "ID", $condition);
    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'Token validated successfully'
        ];
        $request->id = $response['ReferenceId'];
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
