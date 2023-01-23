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
    $module = $data->module ?? '';
    $student_id = $data->student ?? '';
    $condition = "CourseModuleID=$module";

    $response = $db->get_all('courses', "*", $condition);
    $total = $db->count('courses', "ID", $condition);

    if ($total > 0) {
        foreach ($response as $key => $value) {
            $total_topics = $db->count('course_topics', "ID", "CourseID=" . $value['ID']);
            $student_progress = $db->count('course_progress', "ID", "StudentID=$student_id AND CourseID=" . $value['ID']);
            $response[$key]['total_topics'] = $total_topics;
            $response[$key]['student_progress'] = $student_progress;
        }
    }

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;
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
