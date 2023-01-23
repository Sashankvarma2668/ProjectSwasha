import React from 'react'
import { useState,useEffect } from 'react'
const axios = require("axios");
import { isStudentLoggedIn, StudentData } from "../utils/Student";
import { API_URL } from "../config/constants";
import { useRouter } from "next/router";
import Lottie from "react-lottie-player";
import PaymentSuccess from '../public/lottie/payment_success.json';
import { useRef } from "react";


const OrderSummaryItem = (props) => {
    const ref = useRef(null);
    const [studentid,setStudentId] = useState(StudentData().ID);
    const router = useRouter();
   
    const [quantity,setQuantity]=useState(props.quantity);

  return (
      <div className="lg:flex lg:items-center lg:justify-between py-8 rounded-xl xl:pb-9 mb-7 xl:mb-9 bg-white border-r-2 border-l-2 border-t-2 border-b-2 border-black ">
                  <div className="w-full lg:w-7/12">
                    <div className="sm:flex sm:items-center mb-6 lg:mb-0">
                      <a href="#">
                        <img className="sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 h-24 object-cover" src={props.url} alt=""/>
                      </a>
                      <div>
                        <a className="inline-block mb-4 text-lg font-heading font-medium hover:underline" href="#">{props.title}</a>
                      
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-4/12 xl:w-3/12 2xl:w-2/12">
                    <div className="relative xl:right-20 flex justify-between flex-wrap sm:px-7 lg:pl-0">
                      <p className="flex items-center md:px-2 text-sm">
                        <span className="mr-3 font-bold font-heading ">Qty:</span>
                        <span className="text-lg font-bold text-black font-body">{props.quantity}</span>
                      </p>
                      <p className="flex items-center text-sm font-bold font-heading">
                        <span className="mr-2">Rs.</span>
                        <span className="text-lg xl:text-xl">{props.cost}</span>
                      </p>
                    </div>
                  </div>
                </div>
    
  )
}

export default OrderSummaryItem
