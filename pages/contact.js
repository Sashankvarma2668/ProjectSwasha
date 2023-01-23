/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import { useState } from "react";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { API_URL } from "../config/constants";
import Header from "./template/header";
import Footer from "./template/footer";
import Head from "next/head";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function contactus() {
  const [agreed, setAgreed] = useState(false);

  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);

  const [mobile, setMobile] = useState();
  const [mobileError, setMobileError] = useState(false);

  const [message, setMessage] = useState();
  const [messageError, setMessageError] = useState(false);

  const formsubmit = (e) => {
    e.preventDefault();

    // console.log(obj)

    var success_message = document.getElementById("success_message");
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!mobile) {
      setMobileError(true);
    } else {
      setMobileError(false);
    }
    if (!message) {
      setMessageError(true);
    } else {
      setMessageError(false);
    }

    if (email && mobile && message) {
      const obj = {
        email: email,
        mobile: mobile,
        message: message,
      };
      axios.post(API_URL + "contact.php", obj);
      success_message.style.display = "block";
    }
  };

  return (
    <div>
      <Head>
        <title>Contact Us - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />

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
              Contact Us
            </h2>
          </div>
          <div className="mt-12">
            <form
              method="POST"
              className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            >
              <div className="sm:col-span-2 hidden" id="success_message">
                <div class="flex justify-center items-center m-1 font-medium py-1 px-2  rounded-md text-white bg-green-500 border border-green-500 ">
                  <div slot="avatar">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-check-circle w-5 h-5 mx-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div class="text-xl font-normal  max-w-full flex-initial">
                    <div class="py-2">
                      Message Successfully Sent
                      <div class="text-sm font-base">
                        More information about the message can be found{" "}
                        <a href="/#">here</a>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-auto flex-row-reverse">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-x cursor-pointer hover:text-green-400 rounded-full w-5 h-5 ml-2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                {emailError ? (
                  <span className="text-red-500" id="email_error">
                    Enter your Email
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile No
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                    id="mobile_no"
                    name="mobile_no"
                    type="text"
                    autoComplete="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                {mobileError ? (
                  <span className="text-red-500" id="mobile_error">
                    Enter your Mobile
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    id="message"
                    name="message"
                    rows={4}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    defaultValue={""}
                  />
                </div>
                {messageError ? (
                  <span className="text-red-500" id="message_error">
                    Enter your Message
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="sm:col-span-2">
                <button
                  onClick={(e) => {
                    formsubmit(e);
                  }}
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-nirmaan hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* {email}{mobile}{message} */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
