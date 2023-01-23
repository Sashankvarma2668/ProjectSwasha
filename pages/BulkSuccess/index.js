import React from 'react'
import Head from "next/head";
import Header from '../template/header';
import Footer from '../template/footer';

const Index = () => {
  return (
    <>
      <Head>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"/>
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
      </Head>
      <Header/>

    <div className="">
                
      <section className="py-24 2xl:pt-32 2xl:pb-36 rounded-b-10xl overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-20 lg:mb-0">
              <img src="/uinel-assets/images/contacts/widget2.png" alt=""/>
            </div>
            <div className="w-full lg:w-1/2 px-4">
           
              <h1 className="animate__swing mb-6 text-6xl md:text-6xl xl:text-6xl font-medium font-heading">Contact us here</h1>
              <p className="mb-14 text-lg text-darkBlueGray-400">Our executive partners are ready to help you with your order. </p>
              <div className="flex flex-wrap mb-14 xl:mb-20">
                <div className="flex items-center mb-6 w-full xl:w-1/2">
                  <img className="mr-6 h-14" src="/uinel-assets/images/contacts/icon1.svg" alt=""/>
                  <a className="text-3xl font-medium" href="#">+91 9153567999</a>
                </div>
                <div className="flex items-center mb-6 w-full xl:w-1/2">
                  <img className="mr-6 h-14" src="/uinel-assets/images/contacts/icon2.svg" alt=""/>
                  <a className="text-3xl font-medium" href="#">chat</a>
                </div>
                <div className="flex items-center w-full xl:w-1/2">
                  <img className="mr-6 h-14" src="/uinel-assets/images/contacts/icon3.svg" alt=""/>
                  <a className="text-3xl font-medium" href="#">help@nirmaan</a>
                </div>
              </div>
              <div className="flex flex-wrap"><a className="inline-block py-5 px-10 mr-6 text-xl leading-6 text-white font-medium tracking-tighter font-heading bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" href="#">Call</a><a className="inline-block py-5 px-10 text-xl leading-6 font-medium tracking-tighter font-heading bg-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 rounded-xl" href="#">More</a></div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="js/charts-demo.js"></script>
    <Footer/>

    </>
  )
}

export default Index
