
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();


require '../vendor/autoload.php';

use Razorpay\Api\Api;


$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $orderID   = $data->orderID;
    $carttotal = $data->carttotal;
    $fullName  = $data->fullName;
    $mobile    = $data->mobile;
    $address   = $data->address;
    $city      = $data->city;
    $district  = $data->district;
    $state     = $data->state;
    $email     = $data->email;
    $studentid = $data->studentid;



    // $state = $data->state;
    // $user_id = $data->user_id??1;

    if (!empty($fullName)) {
        $location_data = array(
            'Amount'    => $carttotal,
            'OrderID'   => $orderID,
            'Name'      => $fullName,
            'Mobile'    => $mobile,
            'Address'   => $address,
            'City'      => $city,
            'District'  => $district,
            'State'     => $state,
            'OrderedAt' => $core->datetime,
            'Email'     => $email,
            'CustomerID' => $studentid
        );
        $location_id = $db->add('orders', $location_data);















        if ($location_id > 0) {

            $api = new Api('rzp_live_alSEQCIAcZlsGx', 'Yans2gX3A7u91gkpdMiwRu2A');
            // if (isset($_POST)) {
            // $post_amount = (int)$_POST['amount'];
            // $post_cause = $_POST['cause'];
            // $post_currency = $_POST['currency'];
            // $post_email = $_POST['email'];
            // $post_mobile = $_POST['mobile'];
            // $post_zip = $_POST['zip'];
            // $post_pan = $_POST['pan'];
            // $post_address = $_POST['address'];
            // $post_fullname = $_POST['fullname'];
            // $post_donation_type = $_POST['donation_type'];
            // $post_tenure = $_POST['tenure'];

            // if ($post_donation_type === 'Monthly') {
            //     $plan = $api->plan->create(
            //         array(
            //             'period' => 'monthly',
            //             'interval' => 1,
            //             'item' => array(
            //                 'name' => $post_cause,
            //                 'description' => $post_cause,
            //                 'amount' => $post_amount * 100,
            //                 'currency' => 'INR'
            //             )
            //         )
            //     );

            //     $subscription  = $api->subscription->create(
            //         array(
            //             'plan_id' => $plan->id,
            //             'customer_notify' => 1,
            //             'total_count' => (int)$post_tenure,
            //             // 'start_at' => time() + 1800,
            //         )
            //     );

            //     $razorpaySubscriptionId = $subscription['id'];
            //     $_SESSION['razorpay_subscription_id'] = $razorpaySubscriptionId;


            //     $data = [
            //         "key"               => $razorpay_key,
            //         "subscription_id"   => $razorpaySubscriptionId,
            //         "name"              => $post_cause,
            //         "description"       => $post_cause,
            //         "image"             => "https://i.pinimg.com/736x/f6/d0/af/f6d0af482a5a1116dbbd2fd3ff95e58c.jpg",
            //         "prefill"           => [
            //             "name"              => $post_fullname,
            //             "email"             => $post_email,
            //             "contact"           => $post_mobile,
            //         ],
            //         "notes"             => [
            //             "fullname"           => $post_fullname,
            //             "address"           => $post_address,
            //             "zip"           => $post_zip,
            //             "pan"           => $post_pan,
            //             "donation_id" => $_SESSION['donation_id'],
            //         ],
            //         "theme"             => [
            //             "color"             => "#F37254"
            //         ],
            //     ];
            // } else {

            $razorpayOrder = $api->order->create(
                array(
                    'receipt'         => $orderID,
                    'amount'          => (int)$carttotal * 100,
                    'currency'        => 'INR',
                    'payment_capture' => 1 // auto capture
                )
            );

            $razorpayOrderId = $razorpayOrder['id'];
            $_SESSION['razorpay_order_id'] = $razorpayOrderId;


            $data = [
                "key"               => "rzp_test_ly0V7RpJyN5k3D",
                "amount"            => $carttotal,
                "name"              => $orderID, //OrderID
                "description"       => $orderID,
                "image"             => "https://i.pinimg.com/736x/f6/d0/af/f6d0af482a5a1116dbbd2fd3ff95e58c.jpg",
                "prefill"           => [
                    "name"              => $fullName,
                    "email"             => $email,
                    "contact"           => $mobile,
                ],
                "notes"             => [
                    "fullname"      => $fullName,
                    "address"       => $address,
                    "city"          => $city,
                    "district"      => $district,
                    "state"         => $state,
                    // "zip"           => $post_zip,
                    // "pan"           => $post_pan,
                    "orderID" => $orderID,
                ],
                "theme"             => [
                    "color"             => "#F37254"
                ],
                "order_id"          => $razorpayOrderId,
            ];
            // }

            $json = json_encode($data);
            echo $json;
            // }
















            // echo $location_id;


            // $request->meta = [
            //     "error" => false,
            //     "message" => 'Bulk order deatils received successfully'
            // ];
            // $request->id = $location_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
            echo json_encode($request);
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing'
        ];
        echo json_encode($request);
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];

    echo json_encode($request);
}
