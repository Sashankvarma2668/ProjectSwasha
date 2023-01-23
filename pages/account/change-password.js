import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Alert from "../../components/ui/alert";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ChangePassword() {
  const [studentData, setStudentData] = useState(StudentData());
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  const [userID, setUserID] = useState(studentData.ID);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const router = useRouter();
  ChangePassword.getInitialProps = ({}) => {
    return {};
  };
  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
  }, []);




  useEffect(() => {
    if(document.getElementById("mydiv1")){
      onColoursLoading();
      onFontLoading();
      }
  });




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
    document.getElementsByClassName("heading1")[0].style.fontSize = "20px";

for(let i=0;i<3;i++){
  document.getElementsByClassName("text1")[i].style.fontSize= "10px";
  console.log(document.getElementsByClassName("text1")[i]);
}
setLocalFonts("35px","15px");
    
  }
  function size2() {
    document.getElementsByClassName("heading1")[0].style.fontSize = "30px";

    for(let i=0;i<3;i++){
      document.getElementsByClassName("text1")[i].style.fontSize= "15px";
      console.log(document.getElementsByClassName("text1")[i]);
    }

    setLocalFonts("40px","20px");
    
  }
  function size3() {
    document.getElementsByClassName("heading1")[0].style.fontSize = "50px";

    for(let i=0;i<3;i++){
      document.getElementsByClassName("text1")[i].style.fontSize= "20px";
      console.log(document.getElementsByClassName("text1")[i]);
    }

    setLocalFonts("45px","25px");

  }

















  function changePassword(e) {
    e.preventDefault();
    if (password.trim() === "") {
      setLoginMessage({ type: "error", message: "Please enter current password.", icon: "error" });
    } else if (newPassword.trim() === "") {
      setLoginMessage({ type: "error", message: "Please enter new password.", icon: "error" });
    } else if (newPassword.trim() !== confPassword.trim()) {
      setLoginMessage({ type: "error", message: "Confirm password should be match with new password.", icon: "error" });
    } else {
      axios
        .post(API_URL + "account/change_password.php", {
          new_password: newPassword,
          password: password,
          user_id: userID,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "success" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <>
      <Head>
        <title>Change Password - Nirmaan Learning Platform</title>
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
          <span className="md:text-xl text-sm"> Theme Color: </span>
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


      {/* sign in form start */}
      <div>
        <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-16" id="mydiv1">
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-full transform translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
              <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
            </svg>
            <svg className="absolute right-full bottom-0 transform -translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
              <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
            </svg>

            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl heading1">Change Password</h2>
            </div>
            <div className="mt-6">
              <form method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text1">
                    Current Password *
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      name="curr_password"
                      id="curr_password"
                      autoComplete="organization"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text1">
                    New Password *
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      value={newPassword}
                      type="password"
                      name="new_password"
                      id="new_password"
                      autoComplete="organization"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text1">
                    Confirm Password *
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setConfPassword(e.target.value);
                      }}
                      value={confPassword}
                      type="password"
                      name="con_password"
                      id="con_password"
                      autoComplete="organization"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">{loginMessage.message ? <Alert type={loginMessage.type} message={loginMessage.message} icon={loginMessage.icon} /> : ""}</div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    onClick={(e) => changePassword(e)}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-nirmaan hover:bg-nirmaan-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan text1">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* sign in form end */}
      <Footer />
    </>
  );
}
