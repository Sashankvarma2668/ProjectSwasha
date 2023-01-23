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
    $slug = $data->slug ?? '';
    $course = $data->course ?? '';
    $user_id = $data->user_id ?? '';

    $course_details = $db->get('courses', "*", "Slug='$course'");

    if (!empty($slug)) {
        $condition = "Slug='$slug'";
    } else {
        $condition = "CourseID=" . $course_details['ID'];
    }

    $response = $db->get('course_topics', "*", $condition, "ID DESC");
    $total = $db->count('course_topics', "ID", $condition);

    if (!empty($response)) {
        // echo 'hello';
        $check_progress = $db->count('course_progress', 'ID', "CourseID=" . $response['CourseID'] . " AND CourseTopicID=" . $response['ID'] . " AND StudentID=$user_id");
        if ($check_progress < 1) {
            $update_array = array(
                'CourseID' => $response['CourseID'],
                'CourseTopicID' => $response['ID'],
                'StudentID' => $user_id,
                'CreatedOn' => $core->datetime
            );
            $update = $db->add('course_progress', $update_array);
        }
    }

    $condition = "CourseID=" . $response['CourseID'];
    $course_topics = $db->get_all('course_topics', "*", $condition);

    $reading_topic = $db->get('course_progress', "MAX(CourseTopicID) as CourseTopicID", "CourseID=" . $course_details['ID'] . " AND StudentID=$user_id", "ID DESC");
    $reading_topics = $db->get_all('course_progress', "CourseTopicID", "CourseID=" . $course_details['ID'] . " AND StudentID=$user_id", "ID DESC");


    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;
        $request->courseTopics = $course_topics;
        $request->courseDetails = $course_details;
        $request->readingTopics = !empty($reading_topics) ? array_column($reading_topics, 'CourseTopicID') : array();
        $request->readingTopic = $reading_topic['CourseTopicID'] ? $reading_topic['CourseTopicID'] : 0;
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
