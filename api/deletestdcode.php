<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $id = $data->id ?? '';
    $condition = "";
    $condition .= $id ? "ProgramID=$id" : "";
    if (!empty($id)) {
        $response = $db->update('codesave', array('isActive' => 'no'), $condition);
    }
    if ($response === TRUE) {
        $request->meta = [
            "error" => false,
            "message" => 'Successfully deleted'
        ];
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Delete file error'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No inputs posted'
    ];
}
echo json_encode($request);