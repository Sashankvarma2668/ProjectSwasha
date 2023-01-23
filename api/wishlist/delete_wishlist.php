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


    $studentid = $data-> studentid;
    $productid = $data-> productid;
    
    $delete = $db->delete('wishlist', "CustomerID=$studentid AND ProductID=$productid");
    
    $request->meta = [
        "error" => false,
        "message" => 'Successfull',
    ];
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
