<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();

$schools = $db->get_all('schools', '*', "Status='Active' AND isActive='Yes'");
$request->meta = [
    "error" => false,
    "message" => 'Successfull',
];
$request->schools = $schools;

echo json_encode($request);
