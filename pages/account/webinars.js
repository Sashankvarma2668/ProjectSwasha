import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { courseLevels } from "../../utils/Data";

export default function Webinars() {
  const router = useRouter();
  const [webinars, setWebinars] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  Webinars.getInitialProps = async () => {
    return {};
  };

  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
    axios
      .post(API_URL + "webinars/get_webinars.php", {
        student: StudentData().ID,
      })
      .then(function (response) {
        if (response?.data?.meta?.error) {
          setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        }
        if (!response?.data?.meta?.error) {
          setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
          setWebinars(response?.data?.data);
        }
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router]);
  return pageLoading === false ? (
    <>
      <Head>
        <title>Webinars - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />

      <div>
        <section class="py-20 bg-indigo-100">
          <div class="container max-w-6xl mx-auto">
            {webinars ? (
              <>
                <div className="title-font text-2xl sm:text-4xl mb-10 font-bold text-gray-900 flex justify-center">Webinars</div>
                {/* <p class="mt-2 text-lg text-center text-gray-600">Check out y below.</p> */}
              </>
            ) : (
              ""
            )}
            <div className="mx-auto py-5 md:py-5 px-3 md:px-6 lg:py-5 lg:px-1">
              <div className="grid space-x-1 lg:grid-cols-3 grid-cols-1">
                {webinars ? (
                  webinars.map((webinar) => {
                    return (
                      <div className="">
                        <div className="card bg-white rounded-2xl">
                          <img src={process.env.adminUrl + webinar.Image} alt="cannot find" className="rounded-2xl rounded-b-none object-cover h-36 md:h-52 w-full" />
                          <div className="m-5">
                            <div className="title">
                              <span className="inline-flex items-center justify-center py-1 text-xl font-bold text-indigo-500">{webinar.WebinarTitle}</span>
                            </div>
                            <div className="body text-gray-500 py-3">{webinar.WebinarDescription}</div>
                            <div className="text-gray-500">
                              <span className="text-gray-600 font-bold"></span> {webinar.Speakers}
                            </div>
                            <div className="flex justify-between items-center mt-3 pb-5">
                              <div>
                                <div className="text-sm text-gray-500 pt-1">
                                  <span className="text-gray-600 font-bold">Date:</span> {webinar.Date}
                                </div>
                                <div className="text-sm text-gray-500 pt-1">
                                  <span className="text-gray-600 font-bold">Time:</span> {webinar.StartTime + " - " + webinar.EndTime}
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Link key={webinar.ID} href={webinar.WebinarLink}>
                                  <a>
                                    <button className="text-indigo-500 bg-indigo-100 hover:bg-indigo-200 transform transition px-4 py-1 rounded-lg mr-3">
                                      Join Here
                                      {/* <ArrowNarrowRightIcon className="ml-2 h-4 inline-block hover:ml-4" /> */}
                                    </button>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-12 text-center py-5 mx-auto">
                    <img src="../../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
                    No webinars available at this moment.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center bg-indigo-100">
      <span class="relative h-20 w-20">
        <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
      </span>
    </div>
  );
}
