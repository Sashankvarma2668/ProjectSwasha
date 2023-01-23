import React, { useState, useEffect, Component } from "react";
import Link from "next/link";
import { isStudentLoggedIn, StudentData } from "../utils/Student";
const axios = require("axios");
import { API_URL } from "../config/constants";
import { useRouter } from "next/router";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


const ProductInProductInfoPage = (props) => {
  const [studentid, setStudentId] = useState(StudentData().ID);

  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [value, setValue] = useState();
  const [productquantity, setProductQuantity] = useState();
  const p_id = props.id;
  var producttotal = quantity * props.cost;

  const AddToBag = (id) => {
    //   if(!cartdata) {

    //   axios
    //   .post(API_URL+"/cart/add_cart.php" ,
    //   {
    //     productid : id,
    //     studentid : studentid,
    //     quantity : quantity,
    //     producttotal: producttotal,
    //   })
    //   .then(function (response) {
    //      if(response) {
    //          router.push('/Cart')
    //      }

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // }

    if (value > 0) {
      // for( let i=0 ; i<cartcount;i++){
      //   if(cartdata[i]?.ID != id){
      //     continue;
      //   } else {
      var intproductquantity = parseInt(productquantity) + parseInt(quantity);

      // setProductQuantity(intproductquantity);
      var producttotals = intproductquantity * props.cost;

      axios
        .post(API_URL + "/cart/duplicate_cart_update.php", {
          quantity: intproductquantity,
          studentid: studentid,
          productid: p_id,
          producttotals: producttotals,
        })
        .then(function (response) {
          if (response) {
            router.push("/Cart");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post(API_URL + "/cart/add_cart.php", {
          productid: id,
          studentid: studentid,
          quantity: quantity,
          producttotal: producttotal,
        })
        .then(function (response) {
          if (response) {
            router.push("/Cart");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const AddToWishList = (id) => {
    axios
      .post(API_URL + "/wishlist/add_wishlist.php", {
        productid: id,
        studentid: studentid,
        quantity: quantity,
        producttotal: producttotal,
      })
      .then(function (response) {
        if (response) {
          router.push("/WishList");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .post(API_URL + "/orders/get_all_cart_items_cart.php", {
        id: studentid,
        p_id: p_id,
      })
      .then(function (response) {
        setValue(response?.data?.cartcount);
        setProductQuantity(response?.data?.data[0]?.Quantity);
        console.log(response?.data?.data[0]?.Quantity);
        // setCartData(response?.data?.data);
        // setCartCount(response?.data?.cartcount) ;

        // console.log(cartdata[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4 xl:pr-20">
          <div className="max-w-md order:1 lg:block hidden mb-6">
            <h2 className="mt-6 mb-4 text-5xl md:text-7xl lg:text-5xl font-heading font-medium">
              {props.title}
            </h2>
            <p className="flex text-center items-center mb-6">
              <div className="text-3xl text-blue-500 font-medium text-center">
                Rs. {props.cost}
              </div>
            </p>
            <p className="text-lg text-gray-400">{props.description}</p>
          </div>

          <div className="flex mb-6 items-center ml-10 md:ml-0">
            <div className="inline-flex mr-4 ">
              <button className="mr-1 ">
                <svg
                  width="20"
                  height="20"
                  viewbox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                    fill="#FFCB00"
                  ></path>
                </svg>
              </button>
              <button className="mr-1">
                <svg
                  width="20"
                  height="20"
                  viewbox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                    fill="#FFCB00"
                  ></path>
                </svg>
              </button>
              <button className="mr-1">
                <svg
                  width="20"
                  height="20"
                  viewbox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                    fill="#FFCB00"
                  ></path>
                </svg>
              </button>
              <button className="mr-1">
                <svg
                  width="20"
                  height="20"
                  viewbox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                    fill="#FFCB00"
                  ></path>
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewbox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                    fill="#C1C9D3"
                  ></path>
                </svg>
              </button>
            </div>
            <span className="text-md text-gray-400">{props.rating}</span>
          </div>
          {/* <div className="mb-6 ml-10 md:ml-0">
        <h4 className="mb-3 font-heading font-medium">
          <span>Color:</span>
          <span className="text-gray-400">{props.color}</span>
        </h4>
        <button className="inline-flex items-center justify-center p-1 rounded-full border border-gray-300">
          <div className="w-6 h-6 rounded-full bg-white"></div>
        </button>
        <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
          <div className="w-6 h-6 rounded-full bg-orange-800"></div>
        </button>
        <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
          <div className="w-6 h-6 rounded-full bg-blue-900"></div>
        </button>
        <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
          <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
        </button>
      </div> */}
          <div className="mb-10 ml-10 md:ml-0">
            <h4 className="mb-3 font-heading font-medium">Qty:</h4>
            <input
              value={quantity}
              onChange={(e) => {
                setQuantity(+e.target.value);
              }}
              className="w-24 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
              type="text"
            />
          </div>
          <div className="flex flex-wrap -mx-2 mb-12">
            <div
              onClick={() => AddToBag(props.id)}
              className="w-full md:w-2/3 px-2 mb-2 md:mb-0"
            >
              <a
                className="block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl"
                href="#"
              >
                Add to bag
              </a>
            </div>
            <div
              onClick={() => AddToWishList(props.id)}
              className="w-full md:w-1/3 px-2"
            >
              <a
                className="flex w-full py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
                href="#"
              >
                <span className="mr-2">Wishlist</span>
                <svg
                  width="23"
                  height="22"
                  viewbox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3235 20.1324L2.52488 10.8515C1.75232 10.0706 1.24237 9.06367 1.06728 7.97339C0.8922 6.88311 1.06086 5.76477 1.54936 4.7768V4.7768C1.91837 4.03089 2.45739 3.3843 3.12201 2.89033C3.78663 2.39635 4.55781 2.06911 5.37203 1.93558C6.18626 1.80205 7.0202 1.86605 7.80517 2.1223C8.59013 2.37855 9.30364 2.81972 9.88691 3.40946L11.3235 4.86204L12.7601 3.40946C13.3434 2.81972 14.0569 2.37855 14.8419 2.1223C15.6269 1.86605 16.4608 1.80205 17.275 1.93558C18.0892 2.06911 18.8604 2.39635 19.525 2.89033C20.1897 3.3843 20.7287 4.03089 21.0977 4.7768V4.7768C21.5862 5.76477 21.7549 6.88311 21.5798 7.97339C21.4047 9.06367 20.8947 10.0706 20.1222 10.8515L11.3235 20.1324Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-6 font-heading font-medium pl-6">
              More information
            </h4>
            <button className="flex w-full pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
              <h3 className="text-lg font-heading font-medium">
                Shipping &amp; returns
              </h3>
              <span>
                <svg
                  width="12"
                  height="8"
                  viewbox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                    fill="black"
                  ></path>
                </svg>
              </span>
            </button>
            <button className="flex w-full pl-6 lg:pl-12 pr-6 py-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
              <h3 className="text-lg font-heading font-medium">
                Product details
              </h3>
              <span>
                <svg
                  width="12"
                  height="8"
                  viewbox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                    fill="black"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-4 xl:pl-20 mb-16 lg:mb-0 order-first lg:order-last">
          <div className="relative md:w-full lg:w-auto mx-auto mt-14 mb-14">
    
            <Carousel autoPlay={true} infiniteLoop={true} interval="2000">
              <div>
            
              <img src={props.url} alt="image1" />
              </div>

              <div>
                <img src={props.url1} alt="image2" />
            
                
              </div>
              <div>
                <img src={props.url2} alt="image3" />
               
              </div>
              <div>
                <img src={props.url3} alt="image4" />
                
              </div>
             
            </Carousel>

            {/* <img className='h-96 lg:w-full w-full ' src={props.url} alt=""/> */}
            {/* <button className="absolute top-1/2 left-0 ml-2 md:ml-10 hover:text-darkBlueGray-400">
              <svg
                width="8"
                height="12"
                viewbox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.21015 10.4594C7.59661 10.8128 7.59661 11.3841 7.21015 11.7349C6.82369 12.0871 6.19929 12.0897 5.81282 11.7349L0.289847 6.63794C-0.0966174 6.28579 -0.0966173 5.71584 0.289847 5.36108L5.81282 0.264109C6.19785 -0.0880364 6.82369 -0.0880364 7.21015 0.264109C7.59662 0.617558 7.59662 1.18882 7.21015 1.53966L2.68073 6.00147L7.21015 10.4594Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button className="absolute top-1/2 right-0 mr-2 md:mr-10 hover:text-darkBlueGray-400">
              <svg
                width="8"
                height="12"
                viewbox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.289849 1.54064C-0.0966146 1.18719 -0.0966145 0.615928 0.28985 0.265087C0.676314 -0.087058 1.30071 -0.0896662 1.68718 0.265087L7.21015 5.36206C7.59662 5.71421 7.59662 6.28416 7.21015 6.63892L1.68718 11.7359C1.30215 12.088 0.676312 12.088 0.289848 11.7359C-0.0966159 11.3824 -0.0966159 10.8112 0.289848 10.4603L4.81927 5.99853L0.289849 1.54064Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button> */}
            {/* <p className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 text-sm text-">
              Click image to zoom in
            </p> */}
          </div>
          {/* <div className="flex flex-wrap md:px-10 -mx-1">
            <button className="w-1/2 md:w-1/4 px-1 mb-1 md:mb-0 border-2 border-blue-500 rounded-4xl">
              <img className="w-full h-full" src="/images/1.jpg" alt="" />
            </button>
            <button className="w-1/2 md:w-1/4 px-1 mb-1 md:mb-0 rounded-4xl">
              <img className="w-full h-full" src="/images/2.jpg" alt="" />
            </button>
            <button className="w-1/2 md:w-1/4 px-1 rounded-4xl">
              <img className="w-full h-full" src="/images/3.jpg" alt="" />
            </button>
            <button className="w-1/2 md:w-1/4 px-1 rounded-4xl">
              <img className="w-full h-full" src="/images/6.jpg" alt="" />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductInProductInfoPage;