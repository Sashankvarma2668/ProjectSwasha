import React from "react";
import Header from "../../pages/template/header";
import Footer from "../../pages/template/footer";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Cookies from "js-cookie";

const Index = () => {
  const [logintoken, setLoginToken] = useState(
    Cookies.get("student_login_token")
  );
  const [savedcode, setSavedCode] = useState();

  useEffect(() => {
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
  }, []);

  function deletedata(id) {
    axios
      .post(API_URL + "deletestdcode.php", {
        id: id,
      })
      .then(function (response) {
        console.log(response);
        alert("Program Deleted Successfully");
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Header />

      <div className=" pt-14 px-32 flex justify-between items-center  ">
        <div className="text-3xl flex justify-center items-center">
          My Programs
        </div>

        <a
          href="/html-compiler.html"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded flex items-center align-middle"
        >
          <svg
            className="w-5 h-5 mr-1"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M256 112v288m144-144H112"
            ></path>
          </svg>
          <span>Create New File</span>
        </a>
      </div>

      <div class="flex flex-col pt-2 px-32 h-auto">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center border-2 rounded-lg">
                <thead class="border-b bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-2"
                    >
                      S.No
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-2"
                    >
                      File Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-2"
                    >
                      File Type
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-2"
                    >
                      Last Updated
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-2"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedcode
                    ? savedcode.map((data, index) => (
                        <tr
                          class="bg-white border-b"
                          value={data.ID}
                          key={data.ID}
                        >
                          <td class="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                            <a
                              href={
                                "/html-compiler-edit.html?" + data.ProgramID
                              }
                              passHref
                            >
                              <div className="text-blue-500 hover:underline text-lg">
                                {data.Title}
                              </div>
                            </a>
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                            {data.ProgramType}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                            {data.CreatedAt}
                          </td>

                          <td class="cursor-pointer text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center items-center">
                            <button onClick={() => deletedata(data.ProgramID)}>
                              <svg
                                className="w-5 h-5 cursor-pointer fill-current text-red-500"
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 1024 1024"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Index;
