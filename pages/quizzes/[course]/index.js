import Head from "next/head";
import Link from "next/link";
import Header from "../../template/header";
import Footer from "../../template/footer";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
const axios = require("axios");
import { API_URL } from "../../../config/constants";
import { ClockIcon } from "@heroicons/react/outline";
import { isStudentLoggedIn, StudentData } from "../../../utils/Student";
import QuizCompleted from "../../../components/layouts/QuizCompleted";
import Lottie from "react-lottie-player";
import lottieJson1 from "../../../utils/lotty2.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const router = useRouter();
  const courseSlug = router.query.course;
  const [questionData, setQuestionData] = useState();
  const [answersData, setAnswersData] = useState([]);
  const [answer, setAnswer] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionID, setQuestionID] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [quizPoints, setQuizPoints] = useState(0);
  const [quizAttempt, setQuizAttempt] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [questionTime, setQuestionTime] = useState(120);
  const [quizStatus, setQuizStatus] = useState();
  const [quizResult, setQuizResult] = useState();
  const [correctAnswers, setCorrectAnswers] = useState();
  const [course, setCourseID] = useState();
  const [courseTitle, setCourseTitle] = useState();
  const ref = useRef(null);

  Home.getInitialProps = async () => {
    return {};
  };

  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/quizzes/" + courseSlug);
    }
    if (!questionData && courseSlug && isStudentLoggedIn() === true) {
      axios
        .post(API_URL + "quizzes/get_questions.php", {
          course: courseSlug,
          user_id: StudentData().ID,
        })
        .then((response) => {
          setQuestionData(response.data.questionsData);
          setQuizStatus(response.data.quizStatus);
          setQuizResult(response.data.quizResult);
          setCorrectAnswers(response.data.correctAnswers);
          setCourseID(response.data.courseData.ID);
          setCourseTitle(response.data.courseData.Title);
          setQuizAttempt(response.data.quizAttempt);
          setQuizPoints(response.data.increasedPoints);
          setQuestionID(response.data.questionsData[0].ID);
          setPageLoading(false);
          setQuestionTime(120);
          setTimerActive(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (questionData) {
      let interval = null;
      if (timerActive) {
        interval = setInterval(() => {
          if (questionTime < 1) {
            setQuestionTime(0);
            setTimerActive(false);
            handleAnswer(questionID);
          } else {
            setQuestionTime(questionTime - 1);
          }
        }, 1000);
      } else if (!timerActive) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [questionData, courseSlug, timerActive, questionTime, quizPoints]);

  function submitAnswers() {
    setPageLoading(true);
    axios
      .post(API_URL + "quizzes/get_questions.php", {
        user_id: StudentData().ID,
        course: courseSlug,
        answers: answersData,
      })
      .then((response) => {
        setTimerActive(false);
        setQuestionData(response.data.questionsData);
        setQuizStatus(response.data.quizStatus);
        setQuizResult(response.data.quizResult);
        setCorrectAnswers(response.data.correctAnswers);
        setCourseID(response.data.courseData.ID);
        setCourseTitle(response.data.courseData.Title);
        setQuizAttempt(response.data.quizAttempt);
        setQuizPoints(response.data.increasedPoints);
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleAnswer(question_id) {
    setPageLoading(true);
    let answers = answersData;
    let index_id = answers.findIndex((obj) => obj.id == question_id);
    if (typeof answers[index_id] === "undefined") {
      answers.push({
        id: question_id,
        answer: answer,
        subject: course,
        time: questionTime,
      });
    } else {
      answers[index_id] = {
        id: question_id,
        answer: answer,
        subject: course,
        time: questionTime,
      };
    }
    setAnswersData(answers);
    setQuestionIndex(questionIndex + 1);
    setAnswer("");
    setQuestionNumber(questionNumber + 1);
    setQuestionTime(120);
    setTimerActive(true);
    setQuestionID(questionData[questionIndex].ID);
    setPageLoading(false);
    if (questionData.length <= questionNumber) {
      submitAnswers();
    }
  }
  function tryAgain(quiz_course_id) {
    setPageLoading(true);
    axios
      .post(API_URL + "quizzes/retry_quiz.php", {
        course_id: quiz_course_id,
        user_id: StudentData().ID,
      })
      .then((response) => {
        if (!response?.data?.meta?.error) {
          // router.push("/quizzes/" + courseSlug);
          router.reload();
        }
        // setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleSuccessClosed() {
    setQuizPoints(0);
  }

  return pageLoading === false ? (
    <>
      <Head>
        <title>Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />

      <div class="flex justify-between my-5 lg:mt-10 lg:mb-0 lg:mx-48">
        <h1 className="text-xl lg:text-2xl font-bold flex justify-start mx-5 lg:mx-0 lg:my-1">
          {courseTitle}
        </h1>
        <Link href={"/courses/" + courseSlug}>
          <a class="lg:bg-gray-200 lg:hover:bg-nirmaan text-gray-800 font-bold mx-5 my-2 lg:m-1 lg:py-1 lg:px-4 rounded inline-flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span>Back</span>
          </a>
        </Link>
      </div>

      <div className="lg:bg-gray-100 border m-3 lg:m-10 mx-2 lg:mx-48 rounded-lg">
        <div className="p-3 py-6 lg:p-10">
          {questionData && questionData.length > questionIndex && quizStatus ? (
            <div key={questionData[questionIndex]?.ID}>
              <h2 className="font-bold px-3">
                Question {questionNumber} of {questionData.length}:
              </h2>
              <div className="p-3 lg:p-10">
                <div className="text-xl text-gray-700">
                  <span>{questionIndex + 1}.</span>{" "}
                  <span className="capitalize">
                    {questionData[questionIndex]?.Question}
                  </span>
                </div>
                <div className="py-5 px-2 lg:px-8 space-y-3">
                  <div className="option1">
                    <input
                      onClick={() => setAnswer("A")}
                      name={questionData[questionIndex].ID}
                      type="radio"
                      class="form-radio h-5 w-5 text-indigo-600"
                    />
                    <span class="ml-2 text-gray-700  text-lg font-serif capitalize">
                      {questionData[questionIndex].OptionA}
                    </span>
                  </div>
                  <div className="option2">
                    <input
                      onClick={() => setAnswer("B")}
                      name={questionData[questionIndex].ID}
                      type="radio"
                      class="form-radio h-5 w-5 text-indigo-600"
                    />
                    <span class="ml-2 text-gray-700  text-lg font-serif capitalize">
                      {questionData[questionIndex].OptionB}
                    </span>
                  </div>
                  <div className="option3">
                    <input
                      onClick={() => setAnswer("C")}
                      name={questionData[questionIndex].ID}
                      type="radio"
                      class="form-radio h-5 w-5 text-indigo-600"
                    />
                    <span class="ml-2 text-gray-700  text-lg font-serif capitalize">
                      {questionData[questionIndex].OptionC}
                    </span>
                  </div>
                  <div className="option4">
                    <input
                      onClick={() => setAnswer("D")}
                      name={questionData[questionIndex].ID}
                      type="radio"
                      class="form-radio h-5 w-5 text-indigo-600"
                    />
                    <span class="ml-2 text-gray-700  text-lg font-serif capitalize">
                      {questionData[questionIndex].OptionD}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mx-4 lg:mx-0">
                {questionData.length > questionNumber ? (
                  <button
                    onClick={(e) =>
                      handleAnswer(questionData[questionIndex].ID)
                    }
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded inline-flex items-center"
                  >
                    <span>Next </span>
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
                  </button>
                ) : (
                  <button
                    onClick={(e) =>
                      handleAnswer(questionData[questionIndex].ID)
                    }
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded inline-flex items-center"
                  >
                    <span>Submit </span>
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
                  </button>
                )}
                {questionTime ? (
                  <div
                    className={
                      classNames(questionTime < 21 ? "text-red-500 " : "") +
                      "text-xl flex justify-start items-center"
                    }
                  >
                    <ClockIcon className="w-6 h-6 mr-2" />{" "}
                    {questionTime + " Seconds"}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : questionData.length < 1 ? (
            "No questions available in this Quiz"
          ) : (
            ""
          )}
          {!quizStatus && questionData.length > 0 ? (
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
              <div className="flex flex-col lg:flex-row justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-36 w-36 lg:h-16 lg:w-16 text-green-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{" "}
                <div className="flex flex-col justify-center items-center text-xl">
                  <span className="text-center">
                    Quiz successfully completed, Check your answers below!
                  </span>
                  <div className="text-2xl font-bold">
                    Your Score:{" "}
                    <span className="text-nirmaan">
                      {correctAnswers}/{quizResult?.length} (
                      {Math.round(
                        (correctAnswers / quizResult?.length) * 100 * 10
                      ) / 10}
                      %)
                    </span>{" "}
                    <span className="hidden lg:inline">|</span>{" "}
                    <div className="block lg:inline" /> Grade:{" "}
                    <span className="text-nirmaan">
                      {Math.round(
                        (correctAnswers / quizResult?.length) * 100 * 10
                      ) /
                        10 >
                      80
                        ? "A (Excellent)"
                        : Math.round(
                            (correctAnswers / quizResult?.length) * 100 * 10
                          ) /
                            10 >
                          50
                        ? "B (Good)"
                        : Math.round(
                            (correctAnswers / quizResult?.length) * 100 * 10
                          ) /
                            10 >=
                          35
                        ? "C (Average)"
                        : Math.round(
                            (correctAnswers / quizResult?.length) * 100 * 10
                          ) /
                            10 <
                          35
                        ? "D (Poor)"
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 lg:mt-0">
                {Math.round((correctAnswers / quizResult.length) * 100 * 10) /
                  10 >=
                101 ? (
                  <>
                    {/* <Link href={API_URL + "certificates/download.php?course_id=" + course + "&user_id=" + StudentData().ID + "&referer=" + window.location.href}>
                      <a class="bg-nirmaan hover:bg-blue-400 text-nirmaan-lighter font-bold py-2 px-4 rounded inline-flex items-center">
                        <span>Download Certificate</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </a>
                    </Link> */}
                  </>
                ) : quizAttempt < 3 ? (
                  <>
                    <button
                      onClick={() => tryAgain(course)}
                      class="bg-nirmaan hover:bg-blue-400 text-nirmaan-lighter font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      <span>Try Again ({quizAttempt + "/3"})</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="ml-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {!quizStatus && quizPoints > 0 ? (
        <>
          <QuizCompleted
            points={quizPoints}
            open={quizPoints > 0 ? true : false}
            handleClosed={(e) => handleSuccessClosed()}
          />
          <Lottie
            ref={ref}
            background="transparent"
            animationData={lottieJson1}
            speed="1"
            loop={0}
            play
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: "30",
              width: "100%",
              height: "100vh",
            }}
          />
        </>
      ) : (
        <></>
      )}
      {!quizStatus && quizResult && questionData.length > 0 ? (
        <div className="lg:bg-gray-100 m-10 mx-0 lg:mx-48 rounded-lg">
          <div className="p-5 lg:p-10">
            <h2 className="mx-0 lg:mx-10 mt-5 text-xl font-bold">Questions:</h2>
            {quizResult.map((data, serialNo) => (
              <div>
                <div className="p-0 lg:p-10">
                  <div className="text-xl font-serif text-gray-700">
                    {serialNo + 1}. {data?.Question}
                  </div>
                  <div className="py-5 px-0 lg:px-8 space-y-3">
                    <div className="option1 flex justify-between items-center bg-gray-200 p-2">
                      <span class="ml-2 text-gray-700  text-lg font-serif">
                        {data.OptionA}
                      </span>
                      <div className="flex">
                        {data.StudentAnswer === "A" ? (
                          " Your Answer"
                        ) : "A" == data.Answer ? (
                          <>
                            Correct Answer{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-green-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </>
                        ) : (
                          ""
                        )}
                        {data.StudentAnswer === "A" ? (
                          data.StudentAnswer === data.Answer ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-green-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-red-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="option1 flex justify-between items-center bg-gray-200 p-2">
                      <span class="ml-2 text-gray-700  text-lg font-serif">
                        {data.OptionB}
                      </span>
                      <div className="flex">
                        {data.StudentAnswer === "B" ? (
                          " Your Answer"
                        ) : "B" == data.Answer ? (
                          <>
                            Correct Answer{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-green-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </>
                        ) : (
                          ""
                        )}
                        {data.StudentAnswer === "B" ? (
                          data.StudentAnswer === data.Answer ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-green-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-red-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="option1 flex justify-between items-center bg-gray-200 p-2">
                      <span class="ml-2 text-gray-700  text-lg font-serif">
                        {data.OptionC}
                      </span>
                      <div className="flex">
                        {data.StudentAnswer === "C" ? (
                          " Your Answer"
                        ) : "C" == data.Answer ? (
                          <>
                            Correct Answer{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-green-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </>
                        ) : (
                          ""
                        )}
                        {data.StudentAnswer === "C" ? (
                          data.StudentAnswer === data.Answer ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-green-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-red-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="option1 flex justify-between items-center bg-gray-200 p-2">
                      <span class="ml-2 text-gray-700  text-lg font-serif">
                        {data.OptionD}
                      </span>
                      <div className="flex">
                        {data.StudentAnswer === "D" ? (
                          " Your Answer"
                        ) : "D" == data.Answer ? (
                          <>
                            Correct Answer{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-green-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </>
                        ) : (
                          ""
                        )}
                        {data.StudentAnswer === "D" ? (
                          data.StudentAnswer === data.Answer ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-green-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-red-600 h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
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
        </div>
      ) : (
        ""
      )}

      <Footer />
      <div className="hidden cursor-not-allowed bg-gray-600 bg-opacity-25 fixed top-0 left-0 w-screen h-screen z-50 justify-center items-center">
        <span class="animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.5 20.7259C14.6 21.2259 14.2 21.826 13.7 21.926C13.2 22.026 12.6 22.0259 12.1 22.0259C9.5 22.0259 6.9 21.0259 5 19.1259C1.4 15.5259 1.09998 9.72592 4.29998 5.82592L5.70001 7.22595C3.30001 10.3259 3.59999 14.8259 6.39999 17.7259C8.19999 19.5259 10.8 20.426 13.4 19.926C13.9 19.826 14.4 20.2259 14.5 20.7259ZM18.4 16.8259L19.8 18.2259C22.9 14.3259 22.7 8.52593 19 4.92593C16.7 2.62593 13.5 1.62594 10.3 2.12594C9.79998 2.22594 9.4 2.72595 9.5 3.22595C9.6 3.72595 10.1 4.12594 10.6 4.02594C13.1 3.62594 15.7 4.42595 17.6 6.22595C20.5 9.22595 20.7 13.7259 18.4 16.8259Z"
              fill="black"
            />
            <path
              opacity="0.3"
              d="M2 3.62592H7C7.6 3.62592 8 4.02592 8 4.62592V9.62589L2 3.62592ZM16 14.4259V19.4259C16 20.0259 16.4 20.4259 17 20.4259H22L16 14.4259Z"
              fill="black"
            />
          </svg>
        </span>
      </div>
    </>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center bg-indigo-100">
      <span class="relative h-20 w-20">
        <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">
          Loading...
        </span>
      </span>
    </div>
  );
}
