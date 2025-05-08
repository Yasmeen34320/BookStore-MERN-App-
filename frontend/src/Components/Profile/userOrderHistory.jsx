import axios from "axios";
import react, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";



const UserOrderHistory = () => {
    const headers={
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    const [orderHistory, setOrderHistory] = useState();   
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3000/api/order/get-order-oftheuser`, { headers });
           console.log("orders is " + res.data.data);
           setOrderHistory(res.data.data);
        };
        fetchData();    
    }, []);
    return (
    
   <>
       <div className='bg-zinc-900 px-2 h-auto py-4'>

   {!orderHistory &&  <div className='flex items-center justify-center my-8'> <Loader /></div>}
  
   {orderHistory && orderHistory.length > 0 &&
   <>
 <h4 className=' text-3xl text-yellow-100  font-semibold tracking-[.1em]'>Order History</h4>
<div className="bg-zinc-800 rounded px-4 py-12 h-auto flex  justify-around gap-4 mt-4">
    <table className="w-full text-left">
        <thead>
            <tr className=" text-zinc-100 font-semibold  tracking-[.1em]">
                <th className="w-[3%]  px-2 text-xs sm:text-sm md:text-base py-2"> ID</th>
                <th className="w-[22%] px-2 text-xs sm:text-sm md:text-base  py-2">Book Title</th>
                <th className="w-[45%]  px-2 text-xs sm:text-sm md:text-base py-2">Description</th>
                <th className="w-[9%]  px-2 text-xs sm:text-sm md:text-base py-2">Price</th>
                <th className="w-[16%] px-2 text-xs sm:text-sm md:text-base  py-2">Status</th>
            </tr>
           {orderHistory&& orderHistory.map((order, index) => (
                <tr key={index} className="border-b border-zinc-600 text-zinc-400 hover:bg-zinc-700 hover:cursor-pointer font-semibold ">  
                    <td className="px-2 py-2  text-xs sm:text-sm md:text-base w-[3%]">{index+1}</td>
                    <td className="px-2 py-2  text-xs sm:text-sm md:text-base hover:text-blue-300 hover:underline w-[22%]">
                        <Link to={`/view-book/${order.book._id}`} >{order.book.title}</Link>
                        
                        </td>
                    <td className="w-[45%] px-2  text-xs sm:text-sm md:text-base  py-2">{order.book.desc.slice(0,50)}</td>
                    <td className="w-[9%]  px-2 text-xs sm:text-sm md:text-base  py-2">${order.book.price}</td>
                        {order.status === "Order Placed" ? (              
                            <td className="w-[16%] px-2 py-2 text-xs sm:text-sm md:text-base text-green-500">
                                {order.status}
                            </td>
                        ): (order.status === "Cancelled" ? (
                            <td className="w-[16%] px-2 py-2 text-xs sm:text-sm md:text-base text-red-500">
                                {order.status}
                            </td>
                        ) : (
                            <td className="w-[16%] px-2 py-2 text-xs sm:text-sm md:text-base text-yellow-500">
                                {order.status}
                            </td>
                        )

                        )}
                                      </tr>
            )) }  
        </thead>
        </table>
</div>
 </>
 }
   {orderHistory&&orderHistory.length === 0 &&
        <div>
         <h4 className=' text-3xl text-zinc-500 text-center font-semibold tracking-[.1em]'>
            No Order History
            </h4>
            <img src="/33.png" alt="empty fav" className="w-1/2 mx-auto mt-2 h-[50%]" />

            </div>
            }


            </div>
  
   </>
    
);
};
export default UserOrderHistory;