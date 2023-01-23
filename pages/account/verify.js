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
import { DownloadIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function studentLoggedIn() {
  return isStudentLoggedIn();
}
export default function Verify() {
  const [remember, setRemember] = useState(false);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentData, setStudentData] = useState(StudentData());
  const router = useRouter();
  Verify.getInitialProps = ({}) => {
    return {};
    // if (isStudentLoggedIn() !== true) {
    //   router.push("/");
    // }
  };
  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
  }, []);

  function Login(e) {
    e.preventDefault();
    if (email.trim() === "") {
      setLoginMessage({ type: "error", message: "Please enter email.", icon: "error" });
    } else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setLoginMessage({ type: "error", message: "Please enter valid email.", icon: "error" });
    } else if (password.trim() === "") {
      setLoginMessage({ type: "error", message: "Please enter password.", icon: "error" });
    } else {
      axios
        .post(API_URL + "login.php", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
            Cookies.set("student_login_token", response.data?.data?.ID, { expires: 10 });
            Cookies.set("student_data", JSON.stringify(response.data?.data), { expires: 10 });
            if (response.data?.data) {
              router.push("/");
            }
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
        <title>Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      {/* sign in form start */}
      <div>
        <div className="bg-white py-16 px-0 overflow-hidden sm:px-6 lg:px-8 lg:py-16">
          <div className="relative max-w-6xl mx-auto">
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

            <div className="px-5 md:px-14 md:py-14 md:border pt-4 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Verify Now</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Download example consent form and sign on it and scan or take a picture and upload it again through below option</p>
                </div>
                <div>
                  <Link href="https://i1.wp.com/eforms.com/images/2017/07/Consent-Form-Template.png?fit=1600%2C2070&ssl=1">
                    <button class="mt-3 md:mt-0 bg-nirmaan px-4 md:px-5 py-3 text-md shadow-sm font-medium text-white rounded-lg hover:bg-nirmaan-dark"> <DownloadIcon className="h-6 w-6 inline-block"/> Download</button>
                  </Link>
                </div>
              </div>
              <div className="mt-5 border-t border-gray-200">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">


                      <div class="flex justify-center">
                        <div class="rounded-lg border bg-gray-50 lg:w-1/2">
                          <div class="m-4">
                            <label class="inline-block mb-2 text-gray-500">Upload Image(jpg,png,jpeg)</label>
                            <div class="flex items-center justify-center w-full">
                              <label class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                <div class="flex flex-col items-center justify-center pt-7">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                  </svg>
                                  <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Select a photo</p>
                                </div>
                                <input type="file" class="opacity-0" />
                              </label>
                            </div>
                          </div>
                          <div class="flex p-2 space-x-4">
                            {/* <button class="px-4 py-2 text-white bg-red-500 rounded shadow-xl">Cannel</button> */}
                            <button class="ml-2 px-4 py-2 text-white bg-green-500 rounded">Upload</button>
                          </div>
                        </div>
                      </div>



                    </dd>
                  </div>
                </dl>
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
