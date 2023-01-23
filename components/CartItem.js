import React from 'react'
import { useState,useEffect } from 'react'
const axios = require("axios");
import { isStudentLoggedIn, StudentData } from "../utils/Student";
import { API_URL } from "../config/constants";
import { useRouter } from "next/router";


const CartItem = (props) => {
  const [studentid,setStudentId] = useState(StudentData().ID);
  const router = useRouter();
 
  const [quantity,setQuantity]=useState(props.quantity);
  
  // useEffect(() => {
  
   
    // axios
    // .post(API_URL+"/cart/update_cart_quantity.php",{
    //   quantity  : quantity,
    //   studentid : studentid,
    //   productid : 
    // })
    // .then(function (response) {

   
  
    // })
    // .catch(function (error) {   
    //   console.log(error);
    // });



  // });

  const deleteCartItem = (id) => {
  
    axios
    .post(API_URL+"/cart/delete_cart.php" ,
    {
      productid : id,
      studentid : studentid,
    })
    .then(function (response) {
      if(response){
        location.reload()
      }
      
      
    })
    .catch(function (error) {   
      console.log(error);
    });
  }

  const update_cart_quantity = (value,id) =>{
    
    setQuantity(value);
    var producttotal=props.cost*value;
    axios
    .post(API_URL+"/cart/update_cart_quantity.php",{
      quantity  : value,
      studentid : studentid,
      productid : id,
      producttotal : producttotal,
    })
    .then(function (response) {

      if(response){
        location.reload()
      }


  
    })
    .catch(function (error) {   
      console.log(error);
    });


  }


  return (
    
    <div>
  
                        <div className="relative flex flex-wrap items-center bg-gray-100 xl:justify-between -mx-4 mb-8 pb-8 border pt-8 border-black border-opacity-80">
                      <div className="relative w-full md:w-auto px-4 mb-6 xl:mb-0">
                        
                        <a className="block mx-auto max-w-max" href="#">
                          <img className="h-28 object-cover" src={props.URL} alt=""/>
                        </a>
                      </div>
                      <div className="w-full md:w-auto px-4 mb-6 xl:mb-0">
                        <a className="block mb-5 text-xl font-heading font-medium hover:underline" href="#">{props.title}</a>
                        <div className="flex flex-wrap">
                          <p className="mr-4 text-sm font-medium">
                            <span className="font-heading">Color:</span>
                            <span className="ml-2 text-gray-400">{props.color}</span>
                          </p>
                          <p className="text-sm font-medium">
                            <span>Size: </span>
                            <span className="ml-2 text-gray-400">{props.size}</span>
                          </p>
                        </div>
                      </div>
                      <div className="w-full xl:w-auto px-4 mb-6 xl:mb-0 mt-6 xl:mt-0">
                        <div className="lg:ml-0 md:ml-16 flex items-center">
                          <h4 className="mr-4 font-heading font-medium">Qty:</h4>
                          <input value={quantity} onChange={(e) => (update_cart_quantity(e.target.value,props.id))} className="w-16 px-3 py-2 text-center placeholder-gray-400 text-black bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="number" />
                          <button onClick={()=> deleteCartItem(props.id)} className='lg:ml-5 md:ml-10 ml-5 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'> Delete </button>
                        </div>
                      </div>
                      <div className="w-full xl:w-auto px-4">
                        <span className="text-xl font-heading font-medium text-blue-500">
                          <span className="text-sm">Rs.</span>
                          <span>{props.cost}</span><br/>


                        
                          
                       
                      
                        </span>
                      </div>

                    </div>
      
    </div>
  )
}

export default CartItem
