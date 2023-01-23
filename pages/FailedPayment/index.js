import React from 'react';
import PaymentFailed from '..//../public/lottie/payment_failed.json';
import Lottie from "react-lottie-player";
import { useRef } from "react";
import Header from '../template/header'
import Footer from '../template/footer'
import { useRouter } from "next/router";  


const Index = () => {
    const router = useRouter();
    const ref = useRef(null);
    if (typeof window !== "undefined") {
   
    
    setTimeout(function(){
      window.location.href = 'https://swasha.nirmaan.org/Cart';
   }, 5000);
  }
    return (
          
        <> 
        <Header/>
        <div className="py-20 pb-9 mb-10 lg:mb-11 text-center border-b border-black border-opacity-5">
        <h2 className=" text-5xl xl:text-10xl leading-normal font-heading font-medium text-center">Error in the payment gateway. Try again later!!</h2>
        </div>
          <div className='w-full h-screen'>
       <Lottie ref={ref} background="transparent" animationData={PaymentFailed} speed="1" loop={50} play style={{ position: "relative", top: 0, left: 0, zIndex: "30", width: "100%", height: "40vh" }} />
          </div>
        <Footer/>
        </>
  )
}

export default Index
