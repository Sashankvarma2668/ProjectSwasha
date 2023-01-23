import React from "react";
import Info from "../../components/ui/info";
import Header from "../template/header";
import Footer from "../template/footer";
import { useState, useEffect } from "react";
import Link from "next/link";

const index = () => {
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
    document.getElementsByClassName("heading1")[0].style.fontSize =
      localStorage.getItem("heading");

    for (let i = 0; i < 28; i++) {
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
    // for (let i = 0; i < 3; i++) {
    document.getElementsByClassName("heading1")[0].style.fontSize = "35px";
    // }

    for (let i = 0; i < 28; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "15px";
    }

    setLocalFonts("35px", "15px");
  }
  function size2() {
    // for (let i = 0; i < 3; i++) {
    document.getElementsByClassName("heading1")[0].style.fontSize = "40px";
    // }

    for (let i = 0; i < 28; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "20px";
    }

    setLocalFonts("40px", "20px");
  }
  function size3() {
    // for (let i = 0; i < 3; i++) {
    document.getElementsByClassName("heading1")[0].style.fontSize = "45px";
    // }

    for (let i = 0; i < 28; i++) {
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
  return (
    <>
      <div className="md:h-14 h-24 w-full bg-gray-200 border md:flex md:items-center md:justify-around md:grid-cols-2 grid-cols-1 space-y-3 md:space-y-0">
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

          <span className="text-xl">
            <Link href="/screenreaderaccess"> Screen Reader Access </Link>
          </span>
        </div>

        <div className="border flex justify-center items-center  gap-x-1">
          <span className="md:text-xl text-sm"> Theme Color: </span>
          <div
            style={{ backgroundColor: "#FFFFFF", color: "#343A40" }}
            onClick={() => {
              firstcolor();
            }}
            className="h-8 w-8 rounded-full bordeR uppercase flex justify-center items-center text-xl poin cursor-pointer"
          >
            A
          </div>
          <div
            style={{ backgroundColor: "#343A40", color: "#FFFF00" }}
            onClick={() => {
              secondcolor();
            }}
            className="h-8 w-8 rounded-full border uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
            style={{ backgroundColor: "#0F2B5B", color: "#FFFFFF" }}
            onClick={() => {
              thirdcolor();
            }}
            className="h-8 w-8 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
            style={{ backgroundColor: "#51B5E0", color: "#000000" }}
            onClick={() => {
              fourthcolor();
            }}
            className="h-8 w-8 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
            style={{ backgroundColor: "#CEE007", color: "#000000" }}
            onClick={() => {
              fifthcolor();
            }}
            className="h-8 w-8 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
            style={{ backgroundColor: "#F77F00", color: "#000000" }}
            onClick={() => {
              sixthcolor();
            }}
            className="h-8 w-8 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>

          <span className="md:text-xl text-sm md:ml-9 ml-0">
            {" "}
            Text Resize:{" "}
          </span>
          <div
            onClick={() => {
              size1();
            }}
            className="h-10 w-10 border bg-black text-white uppercase flex justify-center items-center text-lg cursor-pointer"
          >
            -SM
          </div>
          <div
            onClick={() => {
              size2();
            }}
            className="h-10 w-10 border bg-black text-white uppercase flex justify-center items-center text-lg cursor-pointer"
          >
            MD
          </div>
          <div
            onClick={() => {
              size3();
            }}
            className="h-10 w-10 border bg-black text-white uppercase flex justify-center items-center text-lg cursor-pointer"
          >
            +LG
          </div>
        </div>
      </div>

      <Header />
      <div className="pl-20 pr-20 pt-5 pb-10" id="mydiv1">
        <div className="font-semibold text-4xl heading1">
          Screen Reader Access
        </div>
        <div className="pt-2 pb-4 text-lg text1">
          Information related to the various screen readers
        </div>
        <table class="table-auto w-full ">
          <thead>
            <tr className="border-2">
              <th className="pt-5 pb-5 border-2 text1">Screen Reader</th>
              <th className="text1">Website</th>
              <th className="border-l-2 text1">Free / Commercial</th>
            </tr>
          </thead>
          <tbody>
            <Info
              name="Non Visual Desktop Access (NVDA)"
              url="http://www.nvda-project.org/"
              status="free"
            ></Info>
            <Info
              name="Thunder"
              url="http://www.screenreader.net/index.php?pageid=2"
              status="free"
            ></Info>
            <Info
              name="System Access To Go"
              url="http://www.satogo.com/"
              status="free"
            ></Info>
            <Info
              name="WebAnywhere"
              url="http://webinsight.cs.washington.edu/"
              status="Commercial"
            ></Info>
            <Info
              name="Hal"
              url="http://www.yourdolphin.co.uk/productdetail.asp?id=5"
              status="Commercial"
            ></Info>
            <Info
              name="JAWS"
              url="http://www.freedomscientific.com/Downloads/JAWS"
              status="Commercial"
            ></Info>
            <Info
              name="Supernova"
              url="http://www.yourdolphin.co.uk/productdetail.asp?id=1"
              status="Commercial"
            ></Info>
            <Info
              name="Window-Eyes"
              url="http://www.gwmicro.com/Window-Eyes/"
              status="Commercial"
            ></Info>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default index;
