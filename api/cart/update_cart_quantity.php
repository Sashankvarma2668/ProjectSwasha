
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

    // $edit_user_id = $data->edit_user_id??'';

    $quantity  = $data->quantity ??"";
    $studentid = $data->studentid ??"";
    $productid = $data->productid??'';
    $producttotal = $data->producttotal??'';

   
    
          $user_data = array(
            'Quantity' => $quantity,
            'Producttotal' => $producttotal,
                      
        );
       


        $user_update = $db->update('cart', $user_data, "CustomerID=$studentid AND ProductID=$productid");

      



        if ($user_update===TRUE) {
            $request->meta = [
                "error" => false,
                "message" => 'User successfully updated'
            ];
            $request->id = $edit_user_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
  
}

echo json_encode($request);











