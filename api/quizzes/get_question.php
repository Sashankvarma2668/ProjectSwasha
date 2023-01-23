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
    $time = $data->time ?? '';
    $quiz_init = $data->quiz_init ?? '';
    $quiz_attempt_in = $data->quiz_attempt ?? '';



    $course_data = $db->get('courses', "Title,ID", "Slug='$course_slug'");
    $course_id = $course_data['ID'];

    $total_questions = $db->count('quiz', "ID", "CourseID=$course_id");

    if (!empty($question_id)) {
        $check_answer = $db->get('quiz', 'Answer', "ID=$question_id");
        $result = $check_answer['Answer'] == $answer ? "Correct" : "Wrong";
        $update_array = array(
            'CourseID' => $course_id,
            'QuestionID' => $question_id,
            'Answer' => $answer,
            'Result' => $result,
            'Time' => 120 - $time,
            'StudentID' => $user_id,
            'CreatedAt' => $core->datetime
        );
        $update = $db->add('quiz_progress', $update_array);
    }

    $condition = "StudentID=$user_id AND CourseID=$course_id";
    $response = $db->get_all('quiz_progress', "MAX(QuestionID) AS QuestionID", $condition);
    $progress_count = $db->count('quiz_progress', "ID", $condition);

    if ($quiz_init === true && $progress_count < $total_questions) {
        $db->delete('quiz_progress', "StudentID=$user_id AND CourseID=$course_id");
    }

    $question_no = $progress_count + 1;
    if ($response[0]['QuestionID'] > 0) {
        $next_question = $response[0]['QuestionID'] + 1;
    } else {
        $next_question = 1;
    }
    if ($total_questions >= $question_no) {
        $condition = "isActive='Yes' AND (ID = $next_question OR ID > $next_question) AND CourseID=$course_id";
        $response = $db->get('quiz', "*", $condition, "ID DESC");
        // $total = $db->count('quiz', "ID", $condition);
        $quiz_status = true;
        $quiz_result = array();
        $correct_answers = 0;
        $points_added = false;
        $increased_points = 0;
        $quiz_attempt = $db->count('quiz_status', 'ID', "CourseID=$course_id AND StudentID=$user_id");
    } else {
        $response = array();
        $total = 1;
        $quiz_status = false;
        $correct_answers = $db->count('quiz_progress', 'ID', "StudentID=$user_id AND CourseID=$course_id AND Result='Correct'");
        $join_array = array(
            array(
                "type" => 'LEFT JOIN',
                'table' => 'quiz',
                'as' => 'q',
                "on" => 'qp.QuestionID=q.ID'
            )
        );
        $quiz_result = $db->join_all("quiz_progress", "qp", "q.*,qp.Answer as 'StudentAnswer'", $join_array, "qp.StudentID=$user_id AND qp.CourseID=$course_id");


        $wrong_answers = $db->count('quiz_progress', 'ID', "StudentID=$user_id AND CourseID=$course_id AND Result='Wrong'");
        $quiz_json_data = $db->get_all('quiz_progress', '*', "CourseID=$course_id AND StudentID=$user_id");
        $quiz_attempt = $db->count('quiz_status', 'ID', "CourseID=$course_id AND StudentID=$user_id");
        $total_quiz_time = $db->get('quiz_progress', 'SUM(Time) as time', "CourseID=$course_id AND StudentID=$user_id")['time'];
        $quiz_percentage = round(($correct_answers / ($correct_answers + $wrong_answers)) * 100, 2);
        $check_quiz_exists = $db->count('quiz_status', 'ID', "CourseID=$course_id AND StudentID=$user_id AND Percentage=$quiz_percentage AND Time='$total_quiz_time'");
        if ($check_quiz_exists == 0) {
            $update_array = array(
                'CourseID' => $course_id,
                'StudentID' => $user_id,
                'CorrectAnswers' => $correct_answers,
                'WrongAnswers' => $wrong_answers,
                'Attempt' => $quiz_attempt + 1,
                'Percentage' => $quiz_percentage,
                'Time' => $total_quiz_time,
                'QuestionsData' => json_encode($quiz_json_data),
                'CreatedAt' => $core->datetime
            );
            $update = $db->add('quiz_status', $update_array);
        }

        $check_points = $db->count('reward_points', 'ID', "ReferenceID=$course_id AND ReferenceType='Chapter' AND StudentID=$user_id");
        $get_prev_points = $db->get('reward_points', 'Points', "ReferenceID=$course_id AND ReferenceType='Chapter' AND StudentID=$user_id");
        $quiz_total_points = round(($correct_answers * 5) + ((((($correct_answers + $wrong_answers) * 120) - $total_quiz_time) / 60) * 2));
        if ($check_points == 0) {
            $add_points_array = array(
                'ReferenceID' => $course_id,
                'ReferenceType' => 'Chapter',
                'StudentID' => $user_id,
                'Points' => $quiz_total_points,
                'CreatedAt' => $core->datetime
            );
            $add_points = $db->add('reward_points', $add_points_array);
            $points_added = true;
            $increased_points = $quiz_total_points;
        } else if ($get_prev_points['Points'] < $quiz_total_points) {
            $update_points = $db->update('reward_points', array('Points' => $quiz_total_points), "ReferenceID=$course_id AND ReferenceType='Chapter' AND StudentID=$user_id");
            $increased_points = $quiz_total_points - $get_prev_points['Points'];
            $points_added = true;
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
    $request->courseTitle = $course_data['Title'];
    $request->courseID = $course_id;
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
