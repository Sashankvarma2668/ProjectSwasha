import React, { useEffect, useState } from "react";
import PaymentSuccess from "..//../public/lottie/payment_success.json";
import Lottie from "react-lottie-player";
import { useRef } from "react";
import Header from "../template/header";
import Footer from "../template/footer";
import { useRouter } from "next/router";
import { API_URL } from "../../config/constants";
const axios = require("axios");
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import Cookies from "js-cookie";

const Index = () => {
  const router = useRouter();
  const ref = useRef(null);
  const [studentid, setStudentId] = useState(StudentData().ID);
  const [email, setEmail] = useState(StudentData().Email);
  const [orderid, setOrderId] = useState(Cookies.get("orderid"));
  const [fullName, setFullName] = useState(StudentData().FullName);

  useEffect(() => {
    axios
      .post(API_URL + "/mail/mail.php", {
        studentid: studentid,
        orderid: orderid,
        email: email,
        fullName: fullName,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (typeof window !== "undefined") {
    // browser code

    setTimeout(function () {
      window.location.href = "https://swasha.nirmaan.org/OrderSummary/";
    }, 5000);
  }

  return (
    <>
      <Header />
      <div className="py-20 pb-9 mb-10 lg:mb-11 text-center border-b border-black border-opacity-5">
        <h2 className=" text-5xl xl:text-10xl leading-normal font-heading font-medium text-center">
          Your order has been placed Succesfully
        </h2>
      </div>
      <div className="w-full h-screen">
        <Lottie
          ref={ref}
          background="transparent"
          animationData={PaymentSuccess}
          speed="1"
          loop={50}
          play
          style={{
            position: "relative",
            top: 0,
            left: 0,
            zIndex: "30",
            width: "100%",
            height: "40vh",
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Index;
