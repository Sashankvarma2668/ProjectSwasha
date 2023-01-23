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


    $user_id = $_POST['user_id'];
    $fullname = $_POST['fullname'];
    $mobile = $_POST['mobile'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];

    //checking if email ID is already assigned to other user
    $condition1 = "Email='$email' AND ID!=".$user_id;

    $response1 = $db->get('students', "*", $condition1);
    $total1 = $db->count('students', "ID", $condition1);
    if ($total1 > 0) {       
       // $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Emai ID already in use'
        ];
        echo json_encode($request);exit;
    }

    $country = $db->get('students','Country',"ID=$user_id")['Country'];






    if ($country === 'IND') {

        $state = $_POST['state'];
        $district = $_POST['district'];
        $city = $_POST['city'];
        $area = $_POST['area'];
       
    } else {
        $address = $_POST['address'];
      
    }

    $school = $_POST['school'];
    $myclass = $_POST['my_class'];
   

    $update_data = array(
        'FullName' => ucwords($fullname),
        'Mobile' => $mobile,
        'School' => $school,
        'Class' => $myclass,
        'Gender' => $gender,
        'Email' => $email,
    );



    if(isset($_FILES['file'])){
        $photo_name = $_FILES['file'];
        $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg'));
        if ($photo_upload['status'] == 'success') {
           $photo = $photo_upload['path'];
                } else {
                    $photo = '';
                }
                $update_data['Image'] = $photo;
            }



    if ($country === 'IND') {
        $update_data['State'] = $state;
        $update_data['District'] = $district;
        $update_data['City'] = $city;
        $update_data['Area'] = $area;
    } else {
        $update_data['Address'] = $address;
    }




    $condition = "ID='$user_id'";
    $update_student = $db->update('students', $update_data, $condition);
    $response = $db->get('students', "*", $condition);

    if ($update_student === TRUE) {
        $request->meta = [
            "error" => false,
            "message" => 'Profile successfully updated!'
        ];
        $request->data = $response;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Wrong User ID'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);


