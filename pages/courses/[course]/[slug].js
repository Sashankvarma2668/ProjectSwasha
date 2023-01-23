import Head from "next/head";
import Link from "next/link";
import Header from "../../template/header";
import Footer from "../../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { isStudentLoggedIn, StudentData } from "../../../utils/Student";
import { courseLevels } from "../../../utils/Data";
import Topiclist from "../../../components/layouts/TopicList";
import Feedback from "../../../components/layouts/Feedback";
import Cookies from "js-cookie";


export default function Topic() {
  const router = useRouter();
  const [serverData, setServerData] = useState();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const course = router.query.course;
  const slug = router.query.slug;
  const moduledata=Cookies.get("moduledata");
  const [courseTopic, setCourseTopic] = useState(serverData?.data);
  const [courseData, setCourseData] = useState(serverData?.courseDetails);
  const [courseTopics, setCourseTopics] = useState(serverData?.courseTopics);
  const [pageLoading, setPageLoading] = useState(true);
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [topicsMenu, setTopicsMenu] = useState(false);
  const [readingTopic, setReadingTopic] = useState(serverData?.readingTopic);
  const [readingTopics, setReadingTopics] = useState(serverData?.readingTopics);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });











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


      var allElements = document.getElementsByClassName("prose")[0].getElementsByTagName("*");
      for (var i = 0, len = allElements.length; i < len; i++) {
          var element = allElements[i];
          element.style.color = localStorage.getItem("text_color");
      }




  }


  function onFontLoading() {

    document.getElementsByClassName("heading1")[0].style.fontSize =
    localStorage.getItem("heading");
    document.getElementsByClassName("text1")[0].style.fontSize =
    localStorage.getItem("text");

  

    
  }

  function firstcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#FFFFFF";
    document.getElementById("mydiv1").style.color = "#343A40";

    var allElements = document.getElementsByClassName("prose")[0].getElementsByTagName("*");
    for (var i = 0, len = allElements.length; i < len; i++) {
        var element = allElements[i];
        element.style.color = "#343A40";
    }

   

    setLocalColors("#FFFFFF", "#343A40");
  }

  function secondcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#343A40";
    document.getElementById("mydiv1").style.color = "#FFFF00";


    var allElements = document.getElementsByClassName("prose")[0].getElementsByTagName("*");
    for (var i = 0, len = allElements.length; i < len; i++) {
        var element = allElements[i];
        element.style.color = "#FFFF00";
    }


    setLocalColors("#343A40", "#FFFF00");
  }

  function thirdcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#0F2B5B";
    document.getElementById("mydiv1").style.color = "#FFFFFF";


    var allElements = document.getElementsByClassName("prose")[0].getElementsByTagName("*");
    for (var i = 0, len = allElements.length; i < len; i++) {
        var element = allElements[i];
        element.style.color = "#FFFFFF";
    }




    setLocalColors("#0F2B5B","#FFFFFF");
  }

  function fourthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#51B5E0";
    document.getElementById("mydiv1").style.color = "#000000";



    var allElements = document.getElementsByClassName("prose")[0].getElementsByTagName("*");
    for (var i = 0, len = allElements.length; i < len; i++) {
        var element = allElements[i];
        element.style.color = "#000000";
    }






    setLocalColors("#51B5E0", "#000000");
  }
  function fifthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#CEE007";
    document.getElementById("mydiv1").style.color = "#000000";





    var allElements = document.getElementsByClassName("prose")[0].getElementsByTagName("*");
    for (var i = 0, len = allElements.length; i < len; i++) {
        var element = allElements[i];
        element.style.color = "#000000";
    }





    setLocalColors("#CEE007", "#000000");
  }
  function sixthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#F77F00";
    document.getElementById("mydiv1").style.color = "#000000";




    var allElements = document.getElementsByClassName("prose")[0].getElementsByTagName("*");
    for (var i = 0, len = allElements.length; i < len; i++) {
        var element = allElements[i];
        element.style.color = "#000000";
    }





    setLocalColors("#F77F00", "#000000");
  }















  function size1() {
    
    document.getElementsByClassName("heading1")[0].style.fontSize = "35px";
    document.getElementsByClassName("text1")[0].style.fontSize = "15px";

  // for (let i = 0; i < 4; i++) {
  //   document.getElementsByClassName("text1")[i].style.fontSize = "15px";
  // }

setLocalFonts("35px","15px");

}
function size2() {
 
    document.getElementsByClassName("heading1")[0].style.fontSize = "40px";
    document.getElementsByClassName("text1")[0].style.fontSize = "20px";

  // for (let i = 0; i < 4; i++) {
  //   document.getElementsByClassName("text1")[i].style.fontSize = "20px";
  // }

  setLocalFonts("40px","20px");
}
function size3() {
  
    document.getElementsByClassName("heading1")[0].style.fontSize = "45px";
    document.getElementsByClassName("text1")[0].style.fontSize = "25px";

  // for (let i = 0; i < 4; i++) {
  //   document.getElementsByClassName("text1")[i].style.fontSize = "25px";
  // }
  setLocalFonts("45px","25px");
}












  useEffect(() => {
    if(document.getElementById("mydiv1")){
      onColoursLoading();
      onFontLoading()
      
      }
  });













  function convertDataToHtml(code) {
    var convertedHtml = "";
    var blocks = JSON.parse(code).blocks;
    blocks.map((block) => {
      switch (block.type) {
        case "header":
          convertedHtml += `<h${block.data.level}>${block.data.text.trim()}</h${block.data.level}>`;
          break;
        case "embded":
          convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
          break;
        case "paragraph":
          convertedHtml += `<p>${block.data.text}</p>`;
          break;
        case "delimiter":
          convertedHtml += "<hr />";
          break;
        case "raw":
          convertedHtml += block.data.html;
          break;
        case "rawTool":
          convertedHtml += block.data.html;
          break;
        case "image":
          convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" />`;
          // <br /><em>${block.data.caption}</em>
          break;
        case "code":
          convertedHtml += `<pre>` + block.data.code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + `</pre>`;
          convertedHtml +=
            `<a target="_blank" href="/editor.html?topic=` +
            courseTopic?.ID +
            `&id=` +
            block.id +
            `">
            <span class="text-lg no-underline cursor-pointer bg-nirmaan hover:bg-nirmaan-dark hover:text-nirmaan-light text-nirmaan-darker font-bold py-1 px-4 rounded inline-flex items-center">
              Try it on Code Editor
            </span></a>`;
          break;
        case "table":
          convertedHtml += "<table>";
          block.data.content.forEach(function (tr) {
            convertedHtml += "<tr>";
            tr.forEach(function (td) {
              convertedHtml += `<td>${td.replace(/\[\[\[(.+?)\]\]\]/g, function (m, url) {
                return '<img src="' + url + '">';
              })}</li>`;
            });
            convertedHtml += "</tr>";
          });
          convertedHtml += "</table>";
          break;
        case "list":
          convertedHtml += "<ul>";
          block.data.items.forEach(function (li) {
            convertedHtml += `<li>${li.trim()}</li>`;
          });
          convertedHtml += "</ul>";
          break;
        default:
          console.log("Unknown block type", block.type);
          break;
      }
    });
    return convertedHtml;
  }

  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/courses/" + course);
    }
    if (slug && isStudentLoggedIn() === true) {
      // if (slug !== courseData.Slug) {
      axios
        .post(API_URL + "courses/get_topic.php", {
          slug: slug,
          course: course,
          user_id: StudentData().ID,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
            setServerData(response?.data);
            setCourseTopic(response?.data?.data);
            setCourseTopics(response?.data?.courseTopics);
            setCourseData(response?.data?.courseDetails);
            setReadingTopic(response?.data?.readingTopic);
            setReadingTopics(response?.data?.readingTopics);
            setPageLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setPageLoading(true);
      // }
    }
    if (serverData) {
      setPageLoading(false);
    }
  }, [slug]);

  if (pageLoading === true) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-indigo-100">
        <span class="relative h-20 w-20">
          <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
        </span>
      </div>
    );
  } else {
    return (
      <>

















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



















        <div className="sticky" id="mydiv1">
          <div>
            <div class="bg-white border-b flex justify-between items-center p-3 py-5 lg:hidden">
              <Link href="/">
                <a>
                  <img className="block lg:hidden h-8 ml-3" src="/logo.png" alt="Workflow" />
                </a>
              </Link>
              <Link href={"/courses/level/"+ moduledata}>
                <a class="ml-28 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Back</span>
                </a>
              </Link>
            </div>

            <div class="bg-white border-b flex justify-between items-center p-3 px-5 lg:hidden">
              <a href="#" class="text-md font-bold text-gray-900 rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
                {courseData?.Title}
              </a>
              <div onClick={(e) => setTopicsMenu(true)} className={topicsMenu ? "hidden" : "block px-2 mr-2"}>
                <svg class="h-6 w-5" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
                </svg>
              </div>
              <div onClick={(e) => setTopicsMenu(false)} className={topicsMenu ? "block px-2 mr-2" : "hidden"}>
                <svg className="w-6 h-6" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path>
                </svg>
              </div>
            </div>

            <div className="flex">
              <Topiclist readingTopic={readingTopic} readingTopics={readingTopics} courseData={courseData} show={topicsMenu} topics={courseTopics} slug={courseTopic?.Slug} />
              <div className="flex-1 border overflow-y-scroll h-screen justify-center items-center p-10">
                <Link href={"/courses/level/"+ moduledata}>
                  <a class="hidden lg:inline-flex ml-28 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span>Back</span>
                   
                  </a>
                </Link>
                <div className="flex justify-center text-justify">
                  {courseTopic && (
                    <div>
                      <article class="prose lg:prose-2xl">
                        <h2 className="pt-0 lg:pt-14 heading1">{courseTopic?.Title}</h2>
                        <div className="text1 mycontent" id="editorjs" dangerouslySetInnerHTML={{ __html: convertDataToHtml(courseTopic.Content) }}></div>
                      </article>
                      <Feedback topic={courseTopic?.ID} student={StudentData().ID} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

