/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { API_URL } from "../../config/constants";
import Lottie from "react-lottie-player";
import happyPerson from "../../public/lottie/lf30_oplw77ee.json";

export default function QuizCompleted(props) {
  const [open, setOpen] = useState(props.open);
  const [points, setPoints] = useState();
  const ref = useRef(null);
  useEffect(() => {
    setOpen(props.open);
    setPoints(props.points);
  }, [props]);

  function handleClose() {
    props.handleClosed();
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed z-30 inset-0 overflow-y-auto" open={open} onClose={() => handleClose()}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-48 w-48">
                  <Lottie ref={ref} background="transparent" speed="1" loop play animationData={happyPerson} style={{ zIndex: "40", width: "200px", height: "200px" }} autoplay />
                  {/* <lottie-player ref={ref} src="https://assets1.lottiefiles.com/private_files/lf30_oplw77ee.json" background="transparent" speed="1" loop style={{ zIndex: "40", width: "200px", height: "200px" }} autoPlay></lottie-player> */}
                </div>
                {/* <embed src="audio/coin-drop.wav" hidden="true" autostart="true" loop="1"></embed> */}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-2xl leading-6 font-medium text-gray-900">
                    Quiz Completed
                  </Dialog.Title>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">
                      You have earned <strong>{points} credits</strong> for completing the quiz.
                    </p>
                  </div>
                </div>
              </div>
              <audio preload="auto" autoPlay={true} src="/audio/success.mp3" type="audio/mpeg" />
              <div className="mt-5 sm:mt-6 flex justify-center">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
                  onClick={() => handleClose()}>
                  Dismiss
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
