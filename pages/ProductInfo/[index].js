import React from "react";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import ProductInProductInfoPage from "../../components/ProductInProductInfoPage";
import router, { useRouter } from "next/router";
const axios = require("axios");
import { useState, useEffect } from "react";
import { API_URL } from "../../config/constants";

const Index = () => {
  const router = useRouter();
  const productid = router.query.index;

  const [singledata, setSingleData] = useState();
  const [productname, setProductName] = useState();
  const [productprice, setProductPrice] = useState();
  const [producturl, setProductUrl] = useState();
  const [producturl1, setProductUrl1] = useState();
  const [producturl2, setProductUrl2] = useState();
  const [producturl3, setProductUrl3] = useState();
  const [productdescription, setProductDescription] = useState();
  const [productrating, setProductRating] = useState();

  useEffect(() => {
    // if (isStudentLoggedIn() !== true) {
    //   router.push("/login?refer=/ProductsPage");
    // }

    axios
      .post(API_URL + "/products/get_single_product.php", {
        product_id: productid,
      })
      .then(function (response) {
        setSingleData(response?.data?.data);

        setProductName(response?.data?.data?.ProductName);
        setProductPrice(response?.data?.data?.Price);
        setProductUrl(response?.data?.data?.URL);
        
        setProductUrl1(response?.data?.data?.URL1);
        setProductUrl2(response?.data?.data?.URL2);
        setProductUrl3(response?.data?.data?.URL3);
        setProductRating(response?.data?.data?.Ratings);
        setProductDescription(response?.data?.data?.Description);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  );
  
  

  return (
    <>
      <Header />

      <div className="">
        <section className="pt-12 pb-24 rounded-b-10xl overflow-hidden bg-white">
          <div className="w-full  text-center lg:w-1/2 ">
            <div className="lg:hidden order:1 mb-6">
              <h2 className=" mb-4 text-3xl md:text-4xl font-heading font-medium">
                {productname}{" "}
              </h2>
              <p className="flex-1 items-center mb-6">
                <span className="mr-2 text-blue-500 font-medium">Rs</span>
                <span className="text-3xl text-blue-500 font-medium">
                  {productprice}
                </span>
              </p>
              <p className="text-lg text-gray-400">{productdescription}</p>
            </div>
          </div>
          <div className="container md:px-36 mx-auto">
            <div className="flex flex-wrap -mx-4">
              <ProductInProductInfoPage
                id={productid}
                url={producturl}
                url1={producturl1}
                url2={producturl2}
                url3={producturl3}
                title={productname}
                cost={productprice}
                description={productdescription}
                rating={productrating}
              />
            </div>
          </div>
        </section>
      </div>
      <div className="">
        <section className="py-24 xl:py-44  overflow-hidden">
          <div className="lg:block hidden container py-16 bg-gray-100 lg:px-24 px-4 mx-auto">
            <h2 className="mb-6 text-5xl text-center lg:pb-12 md:text-5xl xl:text-5xl font-heading font-medium">
              Features
            </h2>

            <div className="flex items-center justify-center -mx-4">
              <div className="hidden md:block flex-shrink-0 w-auto px-4">
                <div className="px-6 pt-8 pb-10 bg-white rounded-3xl">
                  <div className="flex flex-wrap items-center max-w-sm">
                    <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                      <img
                        className="h-16"
                        src="uinel-assets/elements/ecommerce-features/icon1.svg"
                        alt=""
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="mb-2 text-lg font-heading font-medium">
                        Superpower
                      </h3>
                      <p>
                        Donec laoreet sem sollicitudin, mattis mi in, tristique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="w-auto sm:w-1/12">
                <a className="inline-block hover:text-darkBlueGray-400" href="#">
                  <svg width="8" height="12" viewbox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.21015 10.4594C7.59661 10.8128 7.59661 11.3841 7.21015 11.7349C6.82369 12.0871 6.19929 12.0897 5.81282 11.7349L0.289847 6.63794C-0.0966174 6.28579 -0.0966173 5.71584 0.289847 5.36108L5.81282 0.264109C6.19785 -0.0880364 6.82369 -0.0880364 7.21015 0.264109C7.59662 0.617558 7.59662 1.18882 7.21015 1.53966L2.68073 6.00147L7.21015 10.4594Z" fill="currentColor"></path>
                  </svg>
                </a>
              </div> */}
              <div className="hidden xl:block flex-shrink-0 w-auto px-4">
                <div className="px-6 pt-8 pb-10 bg-white rounded-3xl">
                  <div className="flex flex-wrap items-center max-w-sm">
                    <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                      <img
                        className="h-16"
                        src="/images/quality-svgrepo-com.svg"
                        alt=""
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="mb-2 text-lg font-heading font-medium">
                        Quality
                      </h3>
                      <p>
                        Donec laoreet sem sollicitudin, mattis mi in, tristique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-10/12 sm:flex-shrink-0 sm:w-auto px-4">
                <div className="px-6 pt-8 pb-10 bg-white rounded-3xl">
                  <div className="flex flex-wrap items-center max-w-sm">
                    <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                      <img
                        className="h-12"
                        src="/images/comfort-svgrepo-com.svg"
                        alt=""
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="mb-2 text-lg font-heading font-medium">
                        Comfort
                      </h3>
                      <p>
                        Donec laoreet sem sollicitudin, mattis mi in, tristique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden xl:block flex-shrink-0 w-auto px-4">
                <div className="px-6 pt-8 pb-10 bg-white rounded-3xl">
                  <div className="flex flex-wrap items-center max-w-sm">
                    <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                      <img
                        className="h-16 mr-4 md:mr-12"
                        src="/images/7229121.png"
                        alt=""
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="mb-2 text-lg font-heading font-medium">
                        Versatility
                      </h3>
                      <p>
                        Donec laoreet sem sollicitudin, mattis mi in, tristique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="w-auto sm:w-1/12 text-right">
                <a className="inline-block hover:text-darkBlueGray-400" href="#">
                  <svg width="8" height="12" viewbox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.289849 1.54064C-0.0966146 1.18719 -0.0966145 0.615928 0.28985 0.265087C0.676314 -0.087058 1.30071 -0.0896662 1.68718 0.265087L7.21015 5.36206C7.59662 5.71421 7.59662 6.28416 7.21015 6.63892L1.68718 11.7359C1.30215 12.088 0.676312 12.088 0.289848 11.7359C-0.0966159 11.3824 -0.0966159 10.8112 0.289848 10.4603L4.81927 5.99853L0.289849 1.54064Z" fill="currentColor"></path>
                  </svg>
                </a>
              </div> */}
              <div className="hidden md:block flex-shrink-0 w-auto px-4">
                <div className="px-6 pt-8 pb-10 bg-white rounded-3xl">
                  <div className="flex flex-wrap items-center max-w-sm">
                    <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                      <img
                        className="h-16 mr-4 md:mr-12"
                        src="uinel-assets/elements/ecommerce-features/icon3.svg"
                        alt=""
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="mb-2 text-lg font-heading font-medium">
                        4K Camera
                      </h3>
                      <p>
                        Donec laoreet sem sollicitudin, mattis mi in, tristique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 lg:px-24 2xl:py-16 bg-gray-100 rounded-t-10xl overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="text-xs text-gray-300 uppercase flex-1 text-center tracking-wide">
              What people say
            </div>
            <h1 className="mt- mb-14 md:mb-24 text-5xl md:text-5xl text-center xl:text-11xl font-heading font-medium leading-tight">
              User Reviews
            </h1>
            <div className="flex flex-wrap -mx-2 mb-14">
              <div className="w-full xl:w-3/5 px-2 mb-4 xl:mb-0">
                <div className="flex items-center h-full py-12 px-8 bg-white rounded-3xl">
                  <div className="flex flex-wrap items-center justify-between w-full -mx-2">
                    <div className="w-full md:w-auto px-2 mb-4 md:mb-0">
                      <a className="block mb-8 mx-auto max-w-max" href="#">
                        <img
                          className="h-24 object-cover"
                          src="/images/1.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="w-full md:w-auto px-2 mb-8 md:mb-0">
                      <a
                        className="block mb-10 text-2xl xl:text-3xl font-heading font-medium hover:underline"
                        href="#"
                      >
                        Handloom Cotton Fabric
                      </a>
                      <div className="flex">
                        <p className="text-sm font-heading font-medium mr-2">
                          <span>Color</span>
                          <span className="text-darkBlueGray-300">: Grey</span>
                        </p>
                        <p className="text-sm font-heading font-medium">
                          <span>Size</span>
                          <span className="text-darkBlueGray-300">: M</span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-auto px-2 lg:pb-10 md:mb-0">
                      <p className="text-xl text-blue-500 pb-4 font-heading font-medium">
                        Rs. 400
                      </p>
                    </div>
                    <div className="w-full md:w-auto px-2">
                      <a
                        className="inline-block w-full md:w-auto py-2 px-6 text-center leading-8 font-heading font-medium tracking-tighter text-xl text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                        href="#"
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/5 px-2 mb-4 md:mb-0">
                <div className="lg:py-20 py-12 text-center px-12 h-full bg-white rounded-3xl">
                  <p className="font-heading font-medium">
                    <span className="text-5xl">4.3</span>
                    <span className="text-gray-300">/5</span>
                  </p>
                  <div className="flex mb-3 py-2 items-center justify-center">
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block text-gray-200" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    1 218 reviews
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/5 px-2">
                <div className="lg:pt-20 px-12 py-12 h-full text-center bg-white rounded-3xl">
                  <p className="font-heading font-medium">
                    <span className="text-5xl">4.1</span>
                    <span className="text-gray-300">/5</span>
                  </p>
                  <div className="flex mb-3 py-2 items-center justify-center">
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block text-gray-200" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">Uistore</p>
                </div>
              </div>
            </div>
            <div className="py-2 mb-12 lg:w-1/6 text-center bg-amber-300">
              <a
                className="inline-block  text-2xl font-heading font-medium hover:text-darkBlueGray-700"
                href="#"
              >
                1,218 reviews
              </a>
            </div>
            <div className="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
              <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
                <div className="flex flex-wrap items-center">
                  <img
                    className="mr-6"
                    src="uinel-assets/images/ecommerce-reviews/user.png"
                    alt=""
                  />
                  <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                    Reviewer 1
                  </h4>
                  <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                  <span className="mr-4 text-xl font-heading font-medium">
                    5.0
                  </span>
                  <div className="inline-flex">
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block text-gray-200" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-2/3 mb-6 md:mb-0">
                    <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">
                      I haretra neque non mi aliquam, finibus hart bibendum
                      molestie. Vestibulum suscipit sagittis dignissim mauris.
                    </p>
                    <div className="-mb-2">
                      <div className="inline-flex w-full md:w-auto md:mr-2 mb-2">
                        <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                          <div className="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500">
                            <svg
                              width="11"
                              height="11"
                              viewbox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-green-500 font-heading font-medium">
                            Quality
                          </span>
                        </div>
                      </div>
                      <div className="inline-flex w-full md:w-auto md:mr-2 mb-2">
                        <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                          <div className="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500">
                            <svg
                              width="11"
                              height="11"
                              viewbox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-green-500 font-heading font-medium">
                            Durability
                          </span>
                        </div>
                      </div>
                      <div className="inline-flex w-full md:w-auto mb-2">
                        <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                          <div className="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500">
                            <svg
                              width="11"
                              height="11"
                              viewbox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-green-500 font-heading font-medium">
                            ease of use
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 text-right">
                    <p className="mb-8 text-sm text-gray-300">
                      Added 2 months ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
              <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
                <div className=" flex flex-wrap items-center">
                  <img
                    className=" mr-6"
                    src="uinel-assets/images/ecommerce-reviews/user2.png"
                    alt=""
                  />
                  <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                    Reviewer 2
                  </h4>
                  <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                  <span className=" mr-4 text-xl font-heading font-medium">
                    4.3
                  </span>
                  <div className="flex">
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block text-gray-200" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-4 md:px-16 pt-8 pb-12 bg-white">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-2/3 mb-6 md:mb-0">
                    <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">
                      I haretra neque non mi aliquam, finibus hart bibendum
                      molestie. Morbi facilisis neque in condimentum malesuada.
                      Vestibulum suscipit sagittis dignissim mauris.
                    </p>
                    <div className="-mb-2">
                      <div className="inline-flex w-full md:w-auto md:mr-2 mb-2">
                        <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                          <div className="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500">
                            <svg
                              width="11"
                              height="11"
                              viewbox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-green-500 font-heading font-medium">
                            Comfort
                          </span>
                        </div>
                      </div>
                      <div className="inline-flex w-full md:w-auto md:mr-2 mb-2">
                        <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                          <div className="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500">
                            <svg
                              width="11"
                              height="11"
                              viewbox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-green-500 font-heading font-medium">
                            versatility
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 text-right">
                    <p className="mb-8 text-sm text-gray-300">
                      Added 2 months ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-14 md:mb-24 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
              <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
                <div className="flex flex-wrap items-center">
                  <img
                    className="mr-6"
                    src="uinel-assets/images/ecommerce-reviews/user3.png"
                    alt=""
                  />
                  <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                    Reviewer 3
                  </h4>
                  <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                  <span className="mr-4 text-xl font-heading font-medium">
                    5.0
                  </span>
                  <div className="flex">
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block mr-1" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                    <a className="inline-block text-gray-200" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewbox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-4 md:px-16 pt-8 pb-12 bg-white">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-2/3 mb-6 md:mb-0">
                    <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">
                      I haretra neque non mi aliquam, finibus hart bibendum
                      molestie. Vestibulum suscipit sagittis dignissim mauris.
                    </p>
                    <div className="-mb-2">
                      <div className="inline-flex w-full md:w-auto md:mr-2 mb-2">
                        <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                          <div className="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500">
                            <svg
                              width="11"
                              height="11"
                              viewbox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-green-500 font-heading font-medium">
                            Durability
                          </span>
                        </div>
                      </div>
                      <div className="inline-flex w-full md:w-auto md:mr-2 mb-2">
                        <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                          <div className="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500">
                            <svg
                              width="11"
                              height="11"
                              viewbox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-green-500 font-heading font-medium">
                            Quality
                          </span>
                        </div>
                      </div>
                      <div className="inline-flex w-full md:w-auto mb-2">
                        <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                          <div className="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500">
                            <svg
                              width="11"
                              height="11"
                              viewbox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-green-500 font-heading font-medium">
                            ease of use
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 text-right">
                    <p className="mb-8 text-sm text-gray-300">
                      Added 2 months ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="inline-block w-full md:w-auto h-full py-4 px-10 leading-8 font-heading font-medium tracking-tighter text-xl text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
                See all
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Index;
