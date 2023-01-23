import React, { useCallback, useRef } from "react";
import Header from "../template/header";
import Footer from "../template/footer";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { useState, useEffect } from "react";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { useRouter } from "next/router";
import Link from "next/link";
import Confetti from "../../components/ui/confetti";


const index = () => {
  const [users1, setUsers1] = useState();
  const router = useRouter();

  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/leaderboard");
    }

    if (isStudentLoggedIn() === true) {
      axios
        .post(API_URL + "leaderboard/leaderboard.php")
        .then(function (response) {
          console.log(response);
          setUsers1(response.data?.data);

          // return;
        });
    }
  }, []);



  function setLocalColors(bg, color) {
    localStorage.setItem("background_color", bg);
    localStorage.setItem("text_color", color);
  }

  // function setLocalFonts(heading, text) {
  //   localStorage.setItem("heading",heading);
  //   localStorage.setItem("text", text);
  // }




  function onColoursLoading() {
    document.getElementById("mydiv1").style.backgroundColor =
      localStorage.getItem("background_color");
    document.getElementById("mydiv1").style.color =
      localStorage.getItem("text_color");
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
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "35px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "15px";
    }

setLocalFonts("35px","15px");

  }
  function size2() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "40px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "20px";
    }

    setLocalFonts("40px","20px");
  }
  function size3() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "45px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "25px";
    }
    setLocalFonts("45px","25px");
  }









  useEffect(() => {
    if(document.getElementById("mydiv1")){
      onColoursLoading();
      }
  });













  return (
    <div>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,200&display=swap" rel="stylesheet"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,400;1,200&display=swap" rel="stylesheet"/>
      </head>

















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
              
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-xs cursor-pointer"
          >
            A-
          </div>
          <div
            onClick={() => {
              
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-md cursor-pointer"
          >
            A
          </div>
          <div
            onClick={() => {
              
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-lg cursor-pointer"
          >
           A+
          </div>
        </div>
      </div>



















      <Header />

      {/* 
{users1 ? (

users1.map((data,key) => (

<div>
<h1>{key+1}</h1>
  <h1>SID :{data.SID}</h1>
  <h2>Points :{data.TotalPoints}</h2>
</div>

))):""} */}

      <div className="md:px-40 pb-24" id="mydiv1">
        <div class="px-10 py-7  flex justify-center text-5xl fontb text-black">
          Leaderboard
        </div>

        <div class=" rounded-2xl overflow-x-auto min-w-full bg-white shadow-2xl">
          <table class="min-w-full text-sm align-middle whitespace-nowrap">
            <thead class="">
              <tr class="border-b border-gray-200">
                <th class="fonta p-3 text-gray-700 bg-gray-200 font-semibold text-lg tracking-wider uppercase text-center myfont">
                  Rank
                </th>
                <th class="fonta p-6 text-gray-700 bg-gray-200 font-semibold text-lg tracking-wider uppercase text-left myfont">
                  Name
                </th>
                <th class="fonta text-gray-700 bg-gray-200 font-semibold text-lg tracking-wider uppercase text-left myfont">
                  Points
                </th>
              </tr>
            </thead>

            <Confetti />

            <tbody class="">
              {users1
                ? users1.map((data, key) => (
                    <>
                      {key === 0 ? (
                        <tr class="border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-300">
                          <td class="py-9 flex justify-center items-center text-center">
                            <span className="text-5xl text-white fontb">
                              {key + 1}
                            </span>
                          </td>
                          <td class="py-9">
                            <div class="flex gap-3">
                              <div>
                                <img
                                  src={
                                    data.Image
                                      ? API_URL + data.Image
                                      : "/usericon.png"
                                  }
                                  alt="User Avatar"
                                  class="inline-block w-14 h-14 rounded-full border border-black"
                                />
                              </div>

                              <div>
                                <p class="font-medium uppercase text-white text-2xl fontb">
                                  {data.FullName}
                                </p>
                                <p class=" uppercase text-white fontb">
                                  {data.City}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="py-9 text-5xl text-white fontb">
                            {data.TotalPoints}
                          </td>
                        </tr>
                      ) : (
                        <>
                          {key === 1 ? (
                            <tr class="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-300">
                              <td class="py-8 flex justify-center items-center text-center">
                                <span className="text-3xl text-white fontb">
                                  {key + 1}
                                </span>
                              </td>
                              <td class="py-8">
                                <div class="flex gap-3">
                                  <div>
                                    <img
                                      src={
                                        data.Image
                                          ? API_URL + data.Image
                                          : "/usericon.png"
                                      }
                                      alt="User Avatar"
                                      class="inline-block w-14 h-14 rounded-full border border-black"
                                    />
                                  </div>

                                  <div>
                                    <p class="font-medium text-lg uppercase text-white fontb">
                                      {data.FullName}
                                    </p>
                                    <p class="uppercase text-white fontb">
                                      {data.City}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="py-8 text-white text-4xl fontb">
                                {data.TotalPoints}
                              </td>
                            </tr>
                          ) : (
                            <>
                              {key === 2 ? (
                                <tr class="border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-300">
                                  <td class="py-6 text-center flex justify-center items-center">
                                    <span className="text-3xl text-white fontb">
                                      {key + 1}
                                    </span>
                                  </td>
                                  <td class="py-6">
                                    <div class="flex gap-3">
                                      <div>
                                        <img
                                          src={
                                            data.Image
                                              ? API_URL + data.Image
                                              : "/usericon.png"
                                          }
                                          alt="User Avatar"
                                          class="inline-block w-14 h-14 rounded-full border border-black"
                                        />
                                      </div>

                                      <div>
                                        <p class="text-lg font-medium uppercase text-white fontb">
                                          {data.FullName}
                                        </p>
                                        <p class="text-white uppercase fontb">
                                          {data.City}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="py-6 text-white text-4xl fontb">
                                    {data.TotalPoints}
                                  </td>
                                </tr>
                              ) : (
                                <>
                                  {key === 3 ? (
                                    <tr class="border-b border-gray-200 bg-gradient-to-r from-yellow-600 to-yellow-200">
                                      <td class="py-6 text-center flex justify-center items-center">
                                        <span className="text-3xl text-white fontb">
                                          {key + 1}
                                        </span>
                                      </td>
                                      <td class="py-4">
                                        <div class="flex gap-3">
                                          <div>
                                            <img
                                              src={
                                                data.Image
                                                  ? API_URL + data.Image
                                                  : "/usericon.png"
                                              }
                                              alt="User Avatar"
                                              class="inline-block w-14 h-14 rounded-full border border-black"
                                            />
                                          </div>

                                          <div>
                                            <p class="text-lg font-medium uppercase text-white fontb">
                                              {data.FullName}
                                            </p>
                                            <p class="uppercase text-white fontb">
                                              {data.City}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td class="py-4 text-white text-4xl fontb">
                                        {data.TotalPoints}
                                      </td>
                                    </tr>
                                  ) : (
                                    <>
                                      {key === 4 ? (
                                        <tr class="border-b border-gray-200 bg-gradient-to-r from-pink-600 to-pink-300">
                                          <td class="py-6 text-center flex justify-center items-center">
                                            <span className="text-3xl text-white fontb">
                                              {key + 1}
                                            </span>
                                          </td>
                                          <td class="py-2">
                                            <div class="flex gap-3">
                                              <div>
                                                <img
                                                  src={
                                                    data.Image
                                                      ? API_URL + data.Image
                                                      : "/usericon.png"
                                                  }
                                                  alt="User Avatar"
                                                  class="inline-block w-14 h-14 rounded-full border border-black"
                                                />
                                              </div>

                                              <div>
                                                <p class="text-lg font-medium uppercase text-white fontb">
                                                  {data.FullName}
                                                </p>
                                                <p class="text-white uppercase fontb">
                                                  {data.City}
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                          <td class="py-2 text-white text-4xl fontb">
                                            {data.TotalPoints}
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr class="border-b border-gray-200 bg-gradient-to-r from-indigo-400 to-green-300">
                                          <td class="text-xl py-3 text-center text-gray-100 fontb">
                                            {key + 1}
                                          </td>
                                          <td class="py-3">
                                            <div class="flex gap-3">
                                              <div>
                                                <img
                                                  src={
                                                    data.Image
                                                      ? API_URL + data.Image
                                                      : "/usericon.png"
                                                  }
                                                  alt="User Avatar"
                                                  class="inline-block w-14 h-14 rounded-full border border-black"
                                                />
                                              </div>

                                              <div>
                                                <p class="text-lg font-medium uppercase text-gray-100 fontb">
                                                  {data.FullName}
                                                </p>
                                                <p class="text-gray-100 uppercase fontb">
                                                  {data.City}
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                          <td class="py-3 text-gray-100 text-2xl fontb">
                                            {data.TotalPoints}
                                          </td>
                                        </tr>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  ))
                : ""}

              {/* 
      <tr class="border-b border-gray-200">
        <td class="p-3 text-center">
         2
        </td>
        <td class="p-3">
          <p class="font-medium">
            Lia Baker
          </p>
          <p class="text-gray-500">
            Web Developer
          </p>
        </td>
        <td class="p-3 text-gray-500">
         345
        </td>
    
      </tr>



      <tr class="border-b border-gray-200">
        <td class="p-3 text-center">
         3
        </td>
        <td class="p-3">
          <p class="font-medium">
            Xavier Rosales
          </p>
          <p class="text-gray-500">
            Author
          </p>
        </td>
        <td class="p-3 text-gray-500">
         200
        </td>
       
      </tr>




      <tr class="border-b border-gray-200">
        <td class="p-3 text-center">
          4
        </td>
        <td class="p-3">
          <p class="font-medium">
            Danyal Clark
          </p>
          <p class="text-gray-500">
            Laravel Developer
          </p>
        </td>
        <td class="p-3 text-gray-500">
          150
        </td>
        
      </tr>


      <tr>
        <td class="p-3 text-center">
         5
        </td>
        <td class="p-3">
          <p class="font-medium">
            Keira Simons
          </p>
          <p class="text-gray-500">
            Marketing Director
          </p>
        </td>
        <td class="p-3 text-gray-500">
          100
        </td>
       
      </tr> */}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default index;
