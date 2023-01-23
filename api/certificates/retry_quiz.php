<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $user_id = $data->user_id;
    $course_id = $data->course_id;
    
    $delete = $db->delete('certificate_progress', "CourseID=$course_id AND StudentID=$user_id");
    
    $request->meta = [
        "error" => false,
        "message" => 'Successfull',
    ];
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
