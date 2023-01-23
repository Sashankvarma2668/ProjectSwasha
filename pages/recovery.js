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
  const router = useRouter();
  const [loginMessage, setLoginMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [recoveryToken, setRecoveryToken] = useState(router.query.token);
  const [referenceId, setReferenceId] = useState("");
  Home.getInitialProps = async () => {
    return {};
  };
  useEffect(() => {
    if (isStudentLoggedIn() === true) {
      router.push("/");
    }
    // if (recoveryToken) {
    //   axios
    //     .post(API_URL + "check-recovery-token.php", {
    //       token: recoveryToken,
    //     })
    //     .then(function (response) {
    //       if (response?.data?.meta?.error) {
    //         setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
    //       }
    //       if (!response?.data?.meta?.error) {
    //         setReferenceId(response?.data?.id);
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }
  }, []);

  function updatePassword(e) {
    e.preventDefault();
    if (password.trim() === "") {
      setLoginMessage({
        type: "error",
        message: "Please enter new password.",
        icon: "error",
      });
    } else if (confPassword.trim() !== password.trim()) {
      setLoginMessage({
        type: "error",
        message: "Confirm password should be match with password.",
        icon: "error",
      });
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password)
    ) {
      setLoginMessage({
        type: "error",
        message:
          "Password: minimum eight characters, at least one number and one special character.",
        icon: "error",
      });
    } else {
      axios
        .post(API_URL + "change-password.php", {
          password: password,
          //   reference_id: referenceId,
          token: recoveryToken,
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
              icon: "success",
            });
            setRecoveryToken("");
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
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
          <div className="relative max-w-lg mx-auto">
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
                Change Password!
              </h2>
            </div>
            <div className="mt-6">
              <form
                action="#"
                method="POST"
                className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                {recoveryToken ? (
                  <>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
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
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          required
                          onChange={(e) => setConfPassword(e.target.value)}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}

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
                {recoveryToken ? (
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      onClick={(e) => updatePassword(e)}
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ""
                )}
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
