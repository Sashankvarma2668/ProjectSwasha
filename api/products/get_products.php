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

    // var_dump($data);
    // exit;


    $search = $data->search ?? '';
    $state = $data->state ?? '';
    $filterlocation = $data->filterlocation ?? '';


    $condition = "isActive='yes'";
    $condition .= $search ? " AND (ProductName LIKE '%" . $search . "%' OR  Category LIKE '%" . $search . "%' )" : "";
    // $condition .= $filterlocation1 ? " AND (Locations = '$filterlocation1')" : "";
    $condition .= $state ? " AND (Category = '$state')" : "";
    $condition .= $filterlocation ? " AND (Locations = '$filterlocation')" : "";
   
    // $response = $db->sql("SELECT * FROM `students`");
    $response = $db->get_all('products', "*",$condition);
    $total = $db->count('products', "ID",$condition);

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request-> data = $response;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Wrong Username or password'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);