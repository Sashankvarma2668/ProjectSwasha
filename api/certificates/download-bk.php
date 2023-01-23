<?php
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: image/png");
header("Content-Transfer-Encoding: Binary");
if (isset($_GET['sdsacdc'])) {
    $course_id = $_GET['course_id'];
    $user_id = $_GET['user_id'];
    $student_data = $db->get('students', "*", "ID=$user_id");
    $course_data = $db->get('course_levels', "*", "ID=$course_id");
    $condition = "StudentID=$user_id AND CourseID=$course_id";
    $response = $db->get('certificate_status', "*", $condition);
    if (!empty($response)) {
        if ($response['Percentage'] >= 35) {
            header("Content-disposition: attachment; filename=\"" . basename('Certificate-' . $course_data['Title'] . '-' . $student_data['ID'] . ".png") . "\"");
            $name = strtoupper($student_data['FullName']);
            $name_len = strlen($name);
            $image = "basic-certificate.png";
            $createimage = imagecreatefrompng($image);
            $output = 'Certificate-' . $course_data['Title'] . '-' . $student_data['ID'] . ".png";
            $white = imagecolorallocate($createimage, 205, 245, 255);
            $black = imagecolorallocate($createimage, 0, 0, 0);
            $rotation = 0;
            $origin_x = 140;
            $origin_y = 710;
            $font_size = 80;

            // $origin1_x = 670;
            // $origin1_y = 785;
            // $purpose = $course_data['Title'] . ",";
            // $font_size_purpose = 30;
            // $purpose_color = imagecolorallocate($createimage, 56, 189, 248);

            // $origin2_x = 390;
            // $origin2_y = 830;
            // $date = date("F d, Y", strtotime($response['CreatedAt'])) . ".";
            // $font_size_date = 25;
            // $date_color = imagecolorallocate($createimage, 56, 189, 248);
            // if ($name_len <= 7) {
            //     $font_size = 25;
            //     $origin_x = 190;
            // } elseif ($name_len <= 12) {
            //     $font_size = 30;
            // } elseif ($name_len <= 15) {
            //     $font_size = 26;
            // } elseif ($name_len <= 20) {
            //     $font_size = 18;
            // } elseif ($name_len <= 22) {
            //     $font_size = 15;
            // } elseif ($name_len <= 33) {
            //     $font_size = 11;
            // } else {
            //     $font_size = 10;
            // }
            $certificate_text = $name;
            $drFont = dirname(__FILE__) . "/Crimson-Bold.ttf";
            $drFont1 = dirname(__FILE__) . "/OpenSans-Italic.ttf";
            $text1 = imagettftext($createimage, $font_size, $rotation, $origin_x, $origin_y, $black, $drFont, $certificate_text);
            // $text2 = imagettftext($createimage, $font_size_purpose, $rotation, $origin1_x, $origin1_y, $purpose_color, $drFont1, $purpose);
            // $text3 = imagettftext($createimage, $font_size_date, $rotation, $origin2_x, $origin2_y, $date_color, $drFont1, $date);
            imagepng($createimage, $output, 3);
            echo readfile($output);
            imagedestroy($output);
            unlink($output);
        } else {
            referer();
        }
    } else {
        referer();
    }
} else {
    referer();
}
function referer()
{
    $referer = '';
    if (isset($_GET['referer'])) {
        $referer = $_REQUEST['referer'];
    } else {
        $referer = $_SERVER['HTTP_REFERER'];
    }
    header('Location:' . $referer);
}
