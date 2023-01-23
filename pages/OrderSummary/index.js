import React from 'react'
import Header from '../template/header'
import Footer from '../template/footer'
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import PaymentSuccess from '..//../public/lottie/payment_success.json';
import Lottie from "react-lottie-player";
import { useRef } from "react";
import Cookies from "js-cookie";
import OrderSummaryItem from '../../components/OrderSummaryItem';

const Index = () => {
  const ref = useRef(null);
  const [orderid,setOrderId]=useState(Cookies.get('orderid'));
  const [ordertotal,setOrderTotal]= useState(Cookies.get('ordertotal'));

  const [productdetails,setProductDetails] = useState();
  const [studentid,setStudentId] = useState(StudentData().ID);
  const [total,setTotal]= useState();

  useEffect(() => {

    axios
    .post(API_URL+"/orders/order_summary.php",{
      c_id:studentid,
      orderID : orderid,
    })

    .then(function (response) {
      setProductDetails(response?.data?.data);
      setTotal(response?.data?.total);
    })
    .catch(function (error) {   
      console.log(error);
    });
    
   

    
  }, []);

  const Print = () =>{     
    //console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents; 
  }
  return (
    <>
       
      <Header/>
          
       
      <section className='lg:px-48 bg-white'>
      

        <div className="py-10 bg-blueGray-100" id='printablediv'>
        
          <div className="container px-4 mx-auto">
            
            <div className="pb-9 mb-10 lg:mb-11 text-center border-b border-black border-opacity-5">
              <h2 className="text-5xl xl:text-10xl leading-normal font-heading font-medium text-center">Your order</h2>
            </div>
            
            <div className="flex flex-wrap pb-3 lg:pb-11">
            <div className="w-full py-4 lg:w-8/12">
                <h3 className="text-lg xl:text-xl font-heading font-medium text-left">Order tracking id :  &nbsp;&nbsp;<span className= "px-2 bg-green-500 text-white">{orderid}</span> </h3>
            </div>
              <div className="lg:flex w-full  lg:w-4/12 mb-14 lg:mb-0">
                <div className="flex justify-center sm:justify-start items-center mb-3 lg:mb-0">
                  <h3 className="mr-3 lg:mr-7 text-lg xl:text-xl font-heading font-medium">Payment Status &nbsp;&nbsp; :</h3>
                  <h3 className="text-lg xl:text-xl bg-green-500 text-white px-2 justify-center items-center font-heading font-medium text-center sm:text-left">Successful</h3>
                
                </div>
                
              </div>
              
            </div>
            <div className="p-8 xl:py-14 xl:px-16 mb-14 xl:mb-16 bg-gray-100 rounded-3xl">
              <p className="mb-11 xl:mb-16 text-gray-400 font-medium">{total} products</p>
              {/* <div className="lg:flex lg:items-center lg:justify-between pb-7 xl:pb-9 mb-7 xl:mb-9 border-b border-black border-opacity-5">
                <div className="w-full lg:w-7/12">
                  <div className="sm:flex sm:items-center mb-6 lg:mb-0">
                    <a href="#">
                      <img className="sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 h-24 object-cover" src="uinel-assets/images/ecommerce-order/iphone.png" alt=""/>
                    </a>
                    <div>
                      <a className="inline-block mb-4 text-lg font-heading font-medium hover:underline" href="#">Apple iPhone 12 Pro (128GB)</a>
                      <div className="flex flex-wrap">
                        <p className="mr-4 text-sm font-heading font-medium">
                          <span>Color:</span>
                          <span className="ml-2 text-gray-400 font-body">Silver</span>
                        </p>
                        <p className="text-sm font-heading font-medium">
                          <span>Memory storage:</span>
                          <span className="ml-2 text-gray-400 font-body">128GB</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-4/12 xl:w-3/12 2xl:w-2/12">
                  <div className="relative xl:right-20 flex justify-between flex-wrap sm:px-7 lg:pl-0">
                    <p className="flex items-center text-sm">
                      <span className="mr-3 font-heading font-medium">Qty:</span>
                      <span className="text-lg text-gray-400 font-body">1</span>
                    </p>
                    <p className="flex items-center text-sm text-blue-500 font-heading font-medium">
                      <span className="mr-2">$</span>
                      <span className="text-lg xl:text-xl">544.90</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:flex lg:items-center lg:justify-between pb-7 xl:pb-9 mb-7 xl:mb-9 border-b border-black border-opacity-5">
                <div className="w-full lg:w-7/12">
                  <div className="sm:flex sm:items-center mb-6 lg:mb-0">
                    <a href="#">
                      <img className="sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 h-24 object-cover" src="uinel-assets/images/ecommerce-order/headphones.png" alt=""/>
                    </a>
                    <div>
                      <a className="inline-block mb-4 text-lg font-heading font-medium hover:underline" href="#">Headphones SONY 1l X-O</a>
                      <div className="flex flex-wrap">
                        <p className="mr-4 text-sm font-heading font-medium">
                          <span>Color:</span>
                          <span className="ml-2 text-gray-400 font-body">Grey</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-4/12 xl:w-3/12 2xl:w-2/12">
                  <div className="relative xl:right-20 flex justify-between flex-wrap sm:px-7 lg:pl-0">
                    <p className="flex items-center text-sm">
                      <span className="mr-3 font-heading font-medium">Qty:</span>
                      <span className="text-lg text-gray-400 font-body">1</span>
                    </p>
                    <p className="flex items-center text-sm text-blue-500 font-heading font-medium">
                      <span className="mr-2">$</span>
                      <span className="text-lg xl:text-xl">44.90</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="w-full lg:w-7/12">
                  <div className="sm:flex sm:items-center mb-6 lg:mb-0">
                    <a href="#">
                      <img className="sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 h-24 object-cover" src="uinel-assets/images/ecommerce-order/smartwatch.png" alt=""/>
                    </a>
                    <div>
                      <a className="inline-block mb-4 text-lg font-heading font-medium hover:underline" href="#">Smartwatch Uistore Homme Watch 19</a>
                      <div className="flex flex-wrap">
                        <p className="mr-4 text-sm font-heading font-medium">
                          <span>Color:</span>
                          <span className="ml-2 text-gray-400 font-body">Silver</span>
                        </p>
                        <p className="text-sm font-heading font-medium">
                          <span>Size:</span>
                          <span className="ml-2 text-gray-400 font-body">M</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 xl:w-3/12 2xl:w-2/12">
                  <div className="relative xl:right-20 flex justify-between flex-wrap sm:px-7 lg:pl-0">
                    <p className="flex items-center text-sm">
                      <span className="mr-3 font-heading font-medium">Qty:</span>
                      <span className="text-lg text-gray-400 font-body">1</span>
                    </p>
                    <p className="flex items-center text-sm text-blue-500 font-heading font-medium">
                      <span className="mr-2">$</span>
                      <span className="text-lg xl:text-xl">120.90</span>
                    </p>
                  </div>
                </div>
              </div> */}
              {productdetails
    ? productdetails.map((productdetails,key) => (

      <div key={productdetails.ID}>
      <OrderSummaryItem quantity={productdetails?.Quantity} cost={productdetails?.Price} url={productdetails?.URL} title ={productdetails?.ProductName} />
      </div>

      ))
    : ""}
            </div>
            <div className="lg:flex xl:items-center w-full">
              <div className="lg:w-2/12 xl:w-1/12 mb-10 xl:mb-0">
                <h3 className="text-xl font-heading font-medium">Summary</h3>
              </div>
              <div className="w-full lg:w-10/12 xl:w-11/12">
                <div className="flex flex-wrap lg:justify-end -mx-3">
                  <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-6 xl:mb-0">
                    <div className="relative flex items-center justify-between py-4 px-10 leading-8 bg-white bg-opacity-50 font-medium rounded-3xl">
                      <div className="absolute left-3 flex justify-center items-center w-20 h-20 bg-white rounded-full">
                        <div className="flex justify-center items-center w-11 h-11 text-xl text-white font-bold bg-blue-500 rounded-full">{total}</div>
                      </div>
                      <span className="ml-16">Products</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-3 xl:mb-0">
                    <div className="flex items-center justify-between py-4 px-10 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                      <span>Shipping</span>
                      <span className="flex items-center">
                        <span className="mr-3 text-sm">Rs.</span>
                        <span className="text-xl">0</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-10 sm:mb-0">
                    <div className="flex items-center justify-between py-4 px-10 leading-8 bg-white font-heading font-medium rounded-3xl">
                      <span>Total</span>
                      <span className="flex items-center text-blue-500">
                        <span className="mr-3 text-sm">Rs.</span>
                        <span className="text-xl">{ordertotal}</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:max-w-max lg:ml-auto xl:ml-0 px-3"><a className="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" href="#" onClick={Print}>Download</a></div>
                </div>
                {/* <button type="button" className="w-full sm:w-1/2 lg:max-w-max lg:ml-auto xl:ml-0 px-3" onClick={Print}>invoice</button> */}
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