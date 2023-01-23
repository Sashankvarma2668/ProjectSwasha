import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
const axios = require("axios");
import { ADMIN_URL, API_URL } from "../config/constants";
import { isStudentLoggedIn, StudentData } from "../utils/Student";
import Banner from "../components/ui/banner";
import PWD from "../components/ui/pwd";
import styles from "../styles/Home.module.css";
import Advertisement from "../components/Advertisement";
import DisplayProductsShort from "../components/DisplayProductsShort";
import ProductsPage from "./ProductsPage";

export default function Home() {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [courseModules, setCourseModules] = useState(false);
  const [webinarData, setWebinarData] = useState();
  const [studentID, setStudentID] = useState(
    StudentData().ID ? StudentData().ID : 0
  );

  function setLocalColors(bg, color) {
    localStorage.setItem("background_color", bg);
    localStorage.setItem("text_color", color);
  }

  function setLocalFonts(heading, text) {
    localStorage.setItem("heading", heading);
    localStorage.setItem("text", text);
  }

  function onColoursLoading() {
    document.getElementById("mydiv1").style.backgroundColor =
      localStorage.getItem("background_color");
    document.getElementById("mydiv1").style.color =
      localStorage.getItem("text_color");
  }

  function onFontLoading() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize =
        localStorage.getItem("heading");
      document.getElementsByClassName("text1")[i].style.fontSize =
        localStorage.getItem("text");
    }
  }

  function firstcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#FFFFFF";
    document.getElementById("mydiv1").style.color = "#343A40";

    setLocalColors("#FFFFFF", "#343A40");
  }

  function secondcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#343A40";
    document.getElementById("mydiv1").style.color = "#FFFF00";

    setLocalColors("#343A40", "#FFFF00");
  }

  function thirdcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#0F2B5B";
    document.getElementById("mydiv1").style.color = "#FFFFFF";

    setLocalColors("#0F2B5B", "#FFFFFF");
  }

  function fourthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#51B5E0";
    document.getElementById("mydiv1").style.color = "#000000";

    setLocalColors("#51B5E0", "#000000");
  }
  function fifthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#CEE007";
    document.getElementById("mydiv1").style.color = "#000000";

    setLocalColors("#CEE007", "#000000");
  }
  function sixthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#F77F00";
    document.getElementById("mydiv1").style.color = "#000000";

    setLocalColors("#F77F00", "#000000");
  }

  function size1() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "35px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "15px";
    }

    setLocalFonts("35px", "15px");
  }
  function size2() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "40px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "20px";
    }

    setLocalFonts("40px", "20px");
  }
  function size3() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "45px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "25px";
    }
    setLocalFonts("45px", "25px");
  }

  useEffect(() => {
    if (document.getElementById("mydiv1")) {
      onColoursLoading();
      onFontLoading();
    }
  });

  useEffect(() => {
    axios
      .post(API_URL + "home.php", {
        level: 1,
        student: studentID,
      })
      .then(function (response) {
        if (response?.data?.meta?.error) {
        }
        if (!response?.data?.meta?.error) {
          setCourseModules(response?.data?.data);
          setWebinarData(response?.data?.webinar);
        }
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const supporters = [
    {
      name: "Wells Fargo",
      role: "Copywriter",
      imageUrl: "/wells-fargo.png",
      twitterUrl: "#",
      linkedinUrl: "#",
    },
    {
      name: "Sponsor 2",
      role: "Copywriter",
      imageUrl: "/sponsor-placeholder.jpg",
      twitterUrl: "#",
      linkedinUrl: "#",
    },
  ];
  return (
    <div id="first">
      <Head>
        <title>Nirmaan Diwaali Dhamaka</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <section className="relative">
        <Header />
        <Advertisement />
      </section>

      <section className="lg:py-12 pt-2">
        <DisplayProductsShort />
      </section>

      <section className="relative bg-gray-100 pb-5 mt-5">
        <Footer />
      </section>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/2.8.0/alpine.js"></script>
    </div>

    //     <section className="pt-32 pb-36  bg-white overflow-hidden">
    //   <div className="container flex justify-center items-center px-4 mx-auto">
    //     <div className="flex flex-wrap justify-center items-center  ">
    //       <div className="w-full md:w-1/2 p-8">
    //         <div className="flex flex-col justify-between h-full">
    //           <div className="mb-8">
    //             <h2 className="mb-6 text-8xl text-indigo-600 font-bold ">404</h2>
    //             <h3 className="mb-4 text-3xl font-bold"> Site is under maintainence</h3>
    //             <p className="text-lg text-gray-600 font-medium leading-normal md:max-w-md">We are fixing some technical issues. The site will be back online soon. Sorry for the inconvenience caused.</p>
    //           </div>
    //           <div>
    //             {/* <a className="inline-flex items-center text-center font-semibold text-indigo-600 hover:text-indigo-700 leading-normal" href="#">
    //               <svg className="mr-2.5" width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M6.66667 12.6667L2 8.00004M2 8.00004L6.66667 3.33337M2 8.00004L14 8.00004" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    //               </svg>
    //               <span>Go Back to Homepage</span>
    //             </a> */}
    //           </div>
    //         </div>
    //       </div>
    //       {/* <div className="w-full md:w-1/2 p-8 self-end">
    //         <img className="mx-auto transform hover:-translate-x-4 transition ease-in-out duration-1000" src="flaro-assets/images/http-codes/illustration.png" alt=""/>
    //       </div> */}
    //     </div>
    //   </div>
    // </section>
  );
}
