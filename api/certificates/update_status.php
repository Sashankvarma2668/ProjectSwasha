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

    $user_id = $data->student_id;
    $course_id = $data->course_id;

    if (!empty($user_id) && !empty($course_id)) {
        $update = $db->add('certificate_confirm', array("CourseID" => $course_id, "StudentID" => $user_id, "Status" => 'Yes'));
    }
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
