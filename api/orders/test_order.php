<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
    jQuery(document).ready(function() {
        jQuery('input:radio[name="item_name"]').click(function() {
            jQuery(this).parent().parent(".reason").children('.payment-format').remove();
            jQuery(this).parent().parent(".reason").children('.payment-cycle').remove();
            jQuery("#razorpay-details").hide();
            jQuery("#recurring-input-div").hide();
            jQuery("#recurring-input").hide();
            jQuery('input[name="payment-cycle"]').prop('checked', false);
            jQuery(".payment-cycle").hide();
            jQuery(this).parent().parent(".reason").append(`<section class="payment-format">
                                <b>Select Currency</b><br />
                                <input type="radio" name="payment-format" ng-model="currency" value="INR" />
                                <label for="payment-format1">INR</label>
                                <input type="radio" name="payment-format" ng-model="currency" value="USD" />
                                <label for="payment-format2">USD</label>
                            </section>`);
        })
        jQuery('.reason').on('change', 'input:radio[name="payment-format"]', function() {
            if (jQuery('input:radio[name="payment-format"]:checked').val() == 'INR') {
                // jQuery(jQuery('input:radio[name="payment-format"]:checked')).parent().parent(".reason").append(`
                //             <section class="payment-cycle" >
                //                 <b>Donation Type</b><br />
                //                 <input type="radio" id="payment-cycle1" name="payment-cycle" value="Once" />
                //                 <label for="payment-cycle1">Once</label>
                //                 <input type="radio" id="payment-cycle2" name="payment-cycle" value="Monthly" />
                //                 <label for="payment-cycle2">Monthly</label>
                //             </section>`);
                jQuery("#razorpay-details").show();
                jQuery("#recurring-input-div").hide();
                jQuery("#recurring-input").attr('required', false);
                jQuery("#donatebtn").hide();
            }
            if (jQuery('input:radio[name="payment-format"]:checked').val() == 'USD') {
                jQuery("#donatebtn").show()
                jQuery("#razorpay-details").hide();
                jQuery("#recurring-input-div").hide();
                jQuery("#recurring-input").hide();
                jQuery('input[name="payment-cycle"]').prop('checked', false);
                jQuery(".payment-cycle").hide();
                // jQuery('input[name="payment-format"]').prop('checked', false);
                // jQuery(".payment-format").hide();
            }
        });
        jQuery('.reason').on('change', 'input:radio[name="payment-cycle"]', function() {
            if (jQuery('input:radio[name="payment-cycle"]:checked').val() == 'Once') {
                jQuery("#razorpay-details").show();
                jQuery("#recurring-input-div").hide();
                jQuery("#recurring-input").attr('required', false);
            }
            if (jQuery('input:radio[name="payment-cycle"]:checked').val() == 'Monthly') {
                jQuery("#razorpay-details").show();
                jQuery("#recurring-input-div").show();
                jQuery("#recurring-input").attr('required', true);
            }
        });
        jQuery("#iqv3").click(function() {
            jQuery("#input_amount").val(100);
        })
        jQuery("#iqv1").click(function() {
            jQuery("#input_amount").val(500);
        })
        jQuery("#iqv2").click(function() {
            jQuery("#input_amount").val(1000);
        })

    });
</script>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
    // Checkout details as a json
    $("#rzp-button").click(function(e) {
        e.preventDefault();
        var cause = $('input:radio[name="item_name"]:checked').val();
        var currency = $(".input_currency_format").val();
        var amount = $(".input_amount").val();
        var email = $(".input_email").val();
        var zip = $(".input_zip").val();
        var pan = $(".input_pan").val();
        var address = $(".input_address").val();
        var fullname = $(".input_fullname").val();
        var mobile = $(".input_mobile").val();
        var employee_id = $(".input_employee_id").val();
        if ($(".input_tenure").val() != '') {
            var tenure = $(".input_tenure").val();
        } else {
            var tenure = 1;
        }
        var donation_type = $('input:radio[name="payment-cycle"]:checked').val();
        if (cause != '' && currency != '' && amount != '' && email != '' && employee_id != '' && fullname != '' && mobile != '' && donation_type != '' && pan != '') {
            $("#fill_message").hide();
            $.post(
                "/create_order", {
                    cause: cause,
                    currency: currency,
                    amount: amount,
                    email: email,
                    zip: zip,
                    pan: pan,
                    address: address,
                    fullname: fullname,
                    mobile: mobile,
                    tenure: tenure,
                    donation_type: donation_type,
                    reference: employee_id
                },
                function(result) {
                    pay(result);
                }
            );
        } else {
            $("#fill_message").show();
        }
    });

    function pay(json_result) {
        var options = JSON.parse(json_result);
        // console.log(options)
        /**
         * The entire list of Checkout fields is available at
         * https://docs.razorpay.com/docs/checkout-form#checkout-fields
         */
        options.handler = function(response) {
            document.getElementById("razorpay_payment_id").value = response.razorpay_payment_id;
            document.getElementById("razorpay_signature").value = response.razorpay_signature;
            document.razorpayform.submit();
        };

        // Boolean whether to show image inside a white frame. (default: true)
        // options.theme.image_padding = false;

        options.modal = {
            ondismiss: function() {
                console.log("This code runs when the popup is closed");
            },
            // Boolean indicating whether pressing escape key
            // should close the checkout form. (default: true)
            escape: true,
            // Boolean indicating whether clicking translucent blank
            // space outside checkout form should close the form. (default: false)
            backdropclose: false,
        };

        var rzp = new Razorpay(options);
        rzp.open();
    }
</script>