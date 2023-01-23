/* This example requires Tailwind CSS v2.0+ */
import { XIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Banner(props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(props.show);
  }, [props]);
  return (
    <div className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-nirmaan ` + classNames(show ? ` relative` : ` hidden`)}>
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">{props.message}</span>
            <span className="hidden md:inline">{props.message}</span>
            <span className="block sm:ml-2 sm:inline-block">
              <a target="_blank" href={props.link} className="text-white font-bold underline">
                {" "}
                Join Here <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
          <button onClick={() => setShow(false)} type="button" className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white">
            <span className="sr-only">Dismiss</span>
            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
