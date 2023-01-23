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
    $level = $data->level ?? '';
    $student_id = $data->student ?? '';
    $condition = "CourseLevelID=$level";

    $response = $db->get_all('course_modules', "*", $condition);
    $total = $db->count('course_modules', "ID", $condition);

    foreach ($response as $key => $module) {
        $condition_two = "CourseModuleID='".$module['ID']."'";
        $courses = $db->get_all('courses', "*", $condition_two);
        $total_courses = $db->count('courses', "ID", $condition_two);

        if ($total_courses > 0) {
            foreach ($courses as $key_two => $value) {
                $total_topics = $db->count('course_topics', "ID", "CourseID=" . $value['ID']);
                $student_progress = $db->count('course_progress', "ID", "StudentID=$student_id AND CourseID=" . $value['ID']);
                $courses[$key_two]['total_topics'] = $total_topics;
                $courses[$key_two]['student_progress'] = $student_progress;
            }
        }
        $response[$key]['Courses'] = $courses;
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
