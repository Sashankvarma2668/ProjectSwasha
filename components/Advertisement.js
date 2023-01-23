import React from 'react'
import Link from 'next/link'

const Advertisement = () => {
  return (
    <>
             <div className="">
            <div className="relative py-24 xl:pb-24 overflow-hidden xl:pt-10">
              <img className="top-0 w-full h-full object-cover absolute" src="https://images.unsplash.com/photo-1608865413608-6cfd1fc622b3?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixid=MnwzMzIzMzB8MHwxfHNlYXJjaHwxMXx8ZGl3YWxpfGVufDB8MHx8fDE2NTk5NTQ3NDI&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1920" alt=""/>
              <div className="relative container px-4 pt-12  mx-auto">
                <div className="px-10 w-full md:w-2/3 lg:w-2/3 mb-24 xl:mb-0">
                  <span className="block mb-9 pl-2 font-medium tracking-widest uppercase text-xs text-gray-200">Get 20% off card</span>
                  <h1 className="font-heading font-medium text-gray-100 text-6xl h-96 md:text-10xl lg:text-8xl leading-tight">Nirmaan Diwali Dhamaaka</h1>
                  <div className=''>
                  <Link href='/ProductsPage'><a className="inline-block py-2 px-5 w-full md:w-auto md:mr-6 md:mb-5 sm:mb-8 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl " href="#">Shop now</a></Link>
                  <a className="inline-block py-2 px-10 mt-4 md:mt-0 w-full md:w-auto leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white focus:ring-2 focus:ring-gray-100 focus:ring-opacity-50 hover:bg-gray-100 rounded-xl" href="https://nirmaan.org/">About Us</a>
                  </div>
                </div>
                <div className="relative text-center z-20">
                  <a className="inline-block xl:-mt-20 transform hover:scale-90 transition duration-200" href="#">
                    
                  </a>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Advertisement