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
import { TerminalIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function studentLoggedIn() {
  return isStudentLoggedIn();
}
export default function Programs() {
  const [remember, setRemember] = useState(false);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentData, setStudentData] = useState(StudentData());
  const router = useRouter();

  Programs.getInitialProps = ({}) => {
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
        <title>Profile - Nirmaan Learning Platform</title>
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
            {/* <div className="mb-5 px-5 md:px-14 md:py-10 md:border pt-4 rounded-2xl">
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-20 text-yellow-500 bi bi-trophy" viewBox="0 0 16 16">
                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z" />
                  </svg>
                  <div className="ml-4">
                    <h3 className="text-3xl leading-6 font-extrabold text-gray-900">{studentData?.FullName}</h3>
                    <p className="mt-2 max-w-2xl text-md text-gray-500">
                      Points: <span className="font-bold">100 Pts</span>
                    </p>
                    <p className="mt-1 max-w-2xl text-md text-gray-500">
                      Level: <span className="text-yellow-500">Bronze</span>
                    </p>
                  </div>
                </div>
                <div>
                  <img src="/images/codebeginner-badge.png" width="90px" />
                </div>
              </div>
            </div> */}

            <div className="px-5 md:px-14 md:py-14 md:border pt-4 rounded-2xl">
              <div className="flex justify-between">
                <div className="flex gap-x-3">
                  <div>
                    <TerminalIcon className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">My Programs</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">You can manage your saved programs from here.</p>
                  </div>
                </div>
                <div>
                  {/* <Link href="/account/edit-profile">
                    <button class="bg-nirmaan px-2 md:px-5 py-3 text-md shadow-sm font-medium text-white rounded-lg hover:bg-nirmaan-dark">Edit profile</button>
                  </Link> */}
                </div>
              </div>
              <div className="mt-5 border-t border-gray-200">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">S.No</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1"></dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">1. {studentData?.UniqueID}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{studentData?.UniqueID}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">1. {studentData?.UniqueID}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{studentData?.FullName}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">1. {studentData?.UniqueID}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData?.Email}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">1. {studentData?.UniqueID}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData?.Mobile}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">1. {studentData?.UniqueID}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData?.Gender}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">1. {studentData?.UniqueID}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData?.Country}</dd>
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
