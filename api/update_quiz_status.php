<!DOCTYPE html>
<html>
<body>
<?php
die();
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();

$students = $db->get_all('students', "ID", "1=1");

foreach ($students as $student_key => $student) {
    $get_quiz_progress = $db->get_all('quiz_progress', "DISTINCT CourseID", "StudentID='" . $student['ID'] . "'");
    if (!empty($get_quiz_progress)) {
        foreach ($get_quiz_progress as $quiz_key => $progress_value) {
            $course_id = $progress_value['CourseID'];
            $student_id = $student['ID'];
            $total_questions = $db->count('quiz', "ID", "CourseID=$course_id");
            $total_answers = $db->count('quiz_progress', "ID", "CourseID=$course_id AND StudentID=$student_id");
            if ($total_questions === $total_answers) {
                $correct_answers = $db->count('quiz_progress', 'ID', "StudentID=$student_id AND CourseID=$course_id AND Result='Correct'");
                $wrong_answers = $db->count('quiz_progress', 'ID', "StudentID=$student_id AND CourseID=$course_id AND Result='Wrong'");
                $quiz_json_data = $db->get_all('quiz_progress', '*', "CourseID=$course_id AND StudentID=$student_id");
                $quiz_attempt = $db->count('quiz_status', 'ID', "CourseID=$course_id AND StudentID=$student_id");
                $total_quiz_time = $db->get('quiz_progress', 'SUM(Time) as time', "CourseID=$course_id AND StudentID=$student_id")['time'];
                $quiz_percentage = round(($correct_answers / ($correct_answers + $wrong_answers)) * 100, 2);
                $check_quiz_exists = $db->count('quiz_status', 'ID', "CourseID=$course_id AND StudentID=$student_id AND Percentage=$quiz_percentage AND Time='$total_quiz_time'");
                if ($check_quiz_exists == 0) {
                    $update_array = array(
                        'CourseID' => $course_id,
                        'StudentID' => $student_id,
                        'CorrectAnswers' => $correct_answers,
                        'WrongAnswers' => $wrong_answers,
                        'Attempt' => 1,
                        'Percentage' => $quiz_percentage,
                        'Time' => $total_quiz_time,
                        'QuestionsData' => json_encode($quiz_json_data),
                        'CreatedAt' => $core->datetime
                    );
                    $update = $db->add('quiz_status', $update_array);
                    echo '<div style="color: green"> >>> Status updated</div>';
                } else{
                    echo '<div style="color: red"> >>> Status already updated</div>';
                }
                $check_points = $db->count('reward_points', 'ID', "ReferenceID=$course_id AND ReferenceType='Chapter' AND StudentID=$student_id");
                $get_prev_points = $db->get('reward_points', 'Points', "ReferenceID=$course_id AND ReferenceType='Chapter' AND StudentID=$student_id");
                $quiz_total_points = round(($correct_answers * 5) + ((((($correct_answers + $wrong_answers) * 120) - $total_quiz_time) / 60) * 2));
                if ($check_points == 0) {
                    $add_points_array = array(
                        'ReferenceID' => $course_id,
                        'ReferenceType' => 'Chapter',
                        'StudentID' => $student_id,
                        'Points' => $quiz_total_points,
                        'CreatedAt' => $core->datetime
                    );
                    $add_points = $db->add('reward_points', $add_points_array);
                    echo '<div style="color: green"> @@@ Points added</div>';
                } else if ($get_prev_points['Points'] < $quiz_total_points) {
                    $update_points = $db->update('reward_points', array('Points' => $quiz_total_points), "ReferenceID=$course_id AND ReferenceType='Chapter' AND StudentID=$student_id");
                    $increased_points = $quiz_total_points - $get_prev_points['Points'];
                    echo '<div style="color: yellow">Points increased</div>';
                } else {
                    echo '<div style="color: red">Points not added</div>';
                }
            }
        }
    }
}
?>
</body>
</html>