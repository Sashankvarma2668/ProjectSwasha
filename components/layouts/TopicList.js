import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowCircleRightIcon, CheckCircleIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Topiclist(props) {
  const [showList, setShowList] = useState();
  const [topics, setTopics] = useState();
  const [topicSlug, setTopicSlug] = useState();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setShowList(props.show);
    setTopicSlug(props.slug);
    setTopics(props.topics);
    if (props) {
      setPageLoading(false);
    }
  }, [props]);

  if (pageLoading === true) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-indigo-100">
        <span class="relative h-20 w-20">
          <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
        </span>
      </div>
    );
  } else {
    return (
      <>
        <div
          id="topicslist"
          class={classNames(
            showList ? ` translate-x-0 ` : ` -translate-x-full ` + ` bg-white shadow lg:w-60 xl:w-96 w-64 overflow-y-scroll h-screen absolute inset-y-0 left-0  transform -translate-x-full lg:translate-x-0 lg:relative transition duration-150 ease-in-out `
          )}>
          <div className="hidden lg:flex flex-1 items-stretch justify-start">
            <div className="flex-shrink-0 flex items-center py-5 pl-5">
              <Link href="/">
                <a>
                  <img className="block lg:hidden h-8 w-auto" src="/logo.png" alt="Workflow" />
                  <img className="hidden lg:block h-12 w-auto" src="/logo.png" alt="Workflow" />
                </a>
              </Link>
              {/* <Link href="h">
                <a class="ml-28 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Back to Home</span>
                </a>
              </Link> */}
            </div>
          </div>
          <ul class="divide-y divide-gray-100">
            <li class="hidden lg:block p-3 bg-nirmaan  text-center font-bold font-serif text-white">
              <div className="flex items-center justify-between">
                <div>{props.courseData.Title}</div>
                {/* <div className="lg:hidden" onClick={(e) => setShowList(false)}>
                  <svg className="w-6 h-6" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path>
                  </svg>
                </div> */}
              </div>
            </li>
            {props.topics &&
              props.topics.map((topic, key) => (
                <div>
                  <Link href={"/courses/" + props.courseData.Slug + "/" + topic.Slug}>
                    <li class={classNames((topic.Slug === topicSlug ? `bg-gray-200 ` : ``) + ` p-3 hover:bg-gray-200 text-left cursor-pointer flex justify-between items-center text-black`)}>
                      {key + 1 + ". " + topic.Title} {props.readingTopics.includes(topic.ID) ? (<CheckCircleIcon className="w-5 h-5 text-green-400"/>) : (<ArrowCircleRightIcon className="w-5 h-5 text-gray-400" />)}
                    </li>
                  </Link>
                </div>
              ))}
          </ul>
          <div className="bg-blue-50 mt-3">
            <p className="p-5 text-black">To check your knowledge on {props.courseData.Title}: </p>
            <Link key={props.courseData.ID} href={"/quizzes/" + props.courseData.Slug}>
              <a class="mb-5 mx-5 bg-nirmaan hover:bg-blue-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <span>Start Exercise</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
