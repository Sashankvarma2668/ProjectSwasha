import React from "react";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Popup from "../ui/ok";
import Alert from "../ui/alert";
const Feedback = (props) => {
  const [isShowing, setIsShowing] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [myfeedback, setMyFeedback] = useState("");
  const [loginMessage, setLoginMessage] = useState({ title: "", message: "", icon: "" });

  function submit1(e) {
    e.preventDefault();
    axios
      .post(API_URL + "courses/feedback.php", {
        Student_id: props.student,
        Topic_id: props.topic,
        feedback: "yes",
      })
      .then(function (response) {
        if (response.data.meta.error === true) {
          setLoginMessage({ title: "error", message: response.data?.meta?.message, icon: "error" });
        }
        if (response.data.meta.error === false) {
          setLoginMessage({ title: "success", message: response.data?.meta?.message, icon: "success" });
          //   props.userAdded(response.data?.id);
          //   closedSuccess(response.data?.meta?.message);
          setOpenPopup(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // }
  }

  function submit2(e) {
    e.preventDefault();
    if (myfeedback) {
      axios
        .post(API_URL + "courses/feedback.php", {
          Student_id: props.student,
          Topic_id: props.topic,
          feedback: myfeedback,
        })
        .then(function (response) {
          if (response.data.meta.error === true) {
            setLoginMessage({ title: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (response.data.meta.error === false) {
            setLoginMessage({ title: "success", message: response.data?.meta?.message, icon: "success" });
            setOpenPopup(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      setIsShowing(false);
    } else {
      setLoginMessage({ title: "error", message: "Please write something!", icon: "error" });
    }
  }
  function handlePopupClosed() {
    setOpenPopup(false);
    console.log("closed");
  }
  return (
    <div>
      <Popup open={openPopup} handleClosed={(e) => setOpenPopup(false)} message={loginMessage.message} title={loginMessage.title} buttonText="OK" icon={loginMessage.icon} />
      {/* {loginMessage.message ? <Notification type={loginMessage.type} message={loginMessage.message} icon={loginMessage.icon} /> : ""} */}
      <div className="bg-gray-200 px-10 py-5 ">
        <div>
          <div className="text-2xl pb-4 font-semibold text-black">Is this topic useful?</div>

          <button
            onClick={(e) => submit1(e)}
            type="button"
            class="mr-3 inline-flex justify-center  items-center space-x-2 rounded border font-semibold focus:outline-none px-5 py-2 leading-5 text-sm border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200">
            Yes
          </button>

          <button
            onClick={() => setIsShowing((isShowing) => !isShowing)}
            type="button"
            class="inline-flex justify-center items-center space-x-2 rounded border font-semibold focus:outline-none px-5 py-2 leading-5 text-sm border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200">
            No
          </button>
        </div>
      </div>

      <Transition show={isShowing} enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div class="z-90 fixed inset-0 overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-75 p-4 lg:pt-32" tabindex="-1" role="dialog" aria-labelledby="tk-modal-with-form" aria-hidden="false">
          <div class="flex flex-col rounded shadow-sm bg-white overflow-hidden w-full max-w-md mx-auto" role="document">
            <div class="py-4 px-5 lg:px-6 w-full bg-gray-50 flex justify-between items-center">
              <h3 class="font-medium flex items-center justify-center space-x-3">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
                  <path d="M7 7h10v2H7zm0 4h7v2H7z"></path>
                </svg>
                <span class="mb-1">Review</span>
              </h3>
              <div class="-my-4">
                <button
                  onClick={() => setIsShowing((isShowing) => !isShowing)}
                  type="button"
                  class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm rounded border-transparent text-gray-600 hover:text-gray-400 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:text-gray-600">
                  <svg class="hi-solid hi-x inline-block w-4 h-4 -mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-5 lg:p-6 flex-grow w-full">
              <textarea
                onChange={(e) => setMyFeedback(e.target.value)}
                value={myfeedback}
                class="w-full block border border-gray-200 rounded px-2 py-8 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                type="text"
                id="tk-modals-simple-email"
                placeholder="Please enter a reason why you are not satisfied with the topic !"></textarea>
              <div className="mt-3">{loginMessage.message ? <Alert type={loginMessage.title} message={loginMessage.message} icon={loginMessage.icon} /> : ""}</div>
            </div>
            <div class="py-4 px-5 lg:px-6 w-full bg-gray-50 text-right space-x-1">
              <button
                onClick={() => setIsShowing((isShowing) => !isShowing)}
                type="button"
                class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-transparent text-indigo-600 hover:text-indigo-400 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:text-indigo-600">
                Cancel
              </button>
              <button
                onClick={(e) => submit2(e)}
                type="button"
                class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                Send
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Feedback;
