import React from 'react'

const DisplayProductsShort = () => {
  return (
    <>
              <div className="container bg-gray-100 py-12 px-4 mx-auto pb-10">
            <h2 className="mb-14 xl:mb-12 text-5xl xl:text-5xl font-heading font-medium text-center">Our Top Selling Products</h2>
            <div className="flex items-center">
             {/* > <a className="hidden md:block pr-6 hover:text-darkBlueGray-400" href="#" */}
                {/* <svg width="8" height="12" viewbox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.21015 10.4594C7.59661 10.8128 7.59661 11.3841 7.21015 11.7349C6.82369 12.0871 6.19929 12.0897 5.81282 11.7349L0.289847 6.63794C-0.0966174 6.28579 -0.0966173 5.71584 0.289847 5.36108L5.81282 0.264109C6.19785 -0.0880364 6.82369 -0.0880364 7.21015 0.264109C7.59662 0.617558 7.59662 1.18882 7.21015 1.53966L2.68073 6.00147L7.21015 10.4594Z" fill="currentColor"></path>
                </svg> */}
              {/* </a> */}
              <div className="flex flex-wrap -mx-3">
                <div className="w-full sm:w-1/2 xl:w-1/4 px-3 mb-6 xl:mb-0">
                  <div className="p-10 xl:px-9 xl:pt-24 xl:pb-12 h-full bg-white rounded-3xl ">
                    <a className="block mx-auto mb-8 xl:mb-20 max-w-max" href="#">
                      <img className="h-40 object-cover" src="/images/1.jpg" alt=""/>
                    </a>
                    <a href="#">
                      <p className="mb-4 text-xl leading-8 font-heading font-medium hover:underline">B01 Handloom cotton fabric length 71 cm width 38 cm</p>
                    </a>
                    <p className="flex items-center text-xl text-blue-500 font-heading font-medium tracking-tighter">
                      <span className="mr-2">Rs.</span>
                      <span>544.90</span>
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/4 px-3 mb-6 xl:mb-0">
                  <div className="p-10 xl:px-9 xl:pt-24 xl:pb-12 h-full bg-white rounded-3xl ">
                    <a className="block mx-auto mb-8 xl:mb-20 max-w-max" href="#">
                      <img className="h-40 object-cover" src="/images/2.jpg" alt=""/>
                    </a>
                    <a href="#">
                      <p className="mb-4 text-xl leading-8 font-heading font-medium hover:underline">B04 Handloom cotton fabric length 18 cm width 12 cm</p>
                    </a>
                    <p className="flex items-center text-xl text-blue-500 font-heading font-medium tracking-tighter">
                      <span className="mr-2">Rs.</span>
                      <span>44.90</span>
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/4 px-3 mb-6 sm:mb-0">
                  <div className="p-10 xl:px-9 xl:pt-24 xl:pb-12 h-full bg-white rounded-3xl 0">
                    <a className="block mx-auto mb-8 xl:mb-20 max-w-max" href="#">
                      <img className="h-40 object-cover" src="/images/3.jpg" alt=""/>
                    </a>
                    <a href="#">
                      <p className="mb-4 text-xl leading-8 font-heading font-medium hover:underline">B05 Handloom cotton fabric length 12cm width 23 cm</p>
                    </a>
                    <p className="flex items-center text-xl text-blue-500 font-heading font-medium tracking-tighter">
                      <span className="mr-2">Rs.</span>
                      <span>290.59</span>
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/4 px-3">
                  <div className="p-10 xl:px-9 xl:pt-24 xl:pb-12 bg-white h-full rounded-3xl ">
                    <a className="block mx-auto mb-8 xl:mb-20 max-w-max" href="#">
                      <img className="h-40 object-cover" src="/images/6.jpg" alt=""/>
                    </a>
                    <a href="#">
                      <p className="mb-4 text-xl leading-8 font-heading font-medium hover:underline">B03 Handloom cotton fabric length 12 cm width 23 cm</p>
                    </a>
                    <p className="flex items-center text-xl text-blue-500 font-heading font-medium tracking-tighter">
                      <span className="mr-2">Rs.</span>
                      <span>120.90</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* <a className="hidden md:block pl-6 hover:text-darkBlueGray-400" href="#">
                <svg width="8" height="12" viewbox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.289849 1.54064C-0.0966146 1.18719 -0.0966145 0.615928 0.28985 0.265087C0.676314 -0.087058 1.30071 -0.0896664 1.68718 0.265087L7.21015 5.36206C7.59662 5.71421 7.59662 6.28416 7.21015 6.63892L1.68718 11.7359C1.30215 12.088 0.676312 12.088 0.289848 11.7359C-0.0966159 11.3824 -0.0966159 10.8112 0.289848 10.4603L4.81927 5.99853L0.289849 1.54064Z" fill="currentColor"></path>
                </svg>
              </a> */}
            </div>
            <div className="md:hidden flex justify-center mt-20">
              <a className="mx-14 hover:text-darkBlueGray-400" href="#">
                <svg width="8" height="12" viewbox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.21015 10.4594C7.59661 10.8128 7.59661 11.3841 7.21015 11.7349C6.82369 12.0871 6.19929 12.0897 5.81282 11.7349L0.289847 6.63794C-0.0966174 6.28579 -0.0966173 5.71584 0.289847 5.36108L5.81282 0.264109C6.19785 -0.0880364 6.82369 -0.0880364 7.21015 0.264109C7.59662 0.617558 7.59662 1.18882 7.21015 1.53966L2.68073 6.00147L7.21015 10.4594Z" fill="currentColor"></path>
                </svg>
              </a>
              <a className="mx-14 hover:text-darkBlueGray-400" href="#">
                <svg width="8" height="12" viewbox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.289849 1.54064C-0.0966146 1.18719 -0.0966145 0.615928 0.28985 0.265087C0.676314 -0.087058 1.30071 -0.0896664 1.68718 0.265087L7.21015 5.36206C7.59662 5.71421 7.59662 6.28416 7.21015 6.63892L1.68718 11.7359C1.30215 12.088 0.676312 12.088 0.289848 11.7359C-0.0966159 11.3824 -0.0966159 10.8112 0.289848 10.4603L4.81927 5.99853L0.289849 1.54064Z" fill="currentColor"></path>
                </svg>
              </a>
            </div>
          </div>
    </>
  )
}

export default DisplayProductsShort