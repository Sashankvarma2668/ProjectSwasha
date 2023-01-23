
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

    $firstname = $data->firstname;
    $lastname  = $data->lastname;
    $country   = $data->country;
    $email     = $data->email;
    $company   = $data->company;
    $quantity  = $data->quantity;

   
    // $state = $data->state;
    // $user_id = $data->user_id??1;

    if (!empty($firstname)  && !empty($lastname) && !empty($country) && !empty($quantity) && !empty($company) && !empty($email) ) {
        $location_data = array(
            'FirstName' => $firstname,
            'LastName'  => $lastname,
            'Email'     => $email,
            'Country'   => $country,
            'Company'   => $company,
            'Quantity'  => $quantity,
            'CreatedAt' => $core->datetime
        );
        $location_id = $db->add('bulkform', $location_data);

        if ($location_id > 0) {
            $request->meta = [
                "error" => false,
                "message" => 'Bulk order deatils received successfully'
            ];
            $request->id = $location_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
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