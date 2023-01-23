<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $fullname = $data->fullname;
    $mobile = $data->mobile;
    $email = strtolower($data->email);
    $gender = $data->gender;
    $password = $data->password;
    $country = $data->country;
    $state = $data->state;
    $district = $data->district;
    $city = $data->city;
    $area = $data->area;
    $address = $data->address;
    $school = $data->school;
    $class = $data->class;

    if (!empty($email) && !empty($mobile) && !empty($password)) {
        $check_email = $db->count('students', '*', "Email='$email'");
        // $check_mobile = $db->count('students', '*', "Mobile='$mobile'");
        // else if ($check_mobile > 0) {
        //     $request->meta = [
        //         "error" => true,
        //         "message" => 'Mobile number already exist.'
        //     ];
        // }
        if ($check_email > 0) {
            $request->meta = [
                "error" => true,
                "message" => 'Email Address already exist.'
            ];
        }  else {
            $student_data = array(
                'FullName' => ucwords($fullname),
                'Email' => $email,
                'Gender' => $gender,
                'Mobile' => $mobile,
                'Password' => hash('sha256', $password),
                'Country' => $country,
                'State' => $state,
                'District' => $district,
                'City' => $city,
                'Area' => $area,
                'Address' => $address,
                'School' => $school,
                'Class' => $class,
                'isActive' => 'Yes',
                'Status' => 'Active',
                'CreatedAt' => $core->datetime
            );

            $student_insert_id = $db->add('students', $student_data);

            if ($student_insert_id > 0) {
                $student_update = $db->update('students', array('UniqueID' => 'NLP' . sprintf('%06d', $student_insert_id)), "ID=$student_insert_id");
                $condition = "ID='$student_insert_id'";
                $response = $db->get('students', "*", $condition);
                $request->meta = [
                    "error" => false,
                    "message" => 'Account Successfully Created.'
                ];
                $request->data = $response;
                $request->id = $student_insert_id;
            } else {
                $request->meta = [
                    "error" => true,
                    "message" => 'Something Error'
                ];
            }
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];
}
echo json_encode($request);
