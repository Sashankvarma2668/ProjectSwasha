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
    $course_slug = $data->course;
    $user_id = $data->user_id;
    $answers = $data->answers ?? '';

    if (!empty($user_id)) {
        $course_data = $db->get('courses', "Title,ID", "Slug='$course_slug'");
        $course_id = $course_data['ID'];
        if (!empty($course_data)) {
            $questions_data = $db->get_all('quiz', "*", "CourseID=$course_id AND Status='Active' AND isActive='Yes'");
            $total_questions = $db->count('quiz', "ID", "CourseID=$course_id AND Status='Active' AND isActive='Yes'");
            $quiz_status = true;
            $quiz_result = array();
            $correct_answers = 0;
            $points_added = false;
            $increased_points = 0;

            if (!empty($answers) && (count($answers) > 0)) {
                foreach ($answers as $key => $value) {
                    $delete_progress_data = $db->delete('quiz_progress', "StudentID='$user_id' AND QuestionID='$value->id'");
                    $check_answer = $db->get('quiz', 'Answer', "ID='$value->id'");
                    $answer_result = $check_answer['Answer'] == $value->answer ? "Correct" : "Wrong";
                    $update_array = array(
                        'CourseID' => $course_id,
                        'QuestionID' => $value->id,
                        'Answer' => $value->answer,
                        'Result' => $answer_result,
                        'Time' => 120 - $value->time,
                        'StudentID' => $user_id,
                        'CreatedAt' => $core->datetime
                    );
                    $update = $db->add('quiz_progress', $update_array);
                }

                $correct_answers = $db->count('quiz_progress', 'ID', "StudentID=$user_id AND CourseID=$course_id AND Result='Correct'");
                $wrong_answers = $db->count('quiz_progress', 'ID', "StudentID=$user_id AND CourseID=$course_id AND Result='Wrong'");
                $quiz_json_data = $db->get_all('quiz_progress', '*', "CourseID=$course_id AND StudentID=$user_id");
                $quiz_attempt = $db->count('quiz_status', 'ID', "CourseID=$course_id AND StudentID=$user_id");
                $total_quiz_time = $db->get('quiz_progress', 'SUM(Time) as time', "CourseID=$course_id AND StudentID=$user_id")['time'];
                $total_correct_answers_time = $db->get('quiz_progress', 'SUM(Time) as time', "CourseID=$course_id AND StudentID=$user_id AND Result='Correct'")['time'];
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
                $total_correct_answers_points = $correct_answers * 5;
                $total_correct_answers_time_points = ((($correct_answers * 120) - $total_correct_answers_time) / 60) * 2;
                $quiz_total_points = round($total_correct_answers_points + $total_correct_answers_time_points);
                // $quiz_total_points = round(($correct_answers * 5) + ((((($correct_answers + $wrong_answers) * 120) - $total_quiz_time) / 60) * 2));
                if ($check_points == 0) {
                    $add_points_array = array(
                        'ReferenceID' => $course_id,
                        'ReferenceType' => 'Chapter',
                        'StudentID' => $user_id,
                        'Points' => $quiz_total_points,
                        'CreatedAt' => $core->datetime
                    );
                    $add_points = $db->add('reward_points', $add_points_array);
                    $increased_points = $quiz_total_points;
                    $points_added = true;
                } else if ($get_prev_points['Points'] < $quiz_total_points) {
                    $points_added = true;
                    $update_points = $db->update('reward_points', array('Points' => $quiz_total_points), "ReferenceID=$course_id AND ReferenceType='Chapter' AND StudentID=$user_id");
                    $increased_points = $quiz_total_points - $get_prev_points['Points'];
                } else {
                    $increased_points = 0;
                }
            }
            $check_quiz_exist = $db->count('quiz_progress', 'ID', "CourseID=$course_id AND StudentID=$user_id");
            if ($check_quiz_exist > 0) {
                $join_array = array(
                    array(
                        "type" => 'LEFT JOIN',
                        'table' => 'quiz',
                        'as' => 'q',
                        "on" => 'qp.QuestionID=q.ID'
                    )
                );
                $quiz_result = $db->join_all("quiz_progress", "qp", "q.*,qp.Answer as 'StudentAnswer'", $join_array, "qp.StudentID=$user_id AND qp.CourseID=$course_id");
                $correct_answers = $db->count('quiz_progress', 'ID', "StudentID=$user_id AND CourseID=$course_id AND Result='Correct'");
                $quiz_status = false;
            }
            $quiz_attempt = $db->count('quiz_status', 'ID', "CourseID=$course_id AND StudentID=$user_id");

            $request->meta = [
                "error" => false,
                "message" => 'successfull',
            ];

            $request->questionsData = $questions_data;
            $request->courseData = $course_data;
            $request->quizStatus = $quiz_status;
            $request->quizResult = $quiz_result;
            $request->correctAnswers = $correct_answers;
            $request->pointsAdded = $points_added;
            $request->quizAttempt = $quiz_attempt;
            $request->increasedPoints = $increased_points;
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Module not found'
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Please login to continue, already logged in once logout and login again.'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No values posted'
    ];
}
echo json_encode($request);
