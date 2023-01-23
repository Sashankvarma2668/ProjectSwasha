import React from "react";
import Link from "next/dist/client/link";
import ProductsPage from "../pages/ProductsPage";

const ProductInProductsPage = (props) => {
  return (
    <Link href={"/ProductInfo/" + props.id}>
      <div className=" px-1 mb-6 cursor-pointer">
        <div className="p-10  bg-gray-100 xl:px-9 rounded-3xl">
          <a href="#">
            <img
              className="mb-8 xl:mb-4 mx-auto h-40 object-cover"
              src={props.image}
              alt=""
            />
          </a>

          <a href="#">
            <p className="lg:h-14 text-xl text-center leading-8 font-heading font-medium">
              {props.description}
            </p>
          </a>

          <div className="flex my-3  items-center">
            <div className="inline-flex">
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
                    fill="#FFD700"
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
                    fill="#FFD700"
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
                    fill="#FFD700"
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
                    fill="#FFD700"
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
              <div className="text-md pl-4 text-gray-400">{props.rating}</div>
            </div>
          </div>
          <p className="text-xl text-blue-500 text-center font-heading font-medium tracking-tighter">
            <span className="text-base pr-2">Rs.</span>
            <span>{props.cost}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductInProductsPage;
