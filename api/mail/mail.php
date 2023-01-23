<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once "vendor/autoload.php";


if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $studentid = $data->studentid;
    $orderid = $data-> orderid;
    $fullName = $data->fullName;
    $email = $data-> email;
}
//PHPMailer Object
$mail = new PHPMailer(true); //Argument true in constructor enables exceptions

//From email address and name
$mail->From = "sashank.d@nirmaan.org";
$mail->FromName = "sashank D";

//To address and name
$mail->addAddress($email, $fullName);
// $mail->addAddress("recepient1@example.com"); //Recipient name is optional

//Address to which recipient will reply
$mail->addReplyTo("sashank.d@nirmaan.org", "Reply");

//CC and BCC

// $mail->addCC("cc@example.com");
// $mail->addBCC("bcc@example.com");

//Send HTML or Plain Text email
$mail->isHTML(true);

$mail->Subject = "Subject Text";
$mail->Body = "<i>Thanks for placing Your Order</i> ".$fullName."";
// $mail->AltBody = "This is the plain text version of the email content";

try {
    $mail->send();
    echo "Message has been sent successfully";
} catch (Exception $e) {
    echo "Mailer Error: " . $mail->ErrorInfo;
}