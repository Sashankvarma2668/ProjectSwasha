<?php

use PhpOffice\PhpSpreadsheet\Writer\Ods\Content;

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

    $topic = $_POST['topic'] ?? '';
    $id = $_POST['id'] ?? '';

    $condition = "ID=$topic";
    $response = $db->get('course_topics', "Content", $condition);


    if (!empty($response)) {
        $content_data = json_decode($response['Content']);
        foreach ($content_data->blocks as $key => $value) {
            if($value->id==$id){
                $code = $value->data->code;
            }
        }
        
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $code;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'No Courses Available'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No level posted'
    ];
}
echo json_encode($request);
