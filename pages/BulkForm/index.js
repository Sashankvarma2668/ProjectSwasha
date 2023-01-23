import React from 'react'
import { useState, useEffect } from 'react'
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Header from '../template/header';
import Footer from '../template/footer';
import { useRouter } from "next/router";


const Index = () => {

  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [country, setCountry] = useState();
  const [quantity, setQuantity] = useState();
  const [company, setCompany] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailValidError, setEmailValidError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const router = useRouter()



  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const submitform = (e) => {
    e.preventDefault();
    if (email == null) {
      // setLoginMessage({ type: "error", message: "Please enter email.", icon: "error" });
      // document.getElementById("email").focus();
      setEmailError(true);
      setRegisterError(true);

    } else {
      setEmailError(false);
    }

    if (!validateEmail(email)) {
      setEmailValidError(true);

      // setLoginMessage({ type: "error", message: "Please enter valid email.", icon: "error" });
      // document.getElementById("email").focus();
      // setEmailError(true)
    } else {
      setEmailValidError(false);
      // setEmailError(false)
    }













    if (firstname == null || lastname == null || country == null || company == null || quantity == null || email == null) {
      setError(true)
    }
    else {

      axios
        .post(API_URL + "/bulkform/bulkform.php",
          {
            firstname: firstname,
            lastname: lastname,
            company: company,
            country: country,
            quantity: quantity,
            email: email,
          })
        .then(function (response) {
          if (response) {
            router.push('/BulkSuccess')
          }


        })
        .catch(function (error) {
          console.log(error);
        });

      setError(false)

    }












  }





  return (
    <>
      <Header />
      <div className="">

        <section className="bg-white py-4 md:px-20">
          <div className="container px-4 mx-auto">
            <div className="p-6 h-full overflow-hidden bg-white rounded-md">
              <div className="pb-6 border-b border-coolGray-100">
                <div className="flex flex-wrap items-center justify-between -m-2">
                  <div className="w-full md:w-auto p-2">
                    <h2 className="text-coolGray-900 text-lg font-semibold">Bulk Order</h2>
                    <p className="text-xs text-coolGray-500 font-medium">PLease fill the form below for bulk orders</p>
                  </div>
                  {/* <div className="w-full md:w-auto p-2">
                  <div className="flex flex-wrap justify-between -m-1.5">
                    <div className="w-full md:w-auto p-1.5">
                      <button className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 bg-white rounded-md shadow-button">
                        <p>Cancel</p>
                      </button>
                    </div>
                    <div className="w-full md:w-auto p-1.5">
                      <button className="flex flex-wrap justify-center w-full px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button">
                        <p>Save</p>
                      </button>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
              <div className="py-6 border-b border-coolGray-100">
                <div className="w-full md:w-9/12">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-full md:w-1/3 p-3">
                      <p className="text-sm text-coolGray-800 font-semibold">Name</p>
                    </div>
                    <div className="w-full md:w-1/3 p-3">
                      <input onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="text" placeholder="First Name" />
                    </div>
                    <div className="w-full md:w-1/3 p-3">
                      <input onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="text" placeholder="Last Name" />
                    </div>
                  </div>
                </div>
              </div>





              <div className="py-6 border-b border-coolGray-100">
                <div className="w-full md:w-9/12">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-full md:w-1/3 p-3">
                      <p className="text-sm text-coolGray-800 font-semibold">Email address</p>
                    </div>
                    <div className="w-full md:flex-1 p-3">
                      <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="email" placeholder="johndoe@flex.co" />
                    </div>
                  </div>
                  {emailError ? (
                    <span className="text-red-500" id="email_error">
                      Enter your Email
                    </span>
                  ) : emailValidError ? (
                    <span className="text-red-500" id="email_error">
                      Enter Valid Email Address
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>


              <div className="py-6 border-b border-coolGray-100">
                <div className="w-full md:w-9/12">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-full md:w-1/3 p-3">
                      <p className="text-sm text-coolGray-800 font-semibold">Company</p>
                    </div>
                    <div className="w-full md:flex-1 p-3">
                      <input onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="text" placeholder="Enter Your Firm Name" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-6 border-b border-coolGray-100">
                <div className="w-full md:w-9/12">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-full md:w-1/3 p-3">
                      <p className="text-sm text-coolGray-800 font-semibold">Country</p>
                    </div>
                    <div className="w-full md:flex-1 p-3">
                      <div className="relative">
                        <svg className="absolute right-4 top-1/2 transform -translate-y-1/2" width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                        </svg>
                        <select onChange={(e) => setCountry(e.target.value)} className="appearance-none w-full py-2.5 px-4 text-coolGray-900 text-base font-normal bg-white border outline-none border-coolGray-200 focus:border-green-500 rounded-lg shadow-input">
                          <option>select country</option>

                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-6 border-b border-coolGray-100">
                <div className="w-full md:w-9/12">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-full md:w-1/3 p-3">
                      <p className="text-sm text-coolGray-800 font-semibold">Quantity</p>
                    </div>
                    <div className="w-full md:flex-1 p-3">
                      <input onChange={(e) => setQuantity(+e.target.value)} className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="number" placeholder="Enter your required quantity of the product" />
                    </div>
                  </div>

                </div>
              </div>
              {error ? (
                <span className='text-red-600'>
                  Please fill all the fields
                </span>
              ) : ""}
              <div className="w-full md:w-auto p-2">
                <div className="flex flex-wrap justify-start -m-1.5">
                  <div className="w-full md:w-auto p-1.5">
                    <button onClick={(e) => { submitform(e) }} className="flex flex-wrap justify-center w-full px-10 py-2 bg-blue-600 hover:bg-blue-800 font-medium text-sm text-white border border-blue-500 rounded-md shadow-button">
                      <p>Order</p>
                    </button>
                  </div>
                  <div className="w-full md:w-auto p-1.5">
                    <button className="flex flex-wrap justify-center w-full px-10 py-2 font-medium text-sm text-gray-500 hover:text-gray-600 border border-gray-200 hover:border-blue-300 bg-gray-100 rounded-md shadow-button">
                      <p>Cancel</p>
                    </button>
                  </div>

                </div>
              </div>
              {/* <div className="py-6 border-b border-coolGray-100">
              <div className="w-full md:w-9/12">
                <div className="flex flex-wrap -m-3">
                  <div className="w-full md:w-1/3 p-3">
                    <p className="text-sm text-coolGray-800 font-semibold">Expected delivery date</p>
                  </div>
                  <div className="w-full md:flex-1 p-3">
                    <div className="flex items-center focus-within:border-green-500 overflow-hidden border border-coolGray-200 rounded-lg shadow-input">
                      <p className="px-4 text-base text-coolGray-500 font-normal">https://</p>
                      <input className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none border-l" type="text" placeholder="flex.co"/>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}







            </div>
          </div>
















        </section>



      </div>
      <Footer />
    </>
  )
}

export default Index




// this is harsha's change