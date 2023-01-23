import React from 'react';
import Link from 'next/link';
import Header from '../template/header';
import Footer from '../template/footer';
import { cart_total } from '../Cart';
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { round,floor,random} from 'mathjs';
import Head from 'next/head';



const Index = () => {
  const router = useRouter();
  // var mytotal = round(1.1*carttotal);
  const [total,setTotal] = useState();
  const [studentid,setStudentId] = useState(StudentData().ID);
  const [studentData, setStudentData] = useState(StudentData());
  const [fullName, setFullName] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [state, setState] = useState();
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [carttotal,setcarttotal]=useState();
  const [cartdata,setCartData]= useState();
  const [cartcount,setCartCount] = useState();
  // const [iscouponvalid,setIsCouponValid] = useState(true);
 

  var orderID = Math.floor(100000000 + Math.random() * 900000000);
  Cookies.set('orderid',orderID);
  Cookies.set('ordertotal',carttotal);
  
  

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
  

const saveOrderDetails = (e)=>{
      
  e.preventDefault();

  


  axios
  .post(API_URL+"/orders/order_details.php" ,
  {
    carttotal : carttotal,
    fullName : fullName,
    mobile : mobile,
    address : address,
    city : city,
    district :district,
    state  : state,
    email : email,
    orderID : orderID,
    studentid : studentid
    

  })


  .then(function (response) {
     if(response) {
      
      //  router.push('/OrderSummary')
        const result = response;
      //   const res = await loadScript(
      //     "https://checkout.razorpay.com/v1/checkout.js"
      // );

      // if (!res) {
      //     alert("Razorpay SDK failed to load. Are you online?");
      //     return;
      // }
      if(result) {
      // const { amount, id: order_id, currency } = result.data;
      const amount = result.data.amount;
      const id = result.data.order_id;
      const currency = result.data.currency;



      const options = {
        key: "rzp_live_alSEQCIAcZlsGx", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Swasha Nirmaan",
        description: "Order ID : " + orderID,
        image: "https://i.pinimg.com/736x/f6/d0/af/f6d0af482a5a1116dbbd2fd3ff95e58c.jpg",
        order_id: id,
        handler: async function (response) {
            const data = {
                orderCreationId: id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            // const result = await axios.post("http://localhost:5000/payment/success", data);
            axios
            .post(API_URL+"/orders/update_payment_status.php",{
  
              studentid : studentid,
              orderID : orderID,
              paymentStatus : "success",
            })
            .then(function (response) {

            //  if(response?.data?.PaymentStatus == "success"){
            //   router.push('/OrderSummary')
            //  }

            if(response?.config?.data.includes("success")){
              router.push('/PaymentSuccess')
            }
        
              
        
        
          
            })
            .catch(function (error) {   
              console.log(error);
            });
        

            // alert(result.data.msg);
            

        },
        prefill: {
            name: fullName,
            email: email,
            contact:mobile,
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

      
     }

     }
    
  })
  .catch(function (error) {   
    axios
            .post(API_URL+"/orders/update_payment_status.php",{
  
              studentid : studentid,
              orderID : orderID,
              paymentStatus : "failed",
            })
            .then(function (response) {
        
              router.push('/FailedPayment');
        
        
          
            })
            .catch(function (error) {   
              console.log(error);
            });
  });
    




  for(let i=0;i<cartcount;i++){
   axios
  .post(API_URL+"/orders/ordered_items.php" ,
  {
    quantity : cartdata[i].Quantity,
    productid: cartdata[i].ProductID,
    producttotal : cartdata[i].Producttotal,
    orderID : orderID,
    studentid : studentid,

    

  })


  .then(function (response) {
     
    
  })
  .catch(function (error) {   
    console.log(error);
  });



  }

  



      axios
      .post(API_URL+"/orders/delete_all_cart_items.php" ,
      {
        studentid : studentid,
      })
      .then(function (response) {
       
        
      })
      .catch(function (error) {   
        console.log(error);
      });
    
 






  }


  




  // axios
  // .post(API_URL+"/orders/ordered_items.php" ,
  // {
  //   studentid : studentid,
  //   orderID : orderID,
  //   lastname : lastname,
  //   company : company,
  //   country : country,
  //   quantity : quantity,
  //   email : email,
  // })
  // .then(function (response) {
  //    if(response) {
  //        router.push('/BulkSuccess')
  //    }
    
    
  // })
  // .catch(function (error) {   
  //   console.log(error);
  // });



 

  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
    setFullName(studentData.FullName);
    setMobile(studentData.Mobile);
    setEmail(studentData.Email);
    setState(studentData.State);
    setDistrict(studentData.District);
    setCity(studentData.City);
    setAddress(studentData.Address);

    axios
    .post(API_URL+"/cart/display_cart.php",{
      s_id:studentid,
    })

    .then(function (response) {
      // console.log(response?.data?.data[0]?.ProductID);
      setcarttotal(response?.data?.carttotal[0]?.total);
      setTotal(round(1.1*carttotal));
  
    })
    .catch(function (error) {   
      console.log(error);
    });
   

    axios
    .post(API_URL+"/orders/get_all_cart_items.php",{
     id:studentid,

    })
    .then(function (response) {
     
      setCartData(response?.data?.data);
      setCartCount(response?.data?.cartcount) ;
      console.log(cartdata);
      
  
    })
    .catch(function (error) {   
      console.log(error);
    });

  

    
  }, []);

  

  return (
    <>   
    
    <Head>
        {/* <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        <script type="text/javascript" src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </Head>

      <Header/>
      
           <section className="lg:px-4 pb-24 overflow-hidden">
          <div className="container md:flex pt-4 px-4 ">
            
            <div className="py-5 flex md:h-screen md:px-8 justify-center items-center mb-7 text-left border-b bg-blue-200 lg:px-10 border-black border-opacity-5">
              <h2 className="text-3xl xl:text-3xl leading-normal font-heading font-medium ">Billing address</h2>
            </div>
            <div className="flex flex-wrap  mb-14 xl:mb-2 ">
              <div className="w-full md:w-12/12 mt-2 lg:w-8/12 lg:px-28 px-4 mb-14 md:mb-0">
                <div className=" px-8 md:px-5 rounded-3xl">
                  <div className=" mb-6 border-b border-gray-200 border-opacity-30">
                    <div className="max-w-lg mx-auto">
                      <div className="flex flex-wrap mb-6 items-center">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400">Your name:</label>
                        </div>
                        <div className="w-full md:w-2/3">
                          <input onChange={(e) => {
                          setFullName(e.target.value);
                        }} className="w-full px-5 lg:py-1 py-1text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" value={fullName} type="text"/>
                        </div>
                      </div>
                      <div className="flex flex-wrap mb-6 items-center">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400">Mobile: </label>
                        </div>
                        <div className="w-full md:w-2/3">
                          <input onChange={(e) => {
                          setMobile(e.target.value);
                        }} className="w-full px-5 lg:py-1 py-1 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" value={mobile} type="text"/>
                        </div>
                      </div>
                      {/* <div className="flex flex-wrap mb-6 items-center">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400">Address 1:</label>
                        </div>
                        <div className="w-full md:w-2/3">
                          <input className="w-full px-5 py-2 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                        </div>
                      </div> */}
                      <div className="flex flex-wrap items-center">
                        <div className="w-full md:w-1/3  md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400"> Address: </label>
                        </div>
                        <div className="w-full md:w-2/3">
 
                          <textarea rows="3" onChange={(e) => {
                          setAddress(e.target.value);
                        }} className="w-full px-5 py-1 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" value={address} ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-16 mb-14 border-b border-gray-200 border-opacity-30">
                    <div className="max-w-lg mx-auto mb-16">
                      {/* <div className="flex flex-wrap mb-6 items-center">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400">Country:</label>
                        </div>
                        <div className="w-full md:w-2/3">
                          <input className="w-full px-5 lg:py-1 py-1 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                        </div>
                      </div> */}
                      <div className="flex flex-wrap mb-6 items-center">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400">City:</label>
                        </div>
                        <div className="w-full md:w-2/3">
                          <input onChange={(e) => {
                          setCity(e.target.value);
                        }} className="w-full px-5 lg:py-1 py-1 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" value={city} type="text"/>
                        </div>
                      </div>
                      <div className="flex flex-wrap mb-6 items-center">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400">District:</label>
                        </div>
                        <div className="w-full md:w-2/3">
                          <input onChange={(e) => {
                          setDistrict(e.target.value);
                        }} className="w-full px-5 lg:py-1 py-1 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" value={district} type="text"/>
                        </div>
                      </div>
                      <div className="flex flex-wrap mb-6 items-center">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400">State:</label>
                        </div>
                        <div className="w-full md:w-2/3">
                          <input onChange={(e) => {
                          setState(e.target.value);
                        }} className="w-full px-5 lg:py-1 py-1 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" value={state} type="text"/>
                        </div>
                      </div>
                      {/* <div className="flex flex-wrap mb-6 items-center">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg text-darkBlueGray-400">Zip code:</label>
                        </div>
                        <div className="w-full md:w-1/3">
                          <input className="w-full px-5 lg:py-1 py-1 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                        </div>
                      </div> */}
                    </div>
                    <div className="md:ml-16">
                      <label className="relative flex mb-8 items-center">
                        <input className="relative ml-10 appearance-none" type="checkbox"/>
                        {/* <button className="absolute top-1/2 left-0 transform -translate-y-1/2 h-6 w-6">
                          <svg width="27" height="27" viewbox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="27" height="27" rx="8" fill="#28E172"></rect>
                            <path d="M11.4534 19L6 13.6758L6.72022 12.9726L11.4534 17.5937L21.2798 8L22 8.70316L11.4534 19Z" fill="white"></path>
                          </svg>
                        </button> */}
                        <span className="ml-2 text-sm text-gray-400">Shipping address is the same as my billing address</span>
                      </label>
                      <label className="relative flex items-center">
                        <input className="relative ml-10 appearance-none" type="checkbox"/>
                        {/* <button className="absolute top-1/2 left-0 transform -translate-y-1/2 h-6 w-6">
                          <svg width="27" height="27" viewbox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="26" height="26" rx="7.5" stroke="#348BF6"></rect></svg>
                        </button> */}
                        <span className="ml-2 text-sm text-gray-400">Save this information for next time</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-12/12 lg:ml-0 md:ml-20   lg:w-4/12 px-4 ">
                <div>
                  <h2 className="mb-7 lg:mt-6 text-2xl font-heading font-medium">Order summary</h2>
                  <div className="flex items-center justify-between py-4 bg-gray-200 px-10 mb-3 leading-8 bg- bg-opacity-50 font-heading font-medium rounded-3xl">
                    <span>Subtotal</span>
                    <span className="flex items-center text-xl">
                      <span className="mr-2 text-base">Rs.</span>
                      <span>{carttotal}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4 bg-gray-200 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                    <span>Shipping</span>
                    <span className="flex items-center text-xl">
                      <span className="mr-2 text-base">Rs.</span>
                      <span>{round(0.1*carttotal)}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4 bg-gray-200 px-10 mb-14 leading-8 bg-white font-heading font-medium rounded-3xl">
                    <span>Total</span>
                    <span className="flex items-center text-xl text-blue-500">
                      <span className="mr-2 text-base">Rs.</span>
                      <span>{round(1.1*carttotal)}</span>
                    </span>
                  </div>
                  <h4 className="mb-4 text-3xl font-heading font-medium">Discount code</h4>
                  <label className="block mb-3 text-lg text-darkBlueGray-400">Apply code:</label>
                  <div className="relative mb-3 lg:mb-10">
                    <input className="flex-grow outline-none px-5 pr-36 py-4 w-full leading-7 bg-white border-2 border-blue-500 " type="text"/>
                    <a className="absolute top-1/2 transform -translate-y-1/2 right-1 -translate-x-px w-auto xl:w-auto py-3 px-8 text-lg leading-7 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 " href="#">Apply</a>
                      {/* {!iscouponvalid? (<span className="inline-block mb-4 font-medium text-red">The coupon code doesnot exist</span>):""} */}
                  </div>
                  <div onClick={(e)=>{saveOrderDetails(e)}}><a className="inline-block w-full py-5 lg:py-3 px-10 text-lg leading-6 lg:leading-7 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" href="#">Checkout</a></div>
                </div>
              </div>
            </div>
            
          </div>
        </section>
        <Footer/>
    </>
  )
}

export default Index