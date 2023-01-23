/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, RefreshIcon, XCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

export default function Alert(props) {
  const [background_color, setBgColor] = useState("bg-green-50");
  const [text_color, setTextColor] = useState("text-green-800");
  const [text, setText] = useState(props.message);
  useEffect(() => {
    if (props.type === "error") {
      setBgColor("bg-red-50");
      setTextColor("text-red-800");
    } else if (props.type === "success") {
      setBgColor("bg-green-50");
      setTextColor("text-green-800");
    } else if (props.type === "warning") {
      setBgColor("bg-yellow-50");
      setTextColor("text-yellow-800");
    }
    setText(props.message);
  }, [props.message, props.type]);
  return (
    <div className={"rounded-md p-4 " + background_color}>
      <div className="flex">
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
        <div className="ml-3">
          <p className={"text-sm font-medium " + text_color}>{text}</p>
        </div>
        {/* <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
// export async function getStaticProps({ req, props }) {
//   console.log(req);
//   console.log(props);
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
