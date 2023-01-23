import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { courseLevels } from "../../utils/Data";
import { ArrowNarrowRightIcon, CheckCircleIcon, CodeIcon, DesktopComputerIcon, LockClosedIcon, LockOpenIcon, TerminalIcon } from "@heroicons/react/solid";
const axios = require("axios");
import { API_URL, ADMIN_URL } from "../../config/constants";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { CheckIcon } from "@heroicons/react/outline";
import Popup from "../../components/ui/ok";



export default function Quizzes() {
  const router = useRouter();
  const [courses, setCourses] = useState();
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [certificateProgress, setCertificateProgress] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [openLockedPopup, setOpenLockedPopup] = useState(false);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  const [lockedPopupData, setLockedPopupData] = useState({ title: "", message: "", icon: "" });
  Quizzes.getInitialProps = async () => {
    return {};
  };
  useEffect(() => {
    axios
      .post(API_URL + "courses/get_certificate_status.php", {
        student: StudentData().ID,
      })
      .then(function (response) {
        if (response?.data?.meta?.error) {
          setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        }
        if (!response?.data?.meta?.error) {
          setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
          setCertificateProgress(response?.data?.data);
        }
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [pageLoading]);

  function handleLockedPopup(message) {
    setOpenLockedPopup(true);
    setLockedPopupData({ title: "Course Locked", message: message, icon: "lock" });
  }

  function handlePopupClosed() {
    setOpenLockedPopup(false);
  }

  // useEffect(() => {
  //   module
  //     ? axios
  //         .post(API_URL + "certificates/get_quizzes.php")
  //         .then(function (response) {
  //           if (response?.data?.meta?.error) {
  //             setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
  //           }
  //           if (!response?.data?.meta?.error) {
  //             setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
  //             setCourses(response?.data?.data);
  //             setPageLoading(false);
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         })
  //     : "";
  // }, [router]);




  function setLocalColors(bg, color) {
    localStorage.setItem("background_color", bg);
    localStorage.setItem("text_color", color);
  }

  function setLocalFonts(heading, text) {
    localStorage.setItem("heading",heading);
    localStorage.setItem("text", text);
  }

  function onColoursLoading() {
    document.getElementById("mydiv1").style.backgroundColor =
      localStorage.getItem("background_color");
     
    document.getElementById("mydiv1").style.color =
      localStorage.getItem("text_color");


    
      // alert(localStorage.getItem("background_color"));
      // alert(localStorage.getItem("text_color"));
  }



  function onFontLoading() {


    document.getElementsByClassName("heading1")[0].style.fontSize =
    localStorage.getItem("heading");

    for (let i = 0; i < 3; i++) {
      
    document.getElementsByClassName("text1")[i].style.fontSize =
      localStorage.getItem("text");
    }

    
  }
  function firstcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#FFFFFF";
    document.getElementById("mydiv1").style.color = "#343A40";

    setLocalColors("#FFFFFF",  "#343A40");
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
   
      document.getElementsByClassName("heading1")[0].style.fontSize = "35px";
   

    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "15px";
    }

setLocalFonts("35px","15px");

  }
  function size2() {
    
      document.getElementsByClassName("heading1")[0].style.fontSize = "40px";
    

    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "20px";
    }

    setLocalFonts("40px","20px");
  }
  function size3() {
  
      document.getElementsByClassName("heading1")[0].style.fontSize = "45px";
  

      for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "25px";
      }
    setLocalFonts("45px","25px");
  }




 


  useEffect(() => {
    if(document.getElementById("mydiv1")){
      onColoursLoading();
      }
  });







  return pageLoading === false ? (
    <>
      <Head>
        <title>Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>







      <div className="md:h-9 h-24 w-full bg-gray-200 border md:flex md:items-center md:justify-around md:grid-cols-2 grid-cols-1 space-y-3 md:space-y-0">
        <div className="border flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-2"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z"></path>
            <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"></path>
          </svg>

          <span className="text-sm">
            <Link href="/screenreaderaccess"> Screen Reader Access </Link>
          </span>
        </div>

        <div className="border flex justify-center items-center  gap-x-1">
          <span className="md:text-sm text-sm"> Theme Color: </span>
          <div
          style={{backgroundColor:"#FFFFFF",color:"#343A40"}}
            onClick={() => {
              firstcolor();
            }}
            className="h-7 w-7 rounded-full bordeR uppercase flex justify-center items-center text-xl poin cursor-pointer"
          >
            A
          </div>
          <div
           style={{backgroundColor:"#343A40",color:"#FFFF00"}}
            onClick={() => {
              secondcolor();
            }}
            className="h-7 w-7 rounded-full border uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
           style={{backgroundColor:"#0F2B5B",color:"#FFFFFF"}}
            onClick={() => {
              thirdcolor();
            }}
            className="h-7 w-7 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
          style={{backgroundColor:"#51B5E0",color:"#000000"}}
            onClick={() => {
              fourthcolor();
            }}
            className="h-7 w-7 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
          style={{backgroundColor:"#CEE007",color:"#000000"}}
            onClick={() => {
              fifthcolor();
            }}
            className="h-7 w-7 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
          style={{backgroundColor:"#F77F00",color:"#000000"}}
            onClick={() => {
              sixthcolor();
            }}
            className="h-7 w-7 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>

          <span className="md:text-sm text-sm md:ml-9 ml-0">
            {" "}
            Text Resize:{" "}
          </span>
          <div
            onClick={() => {
              size1();
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-xs cursor-pointer"
          >
            A-
          </div>
          <div
            onClick={() => {
              size2();
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-md cursor-pointer"
          >
            A
          </div>
          <div
            onClick={() => {
              size3();
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-lg cursor-pointer"
          >
           A+
          </div>
        </div>
      </div>










      <Header />
      <div>
        <section class="py-20 " id="mydiv1">
          <div class="container max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold tracking-tight text-center heading1">Certifications</h2>
            {courses ? (
              <>
                {/* <p class="mt-2 text-lg text-center text-gray-600">Check out our list of certifications below.</p> */}
              </>
            ) : (
              ""
            )}
            <div class="p-4 grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
            <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <DesktopComputerIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700 text1">Basic Coding</h4>
                <p class="text-base text-center text-gray-500">Complete assessment to get Basic coding certificate.</p>
                <Link href={isStudentLoggedIn() === true ? "/certifications/basic" : "/login?refer=/certifications/basic"} >
                  <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Assessment</a>
                </Link>
              </div>
              <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <CodeIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700 text1">Intermediate Coding</h4>
                <p class="text-base text-center text-gray-500">Complete assessment to get Intermediate coding certificate.</p>
                {certificateProgress >= 2 || certificateProgress == 1 ? (
                  <Link href={isStudentLoggedIn() === true ? "/certifications/intermediate" : "/login?refer=/certifications/intermediate"} >
                    <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Assessmet</a>
                  </Link>
                ) : (
                  <a
                    onClick={() => handleLockedPopup("Please complete basic coding certification first.")}
                    class="cursor-pointer flex justify-center items-center bg-opacity-60 bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">
                    <LockClosedIcon className="w-4 h-4 mr-2" /> Start Assessment
                  </a>
                )}
              </div>
              <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <TerminalIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700 text1">Advanced Coding</h4>
                <p class="text-base text-center text-gray-500">Complete assessment to get Advanced coding certificate..</p>
                {certificateProgress >= 3 || certificateProgress == 2 ? (
                  <Link href={isStudentLoggedIn() === true ? "/certifications/advanced" : "/login?refer=/certifications/advanced"} >
                    <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Assessmet</a>
                  </Link>
                ) : (
                  <a
                    onClick={() => handleLockedPopup("Please complete intermediate coding certification first.")}
                    class="cursor-pointer flex justify-center items-center bg-opacity-60 bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">
                    <LockClosedIcon className="w-4 h-4 mr-2" /> Start Assessment
                  </a>
                )}
              </div>
              
              
              
              {/* {courses ? (
                courses.map((course) => {
                  return (
                    <div class="duration-150 hover:scale-105 transform hover:shadow-2xl relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl text-gray-700 hover:text-nirmaan">
                      <h4 class="text-xl font-medium">{course.Title}</h4>
                      <p class="text-base text-center text-gray-500">{course.Description}</p>
                      <Link key={course.ID} href={isStudentLoggedIn() === true ? "/certifications/" + course.Slug : "/login?refer=/certifications/" + course.Slug}>
                        <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                          <span>Get Certificate</span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-12 text-center py-5 mx-auto">
                  <img src="../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
                  No certificates available in this module.
                </div>
              )} */}
            </div>
          </div>
        </section>
      </div>
      <Popup open={openLockedPopup} handleClosed={() => handlePopupClosed()} message={lockedPopupData.message} title={lockedPopupData.title} buttonText="OK" icon={lockedPopupData.icon} />
      <Footer />
    </>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center bg-indigo-100">
      <span class="relative h-20 w-20">
        <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
      </span>
    </div>
  );
}
