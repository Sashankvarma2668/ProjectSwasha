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
import { districtsData } from "../../utils/Data";
import { UserCircleIcon, UserIcon, LightningBoltIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function EditProfile() {
  const router = useRouter();
  const [studentData, setStudentData] = useState(StudentData());
  const [userId, setUserId] = useState(studentData.ID);

  const [myimage, setMyImage] = useState("");
  const [userimage, setUserImage] = useState(StudentData().Image);

  const [fullName, setFullName] = useState();
  const [fullNameError, setFullNameError] = useState(false);

  const [mobile, setMobile] = useState();
  const [mobileError, setMobileError] = useState(false);

  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [emailValidError, setEmailValidError] = useState(false);

  const [state, setState] = useState();
  const [stateError, setStateError] = useState("");

  const [stateKey, setStateKey] = useState(districtsData.findIndex((x) => x.state === studentData.State));
  const [district, setDistrict] = useState();
  const [districtError, setDistrictError] = useState(false);

  const [city, setCity] = useState();
  const [cityError, setCityError] = useState(false);

  const [area, setArea] = useState();
  const [areaError, setAreaError] = useState(false);

  const [school, setSchool] = useState("");
  const [schoolError, setSchoolError] = useState(false);

  const [address, setAddress] = useState();
  const [addressError, setAddressError] = useState(false);

  const [myClass, setMyClass] = useState("");
  const [studentClassError, setClassError] = useState(false);

  const [country, setCountry] = useState(studentData.Country);

  const [schools, setSchools] = useState("");
  const [schoolInput, setSchoolInput] = useState(false);

  const [gender, setGender] = useState("");

  const [imgfile, uploadimg] = useState("");

  const [loginMessage, setLoginMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  // const [addLocationMessage, setAddLocationMessage] = useState({
  //   type: "",
  //   message: "",
  //   icon: "",
  // });





  // useEffect(() => {
  //   if(document.getElementById("mydiv1")){
  //     onColoursLoading();
  //     onFontLoading();
  //     }
  // });




  // function setLocalColors(bg, color) {
  //   localStorage.setItem("background_color", bg);
  //   localStorage.setItem("text_color", color);
  // }

  // function setLocalFonts(heading, text) {
  //   localStorage.setItem("heading",heading);
  //   localStorage.setItem("text", text);
  // }

  // function onColoursLoading() {
  //   document.getElementById("mydiv1").style.backgroundColor =
  //     localStorage.getItem("background_color");
  //   document.getElementById("mydiv1").style.color =
  //     localStorage.getItem("text_color");
  // }


  // function onFontLoading() {

  //   document.getElementsByClassName("heading1")[0].style.fontSize =
  //     localStorage.getItem("heading");

  //   for (let i = 0; i < 10; i++) {
      
  //   document.getElementsByClassName("text1")[i].style.fontSize =
  //     localStorage.getItem("text");
  //   }

    
  // }










  // function firstcolor() {
  //   document.getElementById("mydiv1").style.backgroundColor = "#FFFFFF";
  //   document.getElementById("mydiv1").style.color = "#343A40";

  //   setLocalColors("#FFFFFF",  "#343A40");
  // }

  // function secondcolor() {
  //   document.getElementById("mydiv1").style.backgroundColor = "#343A40";
  //   document.getElementById("mydiv1").style.color = "#FFFF00";

  //   setLocalColors("#343A40", "#FFFF00");
  // }

  // function thirdcolor() {
  //   document.getElementById("mydiv1").style.backgroundColor = "#0F2B5B";
  //   document.getElementById("mydiv1").style.color = "#FFFFFF";

  //   setLocalColors("#0F2B5B", "#FFFFFF");
  // }

  // function fourthcolor() {
  //   document.getElementById("mydiv1").style.backgroundColor = "#51B5E0";
  //   document.getElementById("mydiv1").style.color = "#000000";

  //   setLocalColors("#51B5E0", "#000000");
  // }
  // function fifthcolor() {
  //   document.getElementById("mydiv1").style.backgroundColor = "#CEE007";
  //   document.getElementById("mydiv1").style.color = "#000000";

  //   setLocalColors("#CEE007", "#000000");
  // }
  // function sixthcolor() {
  //   document.getElementById("mydiv1").style.backgroundColor = "#F77F00";
  //   document.getElementById("mydiv1").style.color = "#000000";

  //   setLocalColors("#F77F00", "#000000");
  // }


//   function size1() {
//     document.getElementsByClassName("heading1")[0].style.fontSize = "35px";

// for(let i=0;i<10;i++){
//   document.getElementsByClassName("text1")[i].style.fontSize= "15px";
//   console.log(document.getElementsByClassName("text1")[i]);
// }
// setLocalFonts("35px","15px");
    
//   }
//   function size2() {
//     document.getElementsByClassName("heading1")[0].style.fontSize = "40px";

//     for(let i=0;i<10;i++){
//       document.getElementsByClassName("text1")[i].style.fontSize= "20px";
//       console.log(document.getElementsByClassName("text1")[i]);
//     }

//     setLocalFonts("40px","20px");
    
//   }
//   function size3() {
//     document.getElementsByClassName("heading1")[0].style.fontSize = "45px";

//     for(let i=0;i<10;i++){
//       document.getElementsByClassName("text1")[i].style.fontSize= "25px";
//       console.log(document.getElementsByClassName("text1")[i]);
//     }

//     setLocalFonts("45px","25px");

//   }








  function schoolChange(school) {
    if (school === "other") {
      setSchoolInput(true);
    } else {
      setSchoolInput(false);
    }
  }

  EditProfile.getInitialProps = ({}) => {
    return {};
  };

  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
    setFullName(studentData.FullName);
    setMobile(studentData.Mobile);
    setEmail(studentData.Email);
    setState(studentData.State);
    setDistrict(studentData.District);
    setCity(studentData.City);
    setArea(studentData.Area);
    setSchool(studentData.School);
    setAddress(studentData.Address);
    setMyClass(studentData.Class);
    setGender(studentData.Gender);
    
  }, []);

  function imagehandler(img) {
    uploadimg(URL.createObjectURL(img));

    setMyImage(img);
  }

  function submitLocation(e) {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("user_id", userId);
    if (myimage) {
      formData.append("file", myimage);
    }
    formData.append("fullname", fullName);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("distrtct", district);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("school", school);
    formData.append("address", address);
    formData.append("my_class", myClass);

    axios
      .post(API_URL + "account/edit_profile.php", formData, config)
      .then(function (response) {
        if (response.data.meta.error === true) {
          setAddLocationMessage({
            type: "error",
            message: response.data?.meta?.message,
            icon: "error",
          });
        }
        if (response.data.meta.error === false) {
          setAddLocationMessage({
            type: "success",
            message: response.data?.meta?.message,
            icon: "loading",
          });
          props.locationUpdated(new Date().getTime());
          closedSuccess(response.data?.meta?.message);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });


      
  }

  function submitData(e) {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("user_id", userId);
    if (myimage) {
      formData.append("file", myimage);
    }
    formData.append("fullname", fullName);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("school", school);
    formData.append("address", address);
    formData.append("my_class", myClass);
    formData.append("gender", gender);
    formData.append("email", email);

    // const data_obj = {
    //   fullname: fullName,
    //   mobile: mobile,
    //   state: state,
    //   district: district,
    //   city: city,
    //   area: area,
    //   school: school,
    //   address: address,
    //   my_class: myClass,
    //   user_id: userId,
    // };

    if (fullName.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please enter full name.", icon: "error" });
      // document.getElementById("full_name").focus();
      setFullNameError(true);
    } else {
      setFullNameError(false);
    }
    if (mobile.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please enter mobile.", icon: "error" });
      // document.getElementById("mobile").focus();
      setMobileError(true);
    } else {
      setMobileError(false);
    }

    if (state.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please select state.", icon: "error" });
      // document.getElementById("nationality").focus();
      setStateError(true);
    } else {
      setStateError(false);
    }
    if (district.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please select District.", icon: "error" });
      // document.getElementById("nationality").focus();
      setDistrictError(true);
    } else {
      setDistrictError(false);
    }
    if (city.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please select city.", icon: "error" });
      // document.getElementById("nationality").focus();
      setCityError(true);
    } else {
      setCityError(false);
    }

    if (area.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please select area.", icon: "error" });
      // document.getElementById("nationality").focus();
      setAreaError(true);
    } else {
      setAreaError(false);
    }

    if (address.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please enter address.", icon: "error" });
      // document.getElementById("nationality").focus();
      setAddressError(true);
    } else {
      setAddressError(false);
    }

    if (school.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please select class.", icon: "error" });
      // document.getElementById("class").focus();
      setSchoolError(true);
    } else {
      setSchoolError(false);
    }

    if (myClass.trim() === "") {
      // setLoginMessage({ type: "error", message: "Please select class.", icon: "error" });
      // document.getElementById("class").focus();
      setClassError(true);
    } else {
      setClassError(false);
    }

    if (fullName.trim() !== "" && mobile.trim() !== "" && school.trim() !== "" && myClass.trim() !== "") {
      if (country.trim() === "IND" && state.trim() !== "" && district.trim() !== "" && area.trim() !== "") {
        updateData();
      }
      if (country.trim() !== "IND" && address.trim() !== "") {
        updateData();
      }
      //   setLoginMessage({ type: "error", message: "Please enter fields", icon: "error" });
      // } else {
    }

    function updateData() {
      axios
        .post(API_URL + "account/edit_profile.php", formData, config)
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({
              type: "error",
              message: response.data?.meta?.message,
              icon: "error",
            });
          }
          if (!response?.data?.meta?.error) {
            location.reload();
            setLoginMessage({
              type: "success",
              message: response.data?.meta?.message,
              icon: "success",
            });
            Cookies.set("student_data", JSON.stringify(response.data?.data), {
              expires: 10,
            });
          }
         
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Edit Profile - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      









      {/* <div className="md:h-9 h-24 w-full bg-gray-200 border md:flex md:items-center md:justify-around md:grid-cols-2 grid-cols-1 space-y-3 md:space-y-0">
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
            -A
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
      </div> */}




	












      <Header />









      {/* sign in form start */}
      <div>
        <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-16" id="mydiv1">
          <div className="relative max-w-3xl mx-auto">
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

            <div className="px-3 md:px-10">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl heading1">
                  Edit Profile
                </h2>
              </div>

              <div className="mt-6">
                <form method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium text1"
                    >
                      Full Name *
                    </label>
                    <div className="mt-1">
                      <input
                        require
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                        type="text"
                        name="full-name"
                        id="full-name"
                        value={fullName}
                        autoComplete="given-name"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
                      />
                    </div>
                    {fullNameError ? (
                      <span className="text-red-500" id="email_error">
                        Enter your Full Name
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="mobile-no"
                      className="block text-sm font-medium text1"
                    >
                      Mobile No *
                    </label>
                    <div className="mt-1">
                      <input
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                        }}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
                      />
                    </div>
                    {mobileError ? (
                      <span className="text-red-500" id="email_error">
                        Enter your Mobile Number
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text1"
                    >
                      Email *
                    </label>
                    <div className="mt-1">
                      <input
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
                      />
                    </div>

                    {emailError ? (
                      <span className="text-red-500" id="email_error">
                        Enter your Email
                      </span>
                    ) : (
                      ""
                    )}
                    {emailValidError ? (
                      <span className="text-red-500" id="email_valid_error">
                        Enter valid Email
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  {studentData.Country === "IND" ? (
                    <>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text1"
                        >
                          State *
                        </label>
                        <div className="mt-1">
                          <div class="">
                            <select
                              onChange={(e) => {
                                setState(districtsData[e.target.value].state), setStateKey(e.target.value);
                              }}
                              name="state"
                              value={stateKey}
                              className=" min-w-full w-full border border-gray-300 rounded-md h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 appearance-none text-black"
                            >
                              {districtsData
                                ? districtsData.map((state, key) => {
                                    return <option value={key}>{state.state}</option>;
                                  })
                                : ""}
                            </select>
                          </div>
                        </div>
                        {stateError ? (
                          <span className="text-red-500 text1" id="email_error">
                            Select Your State
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="district"
                          className="block text-sm font-medium text1"
                        >
                          District *
                        </label>
                        <div className="mt-1">
                          <div class="">
                            <select
                              onChange={(e) => {
                                setDistrict(e.target.value);
                              }}
                              value={district}
                              name="district"
                              className="w-full border border-gray-300 rounded-md h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 appearance-none text-black"
                            >
                              <option>Select District</option>
                              {stateKey
                                ? districtsData[stateKey].districts.map((district) => {
                                    return <option value={district}>{district}</option>;
                                  })
                                : ""}
                            </select>
                          </div>
                        </div>
                        {districtError ? (
                          <span className="text-red-500" id="email_error">
                            Select Your District
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text1"
                        >
                          City *
                        </label>
                        <div className="mt-1">
                          <input
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="given-name"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
                          />
                        </div>
                        {cityError ? (
                          <span className="text-red-500" id="email_error">
                            Enter your city
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="area"
                          className="block text-sm font-medium text1"
                        >
                          Area *
                        </label>
                        <div className="mt-1">
                          <input
                            value={area}
                            onChange={(e) => {
                              setArea(e.target.value);
                            }}
                            type="text"
                            name="area"
                            id="area"
                            autoComplete="family-name"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
                          />
                        </div>
                        {areaError ? (
                          <span className="text-red-500" id="email_error">
                            Enter your Area
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text1"
                      >
                        Address *
                      </label>
                      <div className="mt-1">
                        <input
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          type="text"
                          name="address"
                          id="address"
                          autoComplete="organization"
                          className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                      {addressError ? (
                        <span className="text-red-500" id="email_error">
                          Enter your Address
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  {/* <div className="col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text1"
                    >
                      School/College *
                    </label>
                    <div className="mt-1">
                      <select
                        name="school"
                        onChange={(e) => {
                          setSchool(e.target.value), schoolChange(e.target.value);
                        }}
                        value={school}
                        className=" w-full border border-gray-300 rounded-md h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none text-black"
                      >
                        <option>Select School</option>
                        {schools
                          ? schools.map((school) => {
                              return <option value={school.SchoolName}>{school.SchoolName}</option>;
                            })
                          : ""}
                        <option value="other">Other</option>
                      </select>
                      {schoolInput ? (
                        <input
                          placeholder="Enter school name"
                          onChange={(e) => setSchool(e.target.value)}
                          type="text"
                          name="school"
                          id="school"
                          autoComplete="organization"
                          className="mt-6 py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md text-black"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {schoolError ? (
                      <span className="text-red-500" id="email_error">
                        Enter select or enter your school
                      </span>
                    ) : (
                      ""
                    )}
                  </div> */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text1"
                    >
                      Gender *
                    </label>
                    <div className="mt-1">
                      <select
                        name="gender"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        className=" min-w-full w-full border border-gray-300 rounded-md h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none text-black"
                      >
                        <option>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* <div className="sm:col-span-2">
                    <label
                      htmlFor="School"
                      className="block text-sm font-medium text-gray-700"
                    >
                      School/College *
                    </label>
                    <div className="mt-1">
                      <input
                        value={school}
                        onChange={(e) => {
                          setSchool(e.target.value);
                        }}
                        type="text"
                        name="school"
                        id="school"
                        autoComplete="organization"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    {schoolError ? (
                      <span className="text-red-500" id="email_error">
                        Enter your School
                      </span>
                    ) : (
                      ""
                    )}
                  </div> */}
{/* 
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="class"
                      className="block text-sm font-medium text1"
                    >
                      Class *
                    </label>
                    <div className="mt-1">
                      <div class="">
                        <select
                          onChange={(e) => {
                            setMyClass(e.target.value);
                          }}
                          value={myClass}
                          name="class"
                          className="w-full border border-gray-300 rounded-md h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 appearance-none text-black"
                        >
                          <option value="">Select Class</option>
                          <option value="6">6th Class</option>
                          <option value="7">7th Class</option>
                          <option value="8">8th Class</option>
                          <option value="9">9th Class</option>
                          <option value="10">10th Class</option>
                          <option value="11">11th Class</option>
                          <option value="12">12th Class</option>
                        </select>
                      </div>
                    </div>
                    {studentClassError ? (
                      <span className="text-red-500" id="email_error">
                        Select Your Class
                      </span>
                    ) : (
                      ""
                    )}
                  </div> */}

                  <div className="sm:col-span-2">
                    <label class="block text-sm font-medium text1">
                      {" "}
                      Photo{" "}
                    </label>
                    <div class="mt-1 flex items-center p-2">
                      <span class="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">{myimage ? <img src={imgfile} className="h-full w-full " /> : <img src={userimage ? API_URL + userimage : "/usericon.png"} className="h-full w-full " />}</span>

                      <input onChange={(e) => imagehandler(e.target.files[0])} type="file" multiple accept="image/*" name="image" id="image" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 p-3" />
                      {/* <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Change</button> */}
                    </div>
                  </div>

                  {/* <div className="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">
                      {" "}
                      Cover photo{" "}
                    </label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                        <svg
                          class="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div class="flex text-sm text-gray-600 pb-2">
                          <label
                            for="file-upload"
                            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span className="p-2">Upload a file</span>
                            <input
                              onChange={(e) => setMyImage(e.target.files[0])}
                              type="file"
                              accept="image/*"
                              className="bg-gray-100"
                            />
                          </label>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG , JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}

                  {/* <div>

select picture

  <div className="sm:col-span-2">
    <input
      onChange={(e) => setMyImage(e.target.files[0])}
      type="file"
      multiple
      accept="image/*"
      name="image"
      id="image"
      className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
    />
  </div>



</div> */}

                  <div className="sm:col-span-2">{loginMessage.message ? <Alert type={loginMessage.type} message={loginMessage.message} icon={loginMessage.icon} /> : ""}</div>
                  <div className="sm:col-span-2">
                    <button
                      onClick={(e) => {
                        submitData(e);
                      }}
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-nirmaan hover:bg-nirmaan-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sign in form end */}
      <Footer />
    </>
  );
}
