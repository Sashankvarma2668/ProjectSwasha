import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";

export default function Search() {
  const router = useRouter();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const searchKeyword = router.query.query;
  const [courses, setCourses] = useState();
  Search.getInitialProps = ({}) => {
    return {};
  };
  useEffect(() => {
    if (searchKeyword) {
      document.getElementById("search_query").value = searchKeyword;
      axios
        .post(API_URL + "search.php", { keyword: searchKeyword })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            // setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            // setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
            setCourses(response?.data?.data);
            // setPageLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [searchKeyword]);
  return router.isReady ? (
    <>
      <Head>
        <title>Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      <div>
        <section class="py-20 bg-indigo-100">
          <div class="container max-w-6xl mx-auto">
            {courses ? (
              <>
                <h2 class="text-4xl font-bold tracking-tight text-center">
                  Courses related to "{searchKeyword}"
                </h2>
              </>
            ) : (
              ""
            )}
            <div class="p-4 grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
              {courses ? (
                courses.map((course) => {
                  return (
                    <div class="duration-150 hover:scale-105 transform hover:shadow-2xl relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl text-gray-700 hover:text-nirmaan">
                      <h4 class="text-xl font-medium">{course.Title}</h4>
                      <p class="text-base text-center text-gray-500">
                        {course.Description}
                      </p>
                      <Link
                        key={course.ID}
                        href={
                          isStudentLoggedIn() === true
                            ? "/courses/" + course.Slug
                            : "/login?refer=/courses/" + course.Slug
                        }
                      >
                        <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                          <span>Start Course</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="fill-current w-4 h-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </a>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-12 text-center py-5 mx-auto text-2xl">
                  <img
                    src="../../no-courses.svg"
                    className="w-96 mx-auto mb-2"
                  />
                  <p className="my-10 font-bold text-indigo-400">
                    Sorry! No records available for "{searchKeyword}".
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  ) : (
    ""
  );
}
