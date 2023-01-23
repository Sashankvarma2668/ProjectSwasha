
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
    
    $studentid = $data->s_id;
    $programid= $data->p_id;
    $filename = $data->file_name;
    $code_type = $data->code_type;
    $code = $data->code ;
    $condition = "ProgramID='$programid'";
   

    if (!empty($studentid)) {
        $location_data = array(
            'StudentID' =>  $studentid ,
            'ProgramID' => $programid,
            'Code' => $code,
            'Title' => $filename,
            'ProgramType' => $code_type,
            'CreatedAt' => $core->datetime,

         
           
           
        );
        $location_id = $db->update('codesave', $location_data,$condition);

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


