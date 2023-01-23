import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

const Header = () => {
  return (
    <div className=''>

        
        <div className="lg:px-28 md:px-10 border-b px-3 border-black border-opacity-20 mb-1 lg:px-10">
            <nav className="flex justify-between">
              <div className="flex w-full items-center py-3">
                <a href="https://nirmaan.org/">
                  <img className="h-12" src="/images/logo.png" alt=""/>
                </a>
                  <form className="md:flex hidden pl-10 items-center">   
                     <label className="sr-only">Search</label>
                       <div className="relative w-full">
                           <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                           </div>
                        <input type="text" id="voice-search" className="w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search here for our products" required/>
                        </div>
                            <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
                            </button>
                   </form>
                <ul className="hidden xl:flex px-4  2xl:ml-40 mr-auto">

                  <li className="ml-20 mr-10"><a className="mr-8 font-medium hover:text-blue-500" href="#">Stories</a></li>
                  <li className="relative mr-16">
                    <a className="flex items-center font-medium hover:text-blue-500" href="#">
                      <span className="ml-5">About</span>
                    </a>
                    <div className="product-menu hidden absolute top-0 left-0 mt-24 -ml-64 pl-24 pr-16 pt-16 pb-24 bg-white rounded-lg z-50">
                      <div className="absolute top-0 left-0 ml-72 w-7 h-7 bg-white transform rotate-45 -translate-y-1/2"></div>
                      <div className="flex flex-wrap min-w-max -mx-4 lg:-mx-10">
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4 lg:px-10">
                          <div>
                            <h3 className="mb-4 text-xl font-heading font-medium">Smartphone</h3>
                            <ul className="w-full">
                              <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">View all</a></li>
                              <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Premium Phones</a></li>
                              <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Basic</a></li>
                              <li><a className="text-gray-400 hover:text-gray-500" href="#">Sale</a></li>
                            </ul>
                          </div>
                          <div className="w-40 mt-5 mb-7 border-b border-gray-100"></div>
                          <div className="w-full">
                            <h3 className="mb-4 text-xl font-heading font-medium">Tablet</h3>
                            <ul className="w-full">
                              <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">View all</a></li>
                              <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Premium Tablets</a></li>
                              <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">For Designers</a></li>
                              <li><a className="text-gray-400 hover:text-gray-500" href="#">Sale</a></li>
                            </ul>
                          </div>
                          <div className="w-40 mt-5 border-b border-gray-100"></div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4 lg:px-10">
                          <h3 className="mb-4 text-xl font-heading font-medium">Brand</h3>
                          <ul>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Apple iPhone</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Blackberry</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Google</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Huawei</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Nokia</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Oppo</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Samsung</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Sony</a></li>
                            <li><a className="text-gray-400 hover:text-gray-500" href="#">Xiaomi</a></li>
                          </ul>
                          <div className="w-40 mt-5 mb-7 border-b border-gray-100"></div>
                          <h3 className="mb-4 text-xl font-heading font-medium">System</h3>
                          <ul>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">iOS</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Android</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">View all</a></li>
                          </ul>
                          <div className="w-40 mt-5 border-b border-gray-100"></div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4 lg:px-10">
                          <h3 className="mb-4 text-xl font-heading font-medium">Accesories</h3>
                          <ul>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">View all</a></li>
                            <li><a className="text-gray-400 hover:text-gray-500" href="#">Watches</a></li>
                          </ul>
                          <div className="w-40 mt-5 mb-7 border-b border-gray-100"></div>
                          <h3 className="mb-4 text-xl font-heading font-medium">Computers</h3>
                          <ul>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Apple iMac</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Memory</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">PC</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Graphic Cards</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Monitors</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Hard Disk Drivers</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Cables</a></li>
                            <li className="mb-4"><a className="text-gray-400 hover:text-gray-500" href="#">Keyboards</a></li>
                            <li><a className="text-gray-400 hover:text-gray-500" href="#">Printers</a></li>
                          </ul>
                          <div className="w-40 mt-5 border-b border-gray-100"></div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4 lg:px-10">
                          <div className="relative flex items-end h-96 w-full rounded-lg bg-cover bg-no-repeat" style={{backgroundImage: `url('/uinel-assets/images/ecommerce-navigations/placehodler-right-banner.png')`}}>
                            <div className="mx-2 mb-5 px-2 py-4 bg-white rounded-lg">
                              <h4 className="text-xl font-heading font-medium leading-tight">Connected home</h4>
                            </div>
                          </div>
                          <div className="w-40 my-8 border-b border-gray-100"></div>
                          <a className="block py-5 px-2 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl" href="#">New brands</a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                {/* <div className="relative hidden xl:block">
                  <img className="absolute top-1/2 transform -translate-y-2/4 pl-6 mt-px" src="/uinel-assets/elements/navigations/search-gray-icon.svg" alt=""/>
                  <input className="rounded-4xl py-3 pl-12 pr-5 text-gray-300 font-heading font-medium text-base bg-blue-50 border-2 border-blueGray-100 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none" style={{width: 145+ "px"}}/>
                </div> */}
                
                <div className="hidden xl:flex items-center">
                  <a className="inline-block mr-10 text-gray-400 hover:text-gray-500" href="#">
                    <svg width="23" height="21" viewbox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4998 20.2059L2.70115 10.925C1.92859 10.1441 1.41864 9.13717 1.24355 8.04689C1.06847 6.95661 1.23713 5.83827 1.72563 4.8503V4.8503C2.09464 4.10439 2.63366 3.45781 3.29828 2.96383C3.9629 2.46985 4.73408 2.14261 5.5483 2.00908C6.36252 1.87555 7.19647 1.93955 7.98144 2.1958C8.7664 2.45205 9.47991 2.89322 10.0632 3.48296L11.4998 4.93554L12.9364 3.48296C13.5197 2.89322 14.2332 2.45205 15.0182 2.1958C15.8031 1.93955 16.6371 1.87555 17.4513 2.00908C18.2655 2.14261 19.0367 2.46985 19.7013 2.96383C20.3659 3.45781 20.905 4.10439 21.274 4.8503V4.8503C21.7625 5.83827 21.9311 6.95661 21.756 8.04689C21.581 9.13717 21.071 10.1441 20.2984 10.925L11.4998 20.2059Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </a>
                  <a className="relative inline-block text-gray-400 hover:text-gray-500" href="#">
                    <div className="absolute bottom-0 right-0 flex items-center justify-center -mb-4 -mr-4 w-6 h-6 text-sm text-white bg-blue-500 rounded-full">3</div>
                    <svg width="21" height="23" viewbox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.1159 8.72414H2.50427C1.99709 8.72414 1.58594 9.12657 1.58594 9.62299V21.308C1.58594 21.8045 1.99709 22.2069 2.50427 22.2069H18.1159C18.6231 22.2069 19.0342 21.8045 19.0342 21.308V9.62299C19.0342 9.12657 18.6231 8.72414 18.1159 8.72414Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M6.34473 6.34483V4.9569C6.34473 3.85259 6.76252 2.79352 7.5062 2.01265C8.24988 1.23179 9.25852 0.793106 10.3102 0.793106C11.362 0.793106 12.3706 1.23179 13.1143 2.01265C13.858 2.79352 14.2758 3.85259 14.2758 4.9569V6.34483" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </a>
                  <div className="flex-shrink-0 w-px h-12 bg-cyan-400 ml-9 mr-10"></div>
                  <a className="flex items-center  hover:text-blue-500" href="#">
                    <span className="font-medium hover:text-blue-500">Sona</span>
                    <img className="ml-5" src="/uinel-assets/elements/navigations/avatar-online.png" alt=""/>
                    <svg className="ml-4" width="8" height="5" viewbox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.97291 0.193232C7.20854 -0.0644107 7.58938 -0.0644107 7.82328 0.193232C8.05804 0.450875 8.05978 0.867141 7.82328 1.12478L4.42529 4.80677C4.19053 5.06441 3.81056 5.06441 3.57406 4.80677L0.176073 1.12478C-0.0586909 0.868102 -0.0586909 0.450875 0.176073 0.193232C0.411706 -0.0644107 0.792544 -0.0644107 1.02644 0.193232L4.00098 3.21284L6.97291 0.193232Z" fill="currentColor"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <button className="navbar-burger self-center xl:hidden">
                <svg width="25" height="16" viewbox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="25" height="2" fill="currentColor"></rect><rect y="14" width="25" height="2" fill="currentColor"></rect></svg>
              </button>
            </nav>
            <div className="navbar-menu hidden fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50">
              <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"></div>
              <nav className="relative flex flex-col py-20 px-12 md:pl-18 md:pr-16 h-full w-full bg-darkBlueGray-700 overflow-y-auto">
                <button className="navbar-close absolute top-5 p-6 right-5">
                  <svg width="14" height="13" viewbox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="13.495" y1="0.494975" x2="1.49498" y2="12.495" stroke="#326BFF" strokeWidth="1.4"></line><line x1="12.505" y1="12.495" x2="0.505026" y2="0.494976" stroke="#326BFF" strokeWidth="1.4"></line></svg>
                </button>
                <span className="mb-6 text-xs text-darkBlueGray-300 font-medium uppercase tracking-wider">Discover Uistore</span>
                <ul className="mb-20">
                  <li className="mb-2 md:mb-0"><a className="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">Products</a></li>
                  <li className="mb-2 md:mb-0"><a className="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">New in</a></li>
                  <li className="mb-2 md:mb-0"><a className="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">Sale</a></li>
                  <li className="mb-2 md:mb-0"><a className="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">Stories</a></li>
                  <li><a className="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">Contact</a></li>
                </ul>
                <ul className="mb-12 flex-1">
                  <li className="mb-5"><a className="text-xl text-blue-500 hover:text-blue-400 font-heading" href="#">Facebook</a></li>
                  <li className="mb-5"><a className="text-xl text-blue-500 hover:text-blue-400 font-heading" href="#">Instagram</a></li>
                  <li><a className="text-xl text-blue-500 hover:text-blue-400 font-heading" href="#">Twitter</a></li>
                </ul>
                <a className="block w-full py-4 px-10 text-lg text-white font-heading font-medium tracking-tighter text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl" href="#">Sign in</a>
              </nav>
            </div>
          </div>

        <div className="lg:px-16 border-b border-black border-opacity-20 mb-3">
        
        <div className="flex flex-wrap text-center lg:px-4 -mx-4 -mb-4 md:mb-0">
          <div className="w-full md:w-1/6 pb-3 pt-2 px-4 mb-4 md:mb-0 hover:font-medium hover:text-blue-500 hover:border-b-2 hover:border-blue-500 hover:pt-1 hover:pb-3"><a href="#" className=" ">Category1</a></div>
          <div className="w-full md:w-1/6 pb-3 pt-2 px-4 mb-4 md:mb-0 hover:font-medium hover:text-blue-500 hover:border-b-2 hover:border-blue-500 hover:pt-1 hover:pb-3"><a href="#" className=" ">Category2</a></div>
          <div className="w-full md:w-1/6 pb-2 pt-2 px-4 mb-4 md:mb-0 hover:font-medium hover:text-blue-500 hover:border-b-2 hover:border-blue-500 hover:pt-1 hover:pb-3"><a href="#" className=" ">Category3</a></div>
          <div className="w-full md:w-1/6 pb-2 pt-2 px-4 mb-4 md:mb-0 hover:font-medium hover:text-blue-500 hover:border-b-2 hover:border-blue-500 hover:pt-1 hover:pb-3"><a href="#" className=" ">Category4</a></div>
          <div className="w-full md:w-1/6 pb-2 pt-2 px-4 mb-4 md:mb-0 hover:font-medium hover:text-blue-500 hover:border-b-2 hover:border-blue-500 hover:pt-1 hover:pb-3"><a href="#" className=" ">Category5</a></div>
          <div className="w-full md:w-1/6 pb-2 pt-2 px-4 mb-4 md:mb-0 hover:font-medium hover:text-blue-500 hover:border-b-2 hover:border-blue-500 hover:pt-1 hover:pb-3"><a href="#" className=" ">Category6</a></div>
          
        </div>
      </div>


    </div>
  )
}

export default Header