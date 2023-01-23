import Link from 'next/link'
import Header from '../template/header'
import CartItem from '../../components/CartItem'
import Footer from '../template/footer'
const axios = require("axios");
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { API_URL } from "../../config/constants";
import { round} from 'mathjs';
import EmptyCart from '..//../public/lottie/empty_cart.json';
import Lottie from "react-lottie-player";
import { Fragment, useState, useEffect, useRef } from "react";

const Index = () => {

  const ref = useRef(null);
  const [studentid,setStudentId] = useState(StudentData().ID);
  const [productdetails,setProductDetails] = useState();
  const [carttotal,setcarttotal]= useState();
  const [cartcount,setCartCount]=useState();


  useEffect(() => {
    // if (isStudentLoggedIn() !== true) {
    //   router.push("/login?refer=/Cart");
    // }
   if(!productdetails){
    axios
    .post(API_URL+"/cart/display_cart.php",{
      s_id:studentid,
    })

    .then(function (response) {
      // console.log(response?.data?.data);
      setcarttotal(response?.data?.carttotal[0]?.total)
      setProductDetails(response?.data?.data); 
      setCartCount(response?.data?.total); 
  
    })
    .catch(function (error) {   
      console.log(error);
    });

   }
    


  },[productdetails]);

  const AddToCheckoutList = () => {
  
    axios
    .post(API_URL+"/checkout/checkout.php" ,
    {
      studentid : studentid,
    })
    .then(function (response) {
       if(response) {
          //  router.push('/Cart')
       }
      
      
    })
    .catch(function (error) {   
      console.log(error);
    });
  }

  return (
    <>
       <Header/>

       <section className="lg:px-12 px-4 pt-12 pb-24 overflow-hidden bg-gray-100">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap -mx-4 mb-14 xl:mb-24">
              <div className="w-full md:w-8/12 xl:w-9/12 px-4 mb-14 md:mb-0">
                <div className="py-6 px-8 md:px-12 bg-white rounded-3xl"> 
                 <h1 className="text-center pb-2 text-left text-3xl xl:text-5xl font-heading font-medium">Your cart</h1>
                  {carttotal>0? (<span className="inline-block mb-4 text-darkBlueGray-300 font-medium">{cartcount} products</span>):""}
                  <div className="xl:px-10">

                  {productdetails
            ? productdetails.map((productdetails,key) => (

              <div key={productdetails.ID}>
              <CartItem quantity={productdetails?.Quantity}  id={productdetails?.ProductID} cost={productdetails?.Price} URL={productdetails?.URL} title ={productdetails?.ProductName} />
              </div>

              ))
            : ""}
            <div className="hidden w-1/6 text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><button>Empty Cart</button></div>
                  </div>
                </div>
                {cartcount>0 ? "" : ( <>
                <Lottie ref={ref} background="transparent" animationData={EmptyCart} speed="1" loop={10} play style={{ position: "relative", top: 0, left: 0, zIndex: "30", width: "100%", height: "50vh" }} />
                <div className="flex items-center justify-center lg:space-x-5 px-8  bg-white rounded-3xl">
                   <h1 className="mb-7 lg:pl-24 md:mt-6 lg:text-3xl md:text-xl md:pt-0 pt-4 text-lg font-heading font-medium">No items in your cart at the moment.
                  </h1>
                
                <div className='justify-center items-center flex'>
                <Link href='/ProductsPage'>
                <button className='md:block hidden lg:ml-5 md:ml-10  bg-blue-500  hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-xl'>
                  View our products
                </button>
                </Link>
                <button className='md:hidden block  lg:ml-5 md:ml-10  bg-blue-500  hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-xl'>
                  Add Products
                </button>
                </div>
               
                </div>
                </>
                
                )}
              </div>
              <div className="w-full md:w-4/12 xl:w-3/12 px-4">
                <div className="mb-14">
                  <h2 className="mb-7 pl-24 md:mt-6 text-3xl font-heading font-medium">Cart total</h2>
                  <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                    <span>Subtotal</span>
                    <span className="flex items-center text-xl">
                      <span className="mr-2 text-base">Rs.</span>
                      {carttotal>0? (<span>{carttotal}</span>):(<span>0</span>)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                    <span>Shipping</span>
                    <span className="flex items-center text-xl">
                      <span className="mr-2 text-base">Rs.</span>
                      {carttotal>0? (<span>{round(0.1*carttotal)}</span>):(<span>0</span>)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4 px-10 mb-6 leading-8 bg-white font-heading font-medium rounded-3xl">
                    <span>Total</span>
                    <span className="flex items-center text-xl text-blue-500">
                      <span className="mr-2 text-base">Rs.</span>
                      {carttotal>0? (<span>{round(1.1*carttotal)}</span>):(<span>0</span>)}
                    </span>
                  </div>
                  <div onClick={()=> AddToCheckoutList()}><Link href="/Checkout"><a className="inline-block w-full lg:ml-20 lg:w-auto py-2 px-10 text-xl leading-6 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" href="#">Checkout</a></Link></div>
                </div>
                <div className="text-center md:text-left">
                  <img className="block mb-9 mx-auto md:ml-0" src="uinel-assets/images/ecommerce-cart/procents.svg" alt=""/>
                  <h4 className="mb-5 text-5xl font-heading font-medium">Shipping</h4>
                  <p className="lg:pr-10 text-lg text-darkBlueGray-300">The nulla commodo, commodo eros.</p>
                </div>
              </div>
            </div>
            <div className="md:w-96"><a className="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" href="#">Back to shop</a></div>
          </div>
        </section>
        <Footer/>
        
    </>
  )
}


export default Index