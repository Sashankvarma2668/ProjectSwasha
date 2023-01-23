import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../config/constants";
import Alert from "../components/ui/alert";
import { isStudentLoggedIn, StudentData } from "../utils/Student";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [remember, setRemember] = useState(false);
  const [loginMessage, setLoginMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const refer = router.query.refer ?? "";

  useEffect(() => {
    if (isStudentLoggedIn() === true) {
      // console.log(isStudentLoggedIn());
      router.push("/");
    }
  }, []);

  function Login(e) {
    // else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    //   setLoginMessage({ type: "error", message: "Please enter valid email.", icon: "error" });
    // }
    e.preventDefault();
    if (email.trim() === "") {
      setLoginMessage({
        type: "error",
        message: "Please enter email.",
        icon: "error",
      });
    } else if (password.trim() === "") {
      setLoginMessage({
        type: "error",
        message: "Please enter password.",
        icon: "error",
      });
    } else {
      axios
        .post(API_URL + "login.php", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({
              type: "error",
              message: response.data?.meta?.message,
              icon: "error",
            });
          }
          if (!response?.data?.meta?.error) {
            setLoginMessage({
              type: "success",
              message: response.data?.meta?.message,
              icon: "loading",
            });
            Cookies.set("student_login_token", response.data?.data?.ID, {
              expires: 10,
            });
            Cookies.set("student_data", JSON.stringify(response.data?.data), {
              expires: 10,
            });
            if (response.data?.data) {
              if (refer) {
                router.push(refer);
              } else {
                router.push("/");
              }
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
        <title>Sign In - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      {/* sign in form start */}
      <div>
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
          <div className="relative max-w-xl mx-auto">
            <svg
              className="absolute left-full transform translate-x-1/2"
              width={404}
              height={404}
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={404}
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
            <svg
              className="absolute right-full bottom-0 transform -translate-x-1/2"
              width={404}
              height={404}
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={404}
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Sign In
              </h2>
            </div>
            <div className="sm:col-span-2 mt-3">
              {refer ? (
                <Alert
                  type="warning"
                  message="Please login to continue.."
                  icon="warning"
                />
              ) : (
                ""
              )}
            </div>
            <div className="mt-6">
              <form
                action="#"
                method="POST"
                className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email ID
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-nirmaan border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember_me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link href="/forgot-password">
                        <a className="font-medium text-nirmaan hover:text-nirmaan-dark">
                          Forgot your password?
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  {loginMessage.message ? (
                    <Alert
                      type={loginMessage.type}
                      message={loginMessage.message}
                      icon={loginMessage.icon}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    onClick={(e) => Login(e)}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-nirmaan hover:bg-nirmaan-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan"
                  >
                    Sign in
                  </button>
                </div>
                <div className="mt-6 sm:col-span-2">
                  <div className="relative mb-7">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Don't Have an Account?
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Link href="/register">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-nirmaan border-nirmaan hover:bg-nirmaan hover:text-nirmaan-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan"
                      >
                        Create Account
                      </button>
                    </Link>
                  </div>
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
