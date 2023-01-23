import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL, ADMIN_URL } from "../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon, QuestionMarkCircleIcon, ClipboardListIcon } from "@heroicons/react/outline";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { courseLevels } from "../../utils/Data";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { moduleBadges } from "../../utils/Data";

export default function Chapters(props) {
  const router = useRouter();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const id = props.module_id;
  const [courses, setCourses] = useState(props.courses);
  const [pageLoading, setPageLoading] = useState(false);
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  Chapters.getInitialProps = async () => {
    return {};
  };

  useEffect(() => {
    // id
    //   ? axios
    //       .post(API_URL + "courses/get_courses.php", {
    //         module: id,
    //         student: StudentData().ID,
    //       })
    //       .then(function (response) {
    //         if (response?.data?.meta?.error) {
    //           setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
    //         }
    //         if (!response?.data?.meta?.error) {
    //           setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
    //           setCourses(response?.data?.data);
    //           // console.log(response?.data?.data);
    //           setPageLoading(false);
    //         }
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       })
    //   : "";
    setCourses(props.courses);
  }, [props]);
  return pageLoading === false ? (
    <>
      {courses ? (
        courses.map((course, index) => {
          return (
            <div class="relative border border-blue-400 flex justify-start items-center col-span-4 px-5 overflow-hidden bg-white rounded-xl text-gray-700">
              <div className="w-24 h-24 my-4">
                <div class="border relative inline-flex items-center justify-center rounded-full overflow-hidden">
                  <svg class="w-24 h-24 transform -rotate-90">
                    <circle class="text-gray-200" stroke-width="4" stroke="currentColor" fill="transparent" r="46" cx="48" cy="48" />
                    <circle
                      class="text-nirmaan"
                      stroke-width="4"
                      stroke-dasharray={46 * 2 * Math.PI}
                      stroke-dashoffset={(46 * 2 * Math.PI) - ((course.student_progress / course.total_topics) * 100).toFixed(0) / 100 * (46 * 2 * Math.PI)}
                      stroke="currentColor"
                      fill="transparent"
                      r="46"
                      cx="48"
                      cy="48"
                    />
                  </svg>
                  <span class="absolute flex flex-col items-center">
                    <p className="text-nirmaan text-base font-bold">{((course.student_progress / course.total_topics) * 100).toFixed(0)}%</p>
                    <p className="text-gray-600 text-xs">
                      {course.student_progress}/{course.total_topics} Topics
                    </p>
                  </span>
                </div>
                {/* <div className="h-24 w-24 mx-auto bg-white rounded-full shadow border-4 border-nirmaan flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <p className="text-nirmaan text-base font-bold">{((course.student_progress / course.total_topics) * 100).toFixed(0)}%</p>
                    <p className="text-gray-600 text-xs">
                      {course.student_progress}/{course.total_topics} Topics
                    </p>
                  </div>
                </div> */}
              </div>
              <div className="pl-5 my-4">
                <span class="text-xs">Chapter {index + 1}:</span>
                <h4 class="text-md font-medium">{course.Title}</h4>
                <Link href={isStudentLoggedIn() === true ? "/courses/" + course.Slug : "/login?refer=/courses/" + course.Slug}>
                  <a class="hover:text-nirmaan font-bold py-1 rounded inline-flex items-center">
                    <span>{(course.student_progress / course.total_topics) * 100 == 100 ? "Revise Chapter" : (course.student_progress / course.total_topics) * 100 > 0 ? "Continue to Read" : "Start Now"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </Link>
              </div>
              {/* <span class="absolute right-0 top-0 text-xs px-3 py-1 bg-gradient-to-r from-blue-200 to-blue-400 rounded-bl-md font-bold flex justify-start align-middle items-center"><LightningBoltIcon className="w-4 h-4 mr-1"/> 50Pts</span> */}
            </div>
          );
        })
      ) : (
        <div className="col-span-12 text-center py-5 mx-auto">
          <img src="../../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
          No courses available in this module.
        </div>
      )}
      <div class="border border-blue-400 flex justify-start items-center col-span-4 px-5 overflow-hidden bg-white rounded-xl text-gray-700">
        <div className="w-24 h-24 my-4">
          <div className="h-24 w-24 mx-auto flex items-center justify-center">
            {/* <img src={"/images/"+moduleBadges[id]} className="w-24 h-24 mx-auto" /> */}
            <img src="/images/quiz-icon-2.png" className="w-24 h-24 mx-auto" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-20 h-20 bi bi-patch-question text-nirmaan" viewBox="0 0 16 16">
              <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
              <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
              <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
            </svg> */}
            {/* <ClipboardListIcon className="h-14 w-14 text-nirmaan text-base" /> */}
            {/* <div className="flex flex-col items-center">
              <p className="text-nirmaan text-base font-bold">100%</p>
              <p className="text-gray-600 text-xs">
                 Topics
              </p>
            </div> */}
          </div>
        </div>
        <div className="pl-5 my-4">
          <span class="text-xs">Assessment</span>
          <h4 class="text-md font-medium">{props.title}</h4>
          <Link href={isStudentLoggedIn() === true ? "/module-quiz/" + id : "/login?refer=/courses"}>
            <a class="hover:text-nirmaan font-bold py-1 rounded inline-flex items-center">
              <span>Start Assessment</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center bg-indigo-100">
      <span class="relative h-20 w-20">
        <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
      </span>
    </div>
  );
}
