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

    $module_id = $data->course_slug;
    $user_id = $data->user_id;

    $question_id = $data->question_id ?? '';
    $answer = $data->answer ?? '';
    $time = $data->time ?? '';
    $quiz_init = $data->quiz_init ?? '';
    $quiz_attempt_in = $data->quiz_attempt ?? '';

    $module_data = $db->get('course_modules', "ModuleTitle,ID", "ID='$module_id'");

    if (!empty($question_id)) {
        $check_answer = $db->get('quiz1', 'Answer', "ID=$question_id");
        $result = $check_answer['Answer'] == $answer ? "Correct" : "Wrong";
        $update_array = array(
            'CourseID' => $module_id,
            'QuestionID' => $question_id,
            'Answer' => $answer,
            'Result' => $result,
            'Time' => 120 - $time,
            'StudentID' => $user_id,
            'CreatedAt' => $core->datetime
        );
        $update = $db->add('module_quiz_progress', $update_array);
    }

    $total_questions = $db->count('quiz1', "ID", "CourseID=$module_id");

    $condition = "StudentID=$user_id AND CourseID=$module_id";
    $response = $db->get_all('module_quiz_progress', "MAX(QuestionID) AS QuestionID", $condition);
    $progress_count = $db->count('module_quiz_progress', "ID", $condition);

    if ($quiz_init === true && $progress_count < $total_questions) {
        $db->delete('module_quiz_progress', "StudentID=$user_id AND CourseID=$module_id");
    }

    $question_no = $progress_count + 1;
    if (!empty($response)) {
        if ($response[0]['QuestionID'] > 0) {
            $next_question = $response[0]['QuestionID'] + 1;
        } else {
            $next_question = 1;
        }
    } else {
        $next_question = 1;
    }

    if ($total_questions >= $question_no) {
        $condition = "isActive='Yes' AND (ID = $next_question OR ID > $next_question) AND CourseID=$module_id";
        $response = $db->get('quiz1', "*", $condition, "ID DESC");
        // $total = $db->count('quiz', "ID", $condition);
        $quiz_status = true;
        $quiz_result = array();
        $correct_answers = 0;
        $points_added = false;
        $increased_points = 0;
        $quiz_attempt = $db->count('module_quiz_status', 'ID', "CourseID=$module_id AND StudentID=$user_id");
    } else {
        $response = array();
        $total = 1;
        $quiz_status = false;
        $correct_answers = $db->count('module_quiz_progress', 'ID', "StudentID=$user_id AND CourseID=$module_id AND Result='Correct'");

        $join_array = array(
            array(
                "type" => 'LEFT JOIN',
                'table' => 'quiz1',
                'as' => 'q',
                "on" => 'qp.QuestionID=q.ID'
            )
        );
        $quiz_result = $db->join_all("module_quiz_progress", "qp", "q.*,qp.Answer as 'StudentAnswer'", $join_array, "qp.StudentID=$user_id AND qp.CourseID=$module_id");

        $wrong_answers = $db->count('module_quiz_progress', 'ID', "StudentID=$user_id AND CourseID=$module_id AND Result='Wrong'");
        $quiz_json_data = $db->get_all('module_quiz_progress', '*', "CourseID=$module_id AND StudentID=$user_id");
        $quiz_attempt = $db->count('module_quiz_status', 'ID', "CourseID=$module_id AND StudentID=$user_id");
        $total_quiz_time = $db->get('module_quiz_progress', 'SUM(Time) as time', "CourseID=$module_id AND StudentID=$user_id")['time'];
        $quiz_percentage = round(($correct_answers / ($correct_answers + $wrong_answers)) * 100, 2);
        $check_quiz_exists = $db->count('module_quiz_status', 'ID', "CourseID=$module_id AND StudentID=$user_id AND Percentage=$quiz_percentage AND Time='$total_quiz_time'");

        if ($check_quiz_exists == 0) {
            $update_array = array(
                'CourseID' => $module_id,
                'StudentID' => $user_id,
                'CorrectAnswers' => $correct_answers,
                'WrongAnswers' => $wrong_answers,
                'Attempt' => $quiz_attempt + 1,
                'Percentage' => $quiz_percentage,
                'Time' => $total_quiz_time,
                'QuestionsData' => json_encode($quiz_json_data),
                'CreatedAt' => $core->datetime
            );
            $update = $db->add('module_quiz_status', $update_array);
        }

        $check_points = $db->count('reward_points', 'ID', "ReferenceID=$module_id AND ReferenceType='Module' AND StudentID=$user_id");
        $get_prev_points = $db->get('reward_points', 'Points', "ReferenceID=$module_id AND ReferenceType='Module' AND StudentID=$user_id");
        $quiz_total_points = round(($correct_answers * 5) + ((((($correct_answers + $wrong_answers) * 120) - $total_quiz_time) / 60) * 2));
        if ($check_points == 0) {
            $add_points_array = array(
                'ReferenceID' => $module_id,
                'ReferenceType' => 'Module',
                'StudentID' => $user_id,
                'Points' => $quiz_total_points,
                'CreatedAt' => $core->datetime
            );
            $add_points = $db->add('reward_points', $add_points_array);
            $increased_points = $quiz_total_points;
            $points_added = true;
        } else if ($get_prev_points['Points'] < $quiz_total_points) {
            $update_points = $db->update('reward_points', array('Points' => $quiz_total_points), "ReferenceID=$module_id AND ReferenceType='Module' AND StudentID=$user_id");
            $increased_points = $quiz_total_points - $get_prev_points['Points'];
            $points_added = false;
        } else {
            $increased_points = 0;
            $points_added = false;
        }
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
    $request->courseTitle = $module_data['ModuleTitle'];
    $request->courseID = $module_id;
    $request->questionNumber = $question_no;
    $request->pointsAdded = $points_added;
    $request->quizAttempt = $quiz_attempt;
    $request->increasedPoints = $increased_points;
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
