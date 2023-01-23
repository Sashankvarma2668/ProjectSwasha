/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, RefreshIcon, XCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";

export default function Notification(props) {
  const [show, setShow] = useState(false);
  const [text_color, setTextColor] = useState("text-green-800");
  const [text, setText] = useState(props.message);
  useEffect(() => {
    if (props.type === "error") {
      setTextColor("text-red-800");
    } else if (props.type === "success") {
      setTextColor("text-green-800");
    } else if (props.type === "warning") {
      setTextColor("text-yellow-800");
    }
    setText(props.message);
    setShow(props.show);
  }, [props.message, props.type, props.show]);
  function closed() {
    setShow(false);
    // props.onChangeShow();
  }
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div aria-live="assertive" className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                {props?.icon === "success" ? (
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className={"h-5 w-5 " + text_color} aria-hidden="true" />
                  </div>
                ) : (
                  ""
                )}
                {props?.icon === "error" ? (
                  <div className="flex-shrink-0">
                    <XCircleIcon className={"h-5 w-5 " + text_color} aria-hidden="true" />
                  </div>
                ) : (
                  ""
                )}
                {props?.icon === "warning" ? (
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon className={"h-5 w-5 " + text_color} aria-hidden="true" />
                  </div>
                ) : (
                  ""
                )}
                {props?.icon === "loading" ? (
                  <div className="flex-shrink-0">
                    <RefreshIcon className={"animate-spin h-5 w-5 " + text_color} aria-hidden="true" />
                  </div>
                ) : (
                  ""
                )}

                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{text}</p>
                  {/* {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : ""} */}
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan"
                    onClick={() => {
                      closed();
                    }}>
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}
