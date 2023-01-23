<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $user_id = $data->student ?? '';
    $condition = "StudentID=$user_id";

    $response = $db->get('certificate_progress', "MAX(CourseID) as CourseID", $condition);
    $total = $db->count('certificate_progress', "CourseID", $condition);
    
    if ($total > 0) {
        $response = $response['CourseID'];
    } else {
        $response = 0;
    }
    $request->meta = [
        "error" => false,
        "message" => 'successfull'
    ];
    $request->data = $response;
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No level posted'
    ];
}
echo json_encode($request);
