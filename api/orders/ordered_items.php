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
    $quantity = $data->quantity;
    $productid = $data->productid;
    $producttotal = $data->producttotal;
    $orderID = $data->orderID;
    $studentid = $data->studentid;

    // $state = $data->state;
    // $user_id = $data->user_id??1;

    if (!empty($quantity)) {
        $location_data = array(
            'Quantity' => $quantity,
            'ProductID' =>  $productid,
            'CustomerID' => $studentid,
            'Producttotal' => $producttotal,
            'OrderID' => $orderID,
        );
        $location_id = $db->add('ordered_items', $location_data);

        if ($location_id > 0) {
            $request->meta = [
                "error" => false,
                "message" => 'Asset Type successfully Added'
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