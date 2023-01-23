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
    $student = $data->student??'';
    $condition = "CourseModuleID=1 OR CourseModuleID=2";

    $response = $db->get_all('courses', "*", $condition);
    $total = $db->count('courses', "ID", $condition);

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;

        if(!empty($student)){
            $request->webinar = $db->get('webinars', "*", "(Class IN (SELECT Class FROM students Where ID=$student) OR Class='0') AND (Schools IN (SELECT ID FROM schools WHERE SchoolName IN (SELECT School FROM students Where ID=$student)) OR Schools='0')");
        } else {
            $request->webinar = '';
        }
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'No Courses Available'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No level posted'
    ];
}
echo json_encode($request);
