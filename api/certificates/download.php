<?php
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
// header("Content-Type: image/png");
// header("Content-Transfer-Encoding: Binary");
if (isset($_GET)) {
    $course_id = $_GET['course_id'];
    $user_id = $_GET['user_id'];
    $student_data = $db->get('students', "*", "ID=$user_id");
    $course_data = $db->get('course_levels', "*", "ID=$course_id");
    $condition = "StudentID=$user_id AND CourseID=$course_id";
    $response = $db->get('certificate_status', "MAX(Percentage) as 'Percentage'", $condition);
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
            if ($response['Percentage'] >= 80) {
                $grade = "excellent";
            } else if ($response['Percentage'] >= 50) {
                $grade = "good";
            } else {
                $grade = "satisfactory";
            }
            $rotation = 0;
            $certificate_text = $name;
            $sub_text = $student_data['FullName'] . " scored " . $grade . " in the final assessment";
            $sub_text_len = strlen($sub_text);
            $sub_font_size = 30;
            $drFont = dirname(__FILE__) . "/OpenSans-Medium.ttf";
            $drFont2 = dirname(__FILE__) . "/Cardo-Regular.ttf";
            if ($name_len <= 7) {
                $font_size = 70;
            } elseif ($name_len <= 12) {
                $font_size = 60;
            } elseif ($name_len <= 15) {
                $font_size = 50;
            } elseif ($name_len <= 20) {
                $font_size = 40;
            } elseif ($name_len <= 22) {
                $font_size = 30;
            } elseif ($name_len <= 33) {
                $font_size = 20;
            } else {
                $font_size = 10;
            }
            // Get image dimensions
            $width = imagesx($createimage);
            $height = imagesy($createimage);
            // Get center coordinates of image
            $centerX = $width / 2;
            $centerY = $height / 2;
            // Get size of text
            list($left, $bottom, $right,,, $top) = imageftbbox($font_size, $rotation, $drFont, $certificate_text);
            // Determine offset of text
            $left_offset = ($right - $left) / 2;
            $top_offset = ($bottom - $top) / 2;
            // Generate coordinates
            $origin_x = (int) ($centerX - $left_offset);
            // $origin_y = (int) ($centerY + $top_offset);
            $origin_y = 650;
            
            list($sub_left, $sub_bottom, $sub_right,,, $sub_top) = imageftbbox($sub_font_size, $rotation, $drFont2, $sub_text);
            $sub_left_offset = ($sub_right - $sub_left) / 2;
            $sub_top_offset = ($sub_bottom - $sub_top) / 2;
            // Generate coordinates
            $sub_origin_x = (int) ($centerX - $sub_left_offset);
            // $origin_y = (int) ($centerY + $top_offset);
            $sub_origin_y = 960;
            $text1 = imagettftext($createimage, $font_size, $rotation, $origin_x, $origin_y, $black, $drFont, $certificate_text);
            $text2 = imagettftext($createimage, $sub_font_size, $rotation, $sub_origin_x, $sub_origin_y, $black, $drFont2, $sub_text);
            imagepng($createimage, $output, 3);
            echo readfile($output);
            unlink($output);
            // imagedestroy($output);
        } else {
            referer();
            // echo 'percentage';
        }
    } else {
        referer();
        // echo 'No Response';
    }
} else {
    referer();
    // echo 'GET';
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
