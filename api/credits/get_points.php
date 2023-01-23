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
    $student_id = $data->student;

    $get_points = $db->get('reward_points', 'SUM(Points) as points', "StudentID=$student_id");
    $get_points_data = $db->get_all('reward_points', '*', "StudentID=$student_id");
    foreach ($get_points_data as $key => $point_data) {
        if ($point_data['ReferenceType'] === 'Chapter') {
            $get_points_data[$key]['Reference'] = $db->get('courses', '*', "ID=" . $point_data['ReferenceID'])['Title'];
        } else if ($point_data['ReferenceType'] === 'Module') {
            $get_points_data[$key]['Reference'] = $db->get('course_modules', '*', "ID=" . $point_data['ReferenceID'])['ModuleTitle'];
        } else {
        }
    }
    $request->meta = [
        "error" => false,
        "message" => 'Successfull'
    ];
    $request->points = $get_points['points'];
    $request->data = $get_points_data;
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
