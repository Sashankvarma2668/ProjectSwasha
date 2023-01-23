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
    $email = $data->email;
    $condition = "Email='$email' OR Mobile='$email'";

    $response = $db->get('students', "*", $condition)['ID'];
    $total = $db->count('students', "ID", $condition);
    if ($total > 0) {
        $delete_previous = $db->delete('recovery_tokens', "ReferenceId=$response AND ReferenceType='Student'");
        $token = hash('sha256', time() . rand(10, 99));
        $recovery_data = array(
            'Token' => $token,
            'ReferenceId' => $response,
            'ReferenceType' => 'Student',
            'CreatedAt' => $core->datetime
        );
        $add_key = $db->add('recovery_tokens', $recovery_data);


        $request->meta = [
            "error" => false,
            "message" => 'Recovery email successfully sent please follow instructions in the mail.'
        ];
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'User not found with this email.'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
