import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { isStudentLoggedIn, Logout, StudentData } from "../../utils/Student";
import {
  UserCircleIcon,
  UserIcon,
  LightningBoltIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
const axios = require("axios");
import Cookies from "js-cookie";
import { API_URL } from "../../config/constants";
import { data } from "autoprefixer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [userFullName, setUserFullName] = useState(StudentData().FullName);

  const [userimage, setUserImage] = useState(StudentData().Image);

  const [loggedOut, setLoggedOut] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] = useState(isStudentLoggedIn());
  const [collectionMenuOpen, setCollectionMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  const [isShowing, setIsShowing] = useState(false);

  const [logintoken, setLoginToken] = useState(Cookies.get("login_token"));
  const [savedcode, setSavedCode] = useState();
  const [cartcount, setCartCount] = useState();
  const [wishlistcount, setWishListCount] = useState();
  const [studentid, setStudentId] = useState(StudentData().ID);

  useEffect(() => {
    axios
      .post(API_URL + "/cart/display_cart.php", {
        s_id: studentid,
      })

      .then(function (response) {
        // console.log(response?.data?.data);
        setCartCount(response?.data?.total);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post(API_URL + "/wishlist/display_wishlist.php", {
        s_id: studentid,
      })

      .then(function (response) {
        // console.log(response?.data?.data);
        setWishListCount(response?.data?.total);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (loggedOut === true) {
      router.reload(window.location.pathname);
    }
    if (isStudentLoggedIn() === true && StudentData().ID) {
      axios
        .post(API_URL + "get_points.php", {
          student: StudentData().ID,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
          }
          if (!response?.data?.meta?.error) {
            setPoints(response?.data?.points > 0 ? response?.data?.points : 0);
          }
          setPageLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    axios
      .post(API_URL + "savedstdcode.php", {
        login_token: logintoken,
      })
      .then(function (response) {
        console.log(response.data?.data);
        setSavedCode(response.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [loggedOut]);

  function logOut() {
    Logout();
    setLoggedOut(true);
  }
  return (
    <div className="">
      <main>
        <nav className="bg-white block w-full z-30 border-b border-gray-200">
          <div className=" mx-auto px-3 md:px-6 lg:px-2 xl:px-16">
            <div className="relative flex items-center justify-between h-24">
              {/* mobile header start */}

              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                {/* Profile dropdown  */}
                {isStudentLoggedIn() === true ? (
                  <div
                    className="ml-3 relative z-30"
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  >
                    <div>
                      <button
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                        className="flex items-center transition duration-300 ease-in-out bg-gray-50 hover:text-nirmaan text-gray-700 px-2 py-2 rounded-md text-base font-medium ml-5"
                      >
                        <img
                          src={
                            userimage ? API_URL + userimage : "/usericon.png"
                          }
                          alt="User Avatar"
                          class="inline-block w-10 h-10 rounded-full mr-2"
                        />
                        {/* <UserCircleIcon className="w-7 h-7 inline-block mr-2" /> */}
                      </button>
                    </div>
                    <Transition
                      show={accountMenuOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {(ref) => (
                        <div
                          ref={ref}
                          className="absolute origin-top-right right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <Link href="/account/profile">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              View Profile
                            </a>
                          </Link>
                          <Link href="/account/edit-profile">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Edit Profile
                            </a>
                          </Link>
                          <Link href="/account/change-password">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Change Password
                            </a>
                          </Link>
                          {/* <Link href="/account/enrolled-courses">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Enrolled Courses
                            </a>
                          </Link> */}
                          {/* <Link href="/account/webinars">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Webinars
                            </a>
                          </Link> */}
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            role="menuitem"
                            href="/OrderSummary"
                          >
                            Recent Order
                          </a>

                          <a
                            onClick={() => logOut()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            role="menuitem"
                          >
                            Sign out
                          </a>
                        </div>
                      )}
                    </Transition>
                  </div>
                ) : (
                  ""
                )}
                {isStudentLoggedIn() !== true ? (
                  <Link href="/login">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      aria-controls="mobile-menu"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Sign In</span>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-blue-700 p-2 text-base"
                      >
                        Sign In
                      </a>
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setMainMenuOpen(!mainMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <a>
                      <img
                        className="block lg:hidden h-6 w-auto"
                        src="/Swasha.gif"
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-10 w-auto"
                        src="/Swasha.gif"
                        alt="Workflow"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              {/* mobile header end */}
              {/* desktop header start */}
              <div className="absolute inset-y-0 right-0 hidden lg:flex items-center justify-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden lg:flex ml-10">
                  <Link href="/">
                    <a
                      className={
                        classNames(
                          props.activePage === "Home"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan px-3 py-2 rounded-md text-base font-medium ml-2"
                      }
                    >
                      {" "}
                      <p className="font-bold">Home</p>
                    </a>
                  </Link>
                  <Link href="/ProductsPage" as="/ProductsPage">
                    <a
                      className={
                        classNames(
                          props.activePage === "Courses"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan px-3 py-2 rounded-md text-base font-medium ml-2"
                      }
                    >
                      <p className="font-bold">Products</p>
                    </a>
                  </Link>
                  {/* <Link href="/Stories">
                    <a className="focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan text-gray-700 px-3 py-2 rounded-md text-base font-medium ml-2">
                    <p className="font-bold">Stories</p>
                    </a>
                  </Link> */}

                  {/* <div class="relative inline-block text-left mt-1">
                    <div>
                      <button
                        onClick={() => setIsShowing((isShowing) => !isShowing)}
                        type="button"
                        class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        Code Editors
                        <svg
                          class="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <Transition
                      show={isShowing}
                      enter="transition-opacity duration-75"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div
                        class="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                      >
                        <div class="py-1 hover:bg-gray-100" role="none">
                          <Link href="/html-compiler.html">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-0"
                            >
                              {" "}
                              HTML Editor
                            </a>
                          </Link>
                        </div>
                        <div class="py-1 hover:bg-gray-100" role="none">
                          <Link href="/sqleditor.html">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-1"
                            >
                              {" "}
                              SQL Editor
                            </a>
                          </Link>
                        </div>

            
                      </div>
                    </Transition>
                  </div> */}

                  <Link href="/ProductsPageBulk">
                    <a className="focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan text-gray-700 px-3 py-2 rounded-md text-base font-medium ml-2">
                      <p className="font-bold">Bulk Ordering</p>
                    </a>
                  </Link>

                  <Link href="/WishList">
                    <a className="focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan text-gray-700 pl-3 pr-0 py-2 rounded-md text-base font-medium ml-2">
                      <svg
                        width="23"
                        height="21"
                        viewBox="0 0 23 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4998 20.2059L2.70115 10.925C1.92859 10.1441 1.41864 9.13717 1.24355 8.04689C1.06847 6.95661 1.23713 5.83827 1.72563 4.8503V4.8503C2.09464 4.10439 2.63366 3.45781 3.29828 2.96383C3.9629 2.46985 4.73408 2.14261 5.5483 2.00908C6.36252 1.87555 7.19647 1.93955 7.98144 2.1958C8.7664 2.45205 9.47991 2.89322 10.0632 3.48296L11.4998 4.93554L12.9364 3.48296C13.5197 2.89322 14.2332 2.45205 15.0182 2.1958C15.8031 1.93955 16.6371 1.87555 17.4513 2.00908C18.2655 2.14261 19.0367 2.46985 19.7013 2.96383C20.3659 3.45781 20.905 4.10439 21.274 4.8503V4.8503C21.7625 5.83827 21.9311 6.95661 21.756 8.04689C21.581 9.13717 21.071 10.1441 20.2984 10.925L11.4998 20.2059Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </Link>

                  {wishlistcount > 0 ? (
                    <div className="inline-block w-5 h-5 text-white text-sm text-center bg-red-700 rounded-full font-semibold">
                      {wishlistcount}
                    </div>
                  ) : (
                    ""
                  )}

                  <Link href="/Cart">
                    <a className="focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan text-gray-700 pl-3 pr-0 py-2 rounded-md text-base font-medium ml-2">
                      <svg
                        width="21"
                        height="23"
                        viewBox="0 0 21 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.1159 8.72414H2.50427C1.99709 8.72414 1.58594 9.12657 1.58594 9.62299V21.308C1.58594 21.8045 1.99709 22.2069 2.50427 22.2069H18.1159C18.6231 22.2069 19.0342 21.8045 19.0342 21.308V9.62299C19.0342 9.12657 18.6231 8.72414 18.1159 8.72414Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M6.34473 6.34483V4.9569C6.34473 3.85259 6.76252 2.79352 7.5062 2.01265C8.24988 1.23179 9.25852 0.793106 10.3102 0.793106C11.362 0.793106 12.3706 1.23179 13.1143 2.01265C13.858 2.79352 14.2758 3.85259 14.2758 4.9569V6.34483"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </Link>
                  {cartcount > 0 ? (
                    <div className="inline-block w-5 h-5 text-white text-sm text-center bg-red-700 rounded-full font-semibold">
                      {cartcount}
                    </div>
                  ) : (
                    ""
                  )}

                  {/* {isStudentLoggedIn() === true ? (
                    <Link href="/account/credits">
                      <a
                        className="text-lg font-bold text-yellow-400 border-2 border-yellow-400 hover:text-yellow-500 hover:border-yellow-500 rounded-full px-3 py-1 ml-3 flex justify-start align-middle items-center"
                        title="Your Learning Credits"
                      >
                        <LightningBoltIcon className="w-5 h-5" /> {points}{" "}
                        Credits
                      </a>
                    </Link>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 hidden lg:flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isStudentLoggedIn() === true ? (
                  ""
                ) : (
                  <Link href="/login">
                    <a className="flex items-center transition duration-300 ease-in-out text-nirmaan hover:text-nirmaan-dark px-5 py-2 rounded-md text-base font-medium ml-5">
                      Sign In
                    </a>
                  </Link>
                )}
                {isStudentLoggedIn() === true ? (
                  ""
                ) : (
                  <Link href="/register">
                    <a className="flex items-center transition duration-300 ease-in-out bg-nirmaan text-blue-50 hover:bg-nirmaan-dark pl-4 pr-5 py-2 rounded-md text-base font-medium ml-3">
                      Sign Up
                    </a>
                  </Link>
                )}
                {/* Profile dropdown  */}
                {isStudentLoggedIn() === true ? (
                  <div
                    className="ml-3 relative z-30"
                    onMouseEnter={() => setAccountMenuOpen(!accountMenuOpen)}
                    onMouseLeave={() => setAccountMenuOpen(!accountMenuOpen)}
                  >
                    <div>
                      <button
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                        className="flex items-center transition duration-300 ease-in-out hover:text-nirmaan text-gray-700 px-5 py-5 rounded-md text-base font-medium ml-5"
                      >
                        <img
                          src={
                            userimage ? API_URL + userimage : "/usericon.png"
                          }
                          alt="User Avatar"
                          class="inline-block w-7 h-7 rounded-full mr-2"
                        />{" "}
                        <span>{userFullName}</span>
                      </button>
                    </div>
                    <Transition
                      show={accountMenuOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {(ref) => (
                        <div
                          ref={ref}
                          className="absolute origin-top-right right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <div className="-mt-1 px-4 py-2 border-b bg-cover flex-row items-center justify-center align-middle">
                            <p className="font-bold">Username :</p>
                            <div className="text-md text-blue-600 mt-2">
                              {userFullName}
                            </div>
                            {/* <div className="mb-2 text-md font-bold text-black flex justify-start align-middle items-center">
                              #{StudentData().UniqueID}
                            </div> */}
                          </div>

                          <Link href="/account/profile">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              View Profile
                            </a>
                          </Link>
                          <Link href="/account/edit-profile">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Edit Profile
                            </a>
                          </Link>

                          <Link href="/account/change-password">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Change Password
                            </a>
                          </Link>

                          {/* <Link href="/account/webinars">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Webinars
                            </a>
                          </Link> */}

                          {/* <Link href="/savedcode">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              My Programs
                            </a>
                          </Link> */}

                          <a
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            role="menuitem"
                            href="/OrderSummary"
                          >
                            Recent Order
                          </a>
                          <a
                            onClick={() => logOut()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            role="menuitem"
                          >
                            Sign out
                          </a>
                        </div>
                      )}
                    </Transition>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <Transition
            show={mainMenuOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div
                ref={ref}
                className={`transition ease-in-out duration-200`}
                id="mobile-menu"
              >
                <div className="relative rounded-md shadow-sm m-3">
                  <input
                    type="text"
                    name="query"
                    id="search_query"
                    className="focus:ring-nirmaan focus:border-nirmaan block w-full pl-5 pr-10 text-md sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter keyword.."
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link href="/">
                    <a
                      className={
                        classNames(
                          props.activePage === "Home"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      }
                      aria-current="page"
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/ProductsPage" as="/ProductsPage">
                    <a
                      className={
                        classNames(
                          props.activePage === "ProductsPage"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      }
                      aria-current="page"
                    >
                      Products
                    </a>
                  </Link>
                  {/* <Link href="/Stories">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      Stories
                    </a>
                  </Link> */}

                  <Link href="/ProductsPageBulk">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      Bulk Ordering
                    </a>
                  </Link>
                  <Link href="/Cart">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      Cart
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      Wishlist
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </main>
    </div>
  );
}
