import Head from "next/head";
import Link from "next/link";
import Header from "../../template/header";
import Footer from "../../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL, ADMIN_URL } from "../../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { isStudentLoggedIn, StudentData } from "../../../utils/Student";
import { courseLevels } from "../../../utils/Data";
import Chapters from "../../../components/layouts/Chapters";
import Cookies from "js-cookie";

export default function Level(props) {
  const router = useRouter();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const slug = router.query.slug;
  Cookies.set("moduledata",slug);
  const [courseModules, setCourseModules] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  Level.getInitialProps = () => {
    return {};
  };









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

    setLocalColors("#51B5E0",  "#000000");
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
  

    for (let i = 0; i < 5; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "15px";
    }

setLocalFonts("35px","15px");

  }
  function size2() {

      document.getElementsByClassName("heading1")[0].style.fontSize = "40px";
    

    for (let i = 0; i < 5; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "20px";
    }

    setLocalFonts("40px","20px");
  }
  function size3() {
   
      document.getElementsByClassName("heading1")[0].style.fontSize = "45px";
 

    for (let i = 0; i < 5; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "25px";
    }
    setLocalFonts("45px","25px");
  }








  useEffect(() => {
    if(document.getElementById("mydiv1")){
      onColoursLoading();
      onFontLoading();
      }
  });





  useEffect(() => {
    // console.log(router);
    // console.log(props);
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/courses/level/" + slug);
    }
    if (isStudentLoggedIn() === true) {
      slug
        ? axios 
            .post(API_URL + "courses/get_module_courses.php", {
              level: courseLevels.find((x) => x.slug == slug).id,
              student: StudentData().ID,
            })
            .then(function (response) {
              if (response?.data?.meta?.error) {
                setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
              }
              if (!response?.data?.meta?.error) {
                setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
                setCourseModules(response?.data?.data);
                // console.log(response?.data?.data);
              }
              setPageLoading(false);
            })
            .catch(function (error) {
              console.log(error);
            })
        : "";
    }
  }, [router]);
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
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-lg cursor-pointer"
          >
            A-
          </div>
          <div
            onClick={() => {
              size2();
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-lg cursor-pointer"
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




	

















      <Header activePage="Courses" />

      <div>
        <section class="py-20 bg-indigo-100" id="mydiv1">
          <div class="container max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold tracking-tight text-center heading1">{slug ? courseLevels.find((x) => x.slug == slug).title : ""} Modules</h2>
            {/* <p class="mt-2 text-lg text-center text-gray-600">Check out our list of {slug ? courseLevels.find((x) => x.slug == slug).slug : ""} modules below.</p> */}
            <div class="p-4 grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
              {courseModules ? (
                courseModules.map((module, index) => {
                  return (
                    <>
                      {/* <Link key={module.ID} href={"/courses/module/" + module.ID}> */}
                      {/* <a class="bg-cover bg-no-repeat bg-center duration-150 hover:scale-105 transform cursor-pointer hover:shadow-2xl relative flex flex-col items-start justify-between col-span-4 px-6 pt-6 pb-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                        <img src={module.Image} className="rounded-xl" />
                        <h4 class="text-xl font-medium text-gray-700">{module.ModuleTitle}</h4>
                        <p class="text-base text-left text-gray-500">{module.ModuleDescription}</p>
                      </a> */}
                      <div class="bg-cover bg-no-repeat bg-center relative col-span-12 overflow-hidden bg-white rounded-xl">
                        {/* <img src={ADMIN_URL + module.Image} className="rounded-xl h-48 w-full" /> */}
                        <div class="font-medium text-gray-700 px-6 py-3 border-b-2 flex justify-between items-center">
                          <div>
                            <span className="text-sm text-nirmaan">Module {index + 1}:</span>
                            <h4 className="text-xl text1">{module.ModuleTitle}</h4>
                          </div>
                          {/* <span class="bg-nirmaan py-2 px-5 rounded-lg text-nirmaan-lighter">Try Assesment</span> */}
                        </div>
                        <div class="auto-rows-max p-4 mx-5 grid grid-cols-4 gap-8 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0 overflow-x-auto flex-nowrap">
                          <Chapters module_id={module.ID} title={module.ModuleTitle} courses={module.Courses} />
                        </div>
                        {/* <p class="text-base text-left text-gray-500 px-6 pb-8">{module.ModuleDescription}</p> */}
                      </div>
                      {/* <a class="bg-cover bg-no-repeat bg-center duration-150 hover:scale-105 transform cursor-pointer hover:shadow-2xl relative flex flex-col items-start justify-between col-span-4 px-6 pt-6 pb-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                        <img src={module.Image} className="rounded-xl" />
                        <h4 class="text-xl font-medium text-gray-700">{module.ModuleTitle}</h4>
                        <p class="text-base text-left text-gray-500">{module.ModuleDescription}</p>
                      </a> */}

                      {/* </Link> */}
                    </>
                  );
                })
              ) : (
                <div className="col-span-12 text-center py-5 mx-auto">
                  {/* <div className="absolute bg-nirmaan opacity-50"> */}
                  {/* style={{ backgroundImage: "url(http://localhost:3000/css.jpg)" }} */}
                  {/* </div> */}
                  <img src="../../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
                  No courses available in this level.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

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
