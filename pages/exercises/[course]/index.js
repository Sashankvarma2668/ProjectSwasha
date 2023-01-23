import Head from "next/head";
import Link from "next/link";
import Header from "../../template/header";
import Footer from "../../template/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const axios = require("axios");
import { API_URL } from "../../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import Topiclist from "../../../components/layouts/TopicList";
import { isStudentLoggedIn, StudentData } from "../../../utils/Student";

export default function Home() {
  const router = useRouter();
  const courseSlug = router.query.course;
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [topicsMenu, setTopicsMenu] = useState(false);
  const [questionData, setQuestionData] = useState();
  const [Question, setQuestion] = useState();
  const [Option1, setOption1] = useState();
  const [Option2, setOption2] = useState();
  const [Option3, setOption3] = useState();
  const [Option4, setOption4] = useState();
  const [answer, setAnswer] = useState();
  const [quizStatus, setQuizStatus] = useState();
  const [quizTotal, setQuizTotal] = useState();
  const [quizResult, setQuizResult] = useState();
  const [correctAnswers, setCorrectAnswers] = useState();
  const [course, setCourseID] = useState();
  const [courseTitle, setCourseTitle] = useState();
  const [questionNumber, setQuestionNumber] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  Home.getInitialProps = async () => {
    return {};
  };
  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/execise/" + courseSlug);
    }
    if (!questionData && courseSlug) {
      axios
        .post(API_URL + "exercises/get_question.php", { course_slug: courseSlug, user_id: StudentData().ID })
        .then((response) => {
          setQuestionData(response.data.data);
          setQuizStatus(response.data.quizStatus);
          setQuizTotal(response.data.total);
          setQuizResult(response.data.quizResult);
          setCorrectAnswers(response.data.correctAnswers);
          setCourseID(response.data.courseID);
          setCourseTitle(response.data.courseTitle);
          setQuestionNumber(response.data.questionNumber);
          setPageLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // var canvas1Settings = {
    //   target: "canvas1",
    //   max: 100,
    //   props: ["square", "triangle", "line"],
    //   colors: [[80, 80, 80]],
    //   clock: 3,
    // };
    // var canvas1 = new ConfettiGenerator(canvas1Settings);
    // canvas1.render();
  }, [questionData, courseSlug]);

  function submitAnswer(questionID) {
    let answer_input = document.getElementById("answer").value;
    setPageLoading(true);
    axios
      .post(API_URL + "exercises/get_question.php", { question_id: questionID, answer: answer_input, user_id: StudentData().ID, course_slug: courseSlug })
      .then((response) => {
        setQuestionData(response.data.data);
        setQuizStatus(response.data.quizStatus);
        setQuizTotal(response.data.total);
        setQuizResult(response.data.quizResult);
        setCorrectAnswers(response.data.correctAnswers);
        setCourseID(response.data.courseID);
        setCourseTitle(response.data.courseTitle);
        setQuestionNumber(response.data.questionNumber);
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function getTextWidth(text, font) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    context.font = font || getComputedStyle(document.body).font;

    return context.measureText(text).width;
  }
  const escapeHTML = (str) =>
    str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        }[tag])
    );
  function replaceBlank(textSource, textToReplace, objectToReplace = "[[blank]]") {
    return textSource.replace(textToReplace, objectToReplace);
  }

  function ReplaceWithObject(textSource, textToReplace) {
    var text = replaceBlank(textSource, textToReplace);
    var html_text = escapeHTML(text);
    return { __html: html_text.replace("[[blank]]", "<input type='text' size='" + textToReplace.length + "' maxlength='" + textToReplace.length + "' id='answer' class='h-6 px-1 border-0' >") };
  }

  function tryAgain(course) {}
  return pageLoading === false ? (
    <>
      <Head>
        <title>Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/* <script src="https://cdn.jsdelivr.net/npm/confetti-js@0.0.18/dist/index.min.js"></script> */}
      </Head>
      <Header />

      <h1 className="text-4xl font-bold flex justify-center mt-10">Exercise: {courseTitle}</h1>

      <div className="bg-gray-100 m-10 mx-36 rounded-lg">
        <div className="p-10">
          {questionData && quizStatus ? (
            <div key={questionData?.ID}>
              <h2>
                Exercise {questionNumber} of {quizTotal}:
              </h2>
              <div className="p-10">
                <div className="text-xl font-serif text-gray-700">
                  {/* contenteditable="true" onkeypress="return (this.innerText.length <= 6)"> */}
                  {questionNumber}. {questionData?.QTitle}
                </div>
                <div className="py-5 px-8 space-y-3">
                  <div className="option1">
                    <span class="ml-2 text-gray-700 text-lg font-serif" dangerouslySetInnerHTML={ReplaceWithObject(questionData.Question, questionData.Answer)}></span>
                  </div>
                </div>
              </div>
              <button onClick={(e) => submitAnswer(questionData.ID)} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <span>Submit Answer</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ) : quizTotal < 1 ? (
            "No questions available in this Exercise"
          ) : (
            ""
          )}
          {!quizStatus && quizTotal > 0 ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>{" "}
                <div className="flex-col items-center text-xl">
                  Quiz successfully completed, Check your answers below!
                  <div className="text-2xl font-bold">
                    Your Score:{" "}
                    <span className="text-nirmaan">
                      {correctAnswers}/{quizTotal} ({Math.round((correctAnswers / quizTotal) * 100 * 10) / 10}%)
                    </span>{" "}
                    | Grade:{" "}
                    <span className="text-nirmaan">
                      {Math.round((correctAnswers / quizTotal) * 100 * 10) / 10 > 80
                        ? "A (Excellent)"
                        : Math.round((correctAnswers / quizTotal) * 100 * 10) / 10 > 50
                        ? "B (Good)"
                        : Math.round((correctAnswers / quizTotal) * 100 * 10) / 10 >= 35
                        ? "C (Average)"
                        : Math.round((correctAnswers / quizTotal) * 100 * 10) / 10 < 35
                        ? "D (Poor)"
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                {Math.round((correctAnswers / quizTotal) * 100 * 10) / 10 >= 70 ? (
                  <Link href={API_URL + "certificates/download.php?course_id=" + course + "&user_id=" + StudentData().ID + "&referer=" + window.location.href}>
                    <a class="bg-nirmaan hover:bg-blue-400 text-nirmaan-lighter font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Download Certificate</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </a>
                  </Link>
                ) : (
                  <>
                    {/* // <Link onClick={() => tryAgain(course)}>
                  //   <a class="bg-nirmaan hover:bg-blue-400 text-nirmaan-lighter font-bold py-2 px-4 rounded inline-flex items-center">
                  //     <span>Try Again</span>
                  //     <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  //     </svg>
                  //   </a>
                  // </Link> */}
                  </>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {!quizStatus && quizResult && quizTotal > 0 ? (
        <div className="bg-gray-100 m-10 mx-36 rounded-lg">
          <div className="p-10">
            <h2 className="mx-10 mt-5 text-xl font-bold">Questions:</h2>
            {quizResult.map((data, serialNo) => (
              <div>
                <div className="p-10">
                  <div className="text-xl font-serif text-gray-700">
                    {serialNo + 1}. {data?.Question}
                  </div>
                  <div className="py-5 px-8 space-y-3">
                    <div className="option1 flex justify-between items-center bg-gray-200 p-2">
                      <span class="ml-2 text-gray-700  text-lg font-serif">{data.OptionA}</span>
                      <div className="flex">
                        {data.StudentAnswer === "A" ? (
                          " Your Answer"
                        ) : "A" == data.Answer ? (
                          <>
                            Correct Answer{" "}
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </>
                        ) : (
                          ""
                        )}
                        {data.StudentAnswer === "A" ? (
                          data.StudentAnswer === data.Answer ? (
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-red-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="option1 flex justify-between items-center bg-gray-200 p-2">
                      <span class="ml-2 text-gray-700  text-lg font-serif">{data.OptionB}</span>
                      <div className="flex">
                        {data.StudentAnswer === "B" ? (
                          " Your Answer"
                        ) : "B" == data.Answer ? (
                          <>
                            Correct Answer{" "}
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </>
                        ) : (
                          ""
                        )}
                        {data.StudentAnswer === "B" ? (
                          data.StudentAnswer === data.Answer ? (
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-red-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="option1 flex justify-between items-center bg-gray-200 p-2">
                      <span class="ml-2 text-gray-700  text-lg font-serif">{data.OptionC}</span>
                      <div className="flex">
                        {data.StudentAnswer === "C" ? (
                          " Your Answer"
                        ) : "C" == data.Answer ? (
                          <>
                            Correct Answer{" "}
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </>
                        ) : (
                          ""
                        )}
                        {data.StudentAnswer === "C" ? (
                          data.StudentAnswer === data.Answer ? (
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-red-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="option1 flex justify-between items-center bg-gray-200 p-2">
                      <span class="ml-2 text-gray-700  text-lg font-serif">{data.OptionD}</span>
                      <div className="flex">
                        {data.StudentAnswer === "D" ? (
                          " Your Answer"
                        ) : "D" == data.Answer ? (
                          <>
                            Correct Answer{" "}
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </>
                        ) : (
                          ""
                        )}
                        {data.StudentAnswer === "D" ? (
                          data.StudentAnswer === data.Answer ? (
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-red-600 h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <canvas id="canvas"></canvas> */}
        </div>
      ) : (
        ""
      )}
      <div class="flex justify-center mb-10">
        <Link href="/quizzes">
          <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Back to Exercises</span>
          </a>
        </Link>
      </div>
      <Footer />
      <div className="hidden cursor-not-allowed bg-gray-600 bg-opacity-25 fixed top-0 left-0 w-screen h-screen z-50 justify-center items-center">
        <span class="animate-spin">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.5 20.7259C14.6 21.2259 14.2 21.826 13.7 21.926C13.2 22.026 12.6 22.0259 12.1 22.0259C9.5 22.0259 6.9 21.0259 5 19.1259C1.4 15.5259 1.09998 9.72592 4.29998 5.82592L5.70001 7.22595C3.30001 10.3259 3.59999 14.8259 6.39999 17.7259C8.19999 19.5259 10.8 20.426 13.4 19.926C13.9 19.826 14.4 20.2259 14.5 20.7259ZM18.4 16.8259L19.8 18.2259C22.9 14.3259 22.7 8.52593 19 4.92593C16.7 2.62593 13.5 1.62594 10.3 2.12594C9.79998 2.22594 9.4 2.72595 9.5 3.22595C9.6 3.72595 10.1 4.12594 10.6 4.02594C13.1 3.62594 15.7 4.42595 17.6 6.22595C20.5 9.22595 20.7 13.7259 18.4 16.8259Z"
              fill="black"
            />
            <path opacity="0.3" d="M2 3.62592H7C7.6 3.62592 8 4.02592 8 4.62592V9.62589L2 3.62592ZM16 14.4259V19.4259C16 20.0259 16.4 20.4259 17 20.4259H22L16 14.4259Z" fill="black" />
          </svg>
        </span>
      </div>
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
