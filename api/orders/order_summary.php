
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
    $customerid = $data->c_id;
    $orderid = $data->orderID;
    $condition = "o.OrderID='$orderid' AND o.CustomerID = '$customerid'";




    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'products',
            'as' => 'p',
            "on" => 'p.ID=o.ProductID'
        ),
        
        
      
    );




//here courses is table were we want all fields and course_modules table we want only one field module title we combine two tables by  "on" => // 'm.ID=c.CourseModuleID' as ID of course_module is equal to the CourseModuleID of course table

 
    $response = $db->join_all('ordered_items', 'o', "o.*,p.ProductName,p.Category,p.URL,p.Price", $join_array, $condition);
    $total = $db->join_count('ordered_items', 'o', "o.ID", $join_array, $condition);


   
    // $response = $db->sql("SELECT * FROM `students`");
    // $response = $db->get('students', "*", $condition);
    // $total = $db->count('students', "ID");

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;
        $request->total = $total;


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




































