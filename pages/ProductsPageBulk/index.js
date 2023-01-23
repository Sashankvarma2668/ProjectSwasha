import React, { useState } from "react";
import Link from "next/dist/client/link";
import Header from "../template/header";
import Footer from "../template/footer";
import ProductInProductsPage from "../../components/ProductInProductsPageBulk";
import { useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState();

  const [search, setSearch] = useState();

  useEffect(() => {
    axios
      .post(API_URL + "/products/get_products.php", {
        search: search,
      })
      .then(function (response) {
        console.log(response);
        setData(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [search]);

  return (
    <>
      <Header />

      <form className="md:flex  mt-5 md:px-10 px-2 items-center">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            id="voice-search"
            className="w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here for our products"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex md:flex hidden items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            className="mr-2 -ml-1 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          Search
        </button>
      </form>
      <div className="bg-white">
        <section>
          <div className="pt-5 pb-24 2xl:pb-44">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap py-5 lg:hidden mb-14 xl:mb-16 border-b border-black border-opacity-10">
                <div className="w-full sm:w-1/3 lg:w-1/5 py-2 sm:px-3">
                  <a
                    className="flex items-center py-5 px-8 xl:px-12 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-4xl"
                    href="#"
                  >
                    <span>Product</span>
                    <svg
                      className="relative top-px ml-6"
                      width="8"
                      height="5"
                      viewbox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.97291 0.193232C7.20854 -0.0644107 7.58938 -0.0644107 7.82328 0.193232C8.05804 0.450875 8.05978 0.867141 7.82328 1.12478L4.42529 4.80677C4.19053 5.06441 3.81056 5.06441 3.57406 4.80677L0.176073 1.12478C-0.0586909 0.868102 -0.0586909 0.450875 0.176073 0.193232C0.411706 -0.0644107 0.792544 -0.0644107 1.02644 0.193232L4.00098 3.21284L6.97291 0.193232Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className="w-full sm:w-1/3 lg:w-1/5 py-2 sm:px-3">
                  <a
                    className="flex items-center py-5 px-8 xl:px-12 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-4xl"
                    href="#"
                  >
                    <span>Best seller</span>
                    <svg
                      className="relative top-px ml-6"
                      width="8"
                      height="5"
                      viewbox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.97291 0.193232C7.20854 -0.0644107 7.58938 -0.0644107 7.82328 0.193232C8.05804 0.450875 8.05978 0.867141 7.82328 1.12478L4.42529 4.80677C4.19053 5.06441 3.81056 5.06441 3.57406 4.80677L0.176073 1.12478C-0.0586909 0.868102 -0.0586909 0.450875 0.176073 0.193232C0.411706 -0.0644107 0.792544 -0.0644107 1.02644 0.193232L4.00098 3.21284L6.97291 0.193232Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className="w-full sm:w-1/3 lg:w-1/5 py-2 sm:px-3">
                  <a
                    className="flex items-center py-5 px-8 xl:px-12 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-4xl"
                    href="#"
                  >
                    <span>Sale</span>
                    <svg
                      className="relative top-px ml-6"
                      width="8"
                      height="5"
                      viewbox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.97291 0.193232C7.20854 -0.0644107 7.58938 -0.0644107 7.82328 0.193232C8.05804 0.450875 8.05978 0.867141 7.82328 1.12478L4.42529 4.80677C4.19053 5.06441 3.81056 5.06441 3.57406 4.80677L0.176073 1.12478C-0.0586909 0.868102 -0.0586909 0.450875 0.176073 0.193232C0.411706 -0.0644107 0.792544 -0.0644107 1.02644 0.193232L4.00098 3.21284L6.97291 0.193232Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className="w-full sm:w-1/3 lg:w-1/5 py-2 sm:px-3">
                  <a
                    className="flex items-center py-5 px-8 xl:px-12 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-4xl"
                    href="#"
                  >
                    <span>Materials</span>
                    <svg
                      className="relative top-px ml-6"
                      width="8"
                      height="5"
                      viewbox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.97291 0.193232C7.20854 -0.0644107 7.58938 -0.0644107 7.82328 0.193232C8.05804 0.450875 8.05978 0.867141 7.82328 1.12478L4.42529 4.80677C4.19053 5.06441 3.81056 5.06441 3.57406 4.80677L0.176073 1.12478C-0.0586909 0.868102 -0.0586909 0.450875 0.176073 0.193232C0.411706 -0.0644107 0.792544 -0.0644107 1.02644 0.193232L4.00098 3.21284L6.97291 0.193232Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className="w-full sm:w-1/3 lg:w-1/5 py-2 sm:px-3">
                  <a
                    className="flex items-center py-5 px-8 xl:px-12 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-4xl"
                    href="#"
                  >
                    <span>Delivery</span>
                    <svg
                      className="relative top-px ml-6"
                      width="8"
                      height="5"
                      viewbox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.97291 0.193232C7.20854 -0.0644107 7.58938 -0.0644107 7.82328 0.193232C8.05804 0.450875 8.05978 0.867141 7.82328 1.12478L4.42529 4.80677C4.19053 5.06441 3.81056 5.06441 3.57406 4.80677L0.176073 1.12478C-0.0586909 0.868102 -0.0586909 0.450875 0.176073 0.193232C0.411706 -0.0644107 0.792544 -0.0644107 1.02644 0.193232L4.00098 3.21284L6.97291 0.193232Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="md:flex-1 sm:flex sm:flex-wrap mb-10 xl:mb-24 rounded-3xl ">
                {/* <div className="px-4 py-4 border-solid border-2 border-gray-100 bg-gray-100 rounded-3xl lg:block hidden w-full md:w-1/3 lg:w-4/12 xl:w-3/12 mb-10 md:mb-0">
                  <div className="p-10 xl:p-4 xl:pt-10 mb-6 bg-white rounded-3xl">
                    <h2 className="mb-8 text-3xl leading-9 font-heading font-medium">Category</h2>
                    <a className="block mb-5 font-heading font-medium" href="#">Best seller</a><a className="block mb-5 font-heading font-medium" href="#">New in</a>
                    <a className="flex items-center justify-between mb-5 font-heading font-medium" href="#">
                      <span>Handbags</span>
                      <span className="text-sm text-gray-300">267</span>
                    </a>
                    <a className="flex items-center justify-between mb-5 font-heading font-medium" href="#">
                      <span>Earrings</span>
                      <span className="text-sm text-gray-300">100</span>
                    </a>
                    <a className="flex items-center justify-between mb-9 font-heading font-medium" href="#">
                      <span>Candles</span>
                      <span className="text-sm text-gray-300">240</span>
                    </a>
                    <a className="flex items-center pb-1 text-xl text-green-500 hover:text-green-600 font-bold tracking-tight max-w-max border-b border-green-600 hover:border-green-700" href="#">
                      <span className="mr-5">See all</span>
                      <svg width="14" height="17" viewbox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 11.3L6.5 15.5L6.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M1.5 11.5L6.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </a>
                  </div>
                  <div className="p-10 pb-8 xl:p-4 xl:pb-8 xl:pt-10 mb-6 bg-white rounded-3xl">
                    <h2 className="mb-6 text-3xl leading-9 font-heading font-medium">Colors</h2>
                    <div className="flex flex-wrap max-w-xs">
                      <div className="p-1 m-2 max-w-max border border-gray-300 rounded-full"><a className="block w-5 h-5 bg-blue-400 rounded-full" href="#"></a></div>
                      <div className="p-1 m-2 max-w-max border border-opacity-0 rounded-full"><a className="block w-5 h-5 bg-orange-400 rounded-full" href="#"></a></div>
                      <div className="p-1 m-2 max-w-max border border-opacity-0 rounded-full"><a className="block w-5 h-5 bg-black rounded-full" href="#"></a></div>
                      <div className="p-1 m-2 max-w-max border border-opacity-0 rounded-full"><a className="block w-5 h-5 bg-red-400 rounded-full" href="#"></a></div>
                      <div className="p-1 m-2 max-w-max border border-opacity-0 rounded-full"><a className="block w-5 h-5 bg-green-400 rounded-full" href="#"></a></div>
                      <div className="p-1 m-2 max-w-max border border-opacity-0 rounded-full"><a className="block w-5 h-5 bg-purple-400 rounded-full" href="#"></a></div>
                      <div className="p-1 m-2 max-w-max border border-opacity-0 rounded-full"><a className="block w-5 h-5 bg-yellow-400 rounded-full" href="#"></a></div>
                      <div className="p-1 m-2 max-w-max border border-opacity-0 rounded-full"><a className="block w-5 h-5 bg-white rounded-full" href="#"></a></div>
                    </div>
                  </div>
                  <div className="p-10 xl:p-4 xl:pt-10 mb-6 bg-white rounded-3xl">
                    <h2 className="mb-10 text-3xl leading-9 font-heading font-medium">Price</h2>
                    <div className="relative mb-16 h-1 bg-blueGray-100">
                      <div className="relative left-0">
                        <a className="absolute -top-2 left-0 z-10 transform -translate-y-px w-6 h-6 bg-white rounded-full shadow-5xl" href="#"></a>
                        <div className="absolute -left-3 top-10 max-w-max">
                          <svg className="absolute left-1/2 transform -translate-x-1/2 -top-2 z-10" width="14" height="11" viewbox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.41519 1.05873C6.21579 0.0187157 7.78421 0.0187151 8.58481 1.05873L13.1815 7.03001C14.1939 8.34515 13.2564 10.25 11.5967 10.25H2.40331C0.743631 10.25 -0.1939 8.34515 0.818494 7.03001L5.41519 1.05873Z" fill="#edf1f8"></path>
                          </svg>
                          <div className="flex items-center justify-center px-3 py-1 font-heading font-medium bg-blueGray-100 rounded-lg">Rs. 100</div>
                        </div>
                      </div>
                      <div className="relative left-24 transform -translate-y-px max-w-max">
                        <a className="absolute -top-2 left-0 transform -translate-y-px w-6 h-6 bg-blue-500 rounded-full shadow-5xl" href="#">
                          <img className="absolute -left-20 top-2 max-w-max" src="uinel-assets/elements/ecommerce-product-list/toggle-bg-blue.svg" alt=""/>
                        </a>
                        <div className="absolute -left-6 transform translate-x-2 translate-y-px top-10 max-w-max">
                          <svg className="absolute left-1/2 transform -translate-x-1/2 -top-2 z-10" width="14" height="11" viewbox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.41519 1.05873C6.21579 0.0187157 7.78421 0.0187151 8.58481 1.05873L13.1815 7.03001C14.1939 8.34515 13.2564 10.25 11.5967 10.25H2.40331C0.743631 10.25 -0.1939 8.34515 0.818494 7.03001L5.41519 1.05873Z" fill="#edf1f8"></path>
                          </svg>
                          <div className="flex items-center justify-center py-1 font-heading font-medium bg-blueGray-100 rounded-lg px-3">Rs.500</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-10 px-5 bg-white rounded-3xl">
                    <h2 className=" mb-6 text-3xl leading-9 font-heading font-medium">Location</h2>
                    <a className="flex items-center py-4  mb-3 leading-8 font-heading font-medium bg-white border border-gray-100 rounded-3xl" href="#">
                      <span className="mr-6">
                        <svg width="27" height="27" viewbox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="27" height="27" rx="8" fill="#28E172"></rect>
                          <path d="M11.4534 19L6 13.6758L6.72022 12.9726L11.4534 17.5937L21.2798 8L22 8.70316L11.4534 19Z" fill="white"></path>
                        </svg>
                      </span>
                      <span>Telangana</span>
                    </a>

                    <a className="flex items-center py-4  leading-8 font-heading font-medium bg-white border border-gray-100 rounded-3xl" href="#">
                      <span className="mr-6">
                        <svg width="27" height="27" viewbox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="26" height="26" rx="5.5" fill="white" stroke="#DBDDE1"></rect></svg>
                      </span>
                      <span>Goa</span>
                    </a>

                    <a className="flex items-center py-4  leading-8 font-heading font-medium bg-white border border-gray-100 rounded-3xl" href="#">
                      <span className="mr-6">
                        <svg width="27" height="27" viewbox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="26" height="26" rx="5.5" fill="white" stroke="#DBDDE1"></rect></svg>
                      </span>
                      <span>Pilani</span>
                    </a>

                    <a className="flex items-center py-4 leading-8 font-heading font-medium bg-white border border-gray-100 rounded-3xl" href="#">
                      <span className="mr-6">
                        <svg width="27" height="27" viewbox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="26" height="26" rx="5.5" fill="white" stroke="#DBDDE1"></rect></svg>
                      </span>
                      <span>Other States</span>
                    </a>

                  </div>
                </div> */}
                <div className="w-full md:w-full lg:w-full xl:full md:pl-2">
                  <div className="grid xl:grid-cols-5 gap-0 md:grid-cols-3 grid-cols-1">
                    {data
                      ? data.map((data, key) => (
                          <div key={data.ID}>
                            <ProductInProductsPage
                              id={data?.ID}
                              cost={data?.Price}
                              image={data?.URL}
                              description={data?.ProductName}
                              rating={data?.Ratings}
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
              {/* <div className="sm:mx-auto sm:w-96"><a className="block py-5 w-full text-xl leading-6 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-3xl" href="#">More products</a></div> */}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Index;
