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

    $course_slug = $data->course_slug;
    $user_id = $data->user_id;

    $question_id = $data->question_id ?? '';
    $answer = $data->answer ?? '';

    $course_data = $db->get('courses', "Title,ID", "Slug='$course_slug'");
    $course_id = $course_data['ID'];


    if (!empty($question_id)) {
        $check_answer = $db->get('excersize', 'Answer', "ID=$question_id");
        $result = $check_answer['Answer'] == $answer ? "Correct" : "Wrong";
        $update_array = array(
            'CourseID' => $course_id,
            'QuestionID' => $question_id,
            'Answer' => $answer,
            'Result' => $result,
            'StudentID' => $user_id,
            'CreatedAt' => $core->datetime
        );
        $update = $db->add('exercise_progress', $update_array);
    }

    $total_questions = $db->count('excersize', "ID", "CourseID=$course_id");

    $condition = "StudentID=$user_id AND CourseID=$course_id";
    $response = $db->get_all('exercise_progress', "MAX(QuestionID) AS QuestionID", $condition);
    $progress_count = $db->count('exercise_progress', "ID", $condition);
    $question_no = $progress_count + 1;
    if ($response[0]['QuestionID'] > 0) {
        $next_question = $response[0]['QuestionID'] + 1;
    } else {
        $next_question = 1;
    }

    if ($total_questions >= $question_no) {
        $condition = "isActive='Yes' AND (ID >= $next_question)";
        $response = $db->get('excersize', "*", $condition,"ID DESC");
        // $total = $db->count('quiz', "ID", $condition);
        $quiz_status = true;
        $quiz_result = array();
        $correct_answers = 0;
    } else {
        $response = array();
        $total = 1;
        $quiz_status = false;
        $correct_answers = $db->count('exercise_progress', 'ID', "StudentID=$user_id AND CourseID=$course_id AND Result='Correct'");
        $join_array = array(
            array(
                "type" => 'LEFT JOIN',
                'table' => 'excersize',
                'as' => 'e',
                "on" => 'qp.QuestionID=e.ID'
            )
        );
        $quiz_result = $db->join_all("exercise_progress", "qp", "e.*,qp.Answer as 'StudentAnswer'", $join_array, "qp.StudentID=$user_id AND qp.CourseID=$course_id");
    }

    $request->meta = [
        "error" => false,
        "message" => 'successfull',
        "next" => $next_question
    ];
    $request->data = $response;
    $request->quizStatus = $quiz_status;
    $request->total = $total_questions;
    $request->quizResult = $quiz_result;
    $request->correctAnswers = $correct_answers;
    $request->courseTitle = $course_data['Title'];
    $request->courseID = $course_id;
    $request->questionNumber = $question_no;
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
