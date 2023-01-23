<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;

$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);

  $email = $request->email;
  $mobile = $request->mobile;
  $message = $request->message;
  $isActive = 'Yes';
  $CreatedAt = $core->datetime;

  $sql = $db->sql("INSERT INTO `messages`(`email`, `mobile`, `message`,  `isActive`, `CreatedAt`) VALUES ('$email','$mobile','$message','$isActive','$CreatedAt')");

  if ($sql === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Sorry message not sent";
  }
}
