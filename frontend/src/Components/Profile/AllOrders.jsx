import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from '../../Pages/seeUserData';

const AllOrders = () => {
    const headers={
        id:localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    
    }
    const [allOrders,setAllOrders]=useState();
    const [options,setOptions]=useState(-1)
    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get("http://localhost:3000/api/order/get-all-orders",{headers})
       console.log(res.data.userData)
       setAllOrders(res.data.userData)
        }
        fetch()
    },[allOrders])
    const [values,setValues]=useState({status:""})
    const setOptionsButton=(i)=>{
        setOptions(i);
    }
    const change=(e)=>{
        const {value}=e.target;
        setValues({status:value})
    }
    const submitChanges=async(i)=>{
        const id = allOrders[i]._id;
        const res = await axios.put(`http://localhost:3000/api/order/update-status/${id}`,values,{headers})

    }
    const [userdiv,setuserDiv]=useState("hidden");

    const [userdivdata,setuserDivData]=useState();

    return (
       <>
       {!allOrders&&<>
        <div className='flex items-center justify-center my-8'> <Loader /></div>
       
       </>}
       {allOrders && allOrders.length > 0 &&
   <>
 <h4 className=' text-3xl text-yellow-100  font-semibold tracking-[.1em]'>Order History</h4>
<div className="bg-zinc-800 rounded px-4 py-12 h-auto flex  justify-around gap-4 mt-4">
    <table className="w-full text-left">
        <thead>
            <tr className=" text-zinc-100 font-semibold  tracking-[.1em]">
                <th className="w-[3%]  px-2 text-xs sm:text-sm md:text-base py-2"> ID</th>
                <th className="w-[22%] px-2 text-xs sm:text-sm md:text-base  py-2">Title</th>
                <th className="w-[40%]  px-2 text-xs sm:text-sm md:text-base py-2">Description</th>
                <th className="w-[9%]  px-2 text-xs sm:text-sm md:text-base py-2">Price</th>
                <th className="w-[16%] px-2 text-xs sm:text-sm md:text-base  py-2">Status</th>
                <th className="w-[5%] px-2 text-xs sm:text-sm md:text-base  py-2">
                <FaUser />

                </th>

            </tr>
           {allOrders&& allOrders.map((order, index) => (
                <tr key={index} className="border-b border-zinc-600 text-zinc-400 hover:bg-zinc-700 hover:cursor-pointer font-semibold ">  
                    <td className="px-2 py-2  text-xs sm:text-sm md:text-base w-[3%]">{index+1}</td>
                    <td className="px-2 py-2  text-xs sm:text-sm md:text-base hover:text-blue-300 hover:underline w-[22%]">
                        <Link to={`/view-book/${order.book._id}`} >{order.book.title}</Link>
                        
                        </td>
                    <td className="w-[45%] px-2  text-xs sm:text-sm md:text-base  py-2">{order.book.desc.slice(0,50)}</td>
                    <td className="w-[9%]  px-2 text-xs sm:text-sm md:text-base  py-2">${order.book.price}</td>
                    <div className='flex flex-col'>
                      <button className='hover:scale-105 transition-all duration-300' onClick={()=>setOptionsButton(index)}>
                        {order.status === "Order Placed" || order.status=="Out for Delivery" ? (              
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
                        </button>
                        
                        <div className={`flex justify-between gap-2 mb-4 ${options===index?"block":"hidden"}`}>
                   <select name="status" value={values.status} className='bg-gray-800  px-2 py-2 text-xs sm:text-sm md:text-base' onChange={change}>
                     {
                        ['Order Placed', 'Out for Delivery', 'Delivered',
                             'Cancelled'].map((items,i)=>(
                                <option value={items} key={i}>
                                    {items}
                                </option>
                             ))

                     }
                   </select>
                   <button className='text-green-500 hover:text-red-500' onClick={()=>{
                    setOptions(-1)
                    submitChanges(index)
                   }}>
                   <FaCheckCircle />

                   </button>
                   </div>
                        </div>
                    <td className="w-[5%]  px-2 text-xs sm:text-sm md:text-base  py-2">

                        <button className='text-xl hover:text-orange-700'
                        onClick={()=>{
                            setuserDiv("fixed")
                            setuserDivData(order.user);
                        }}
                        >
                        <IoOpenOutline />
  
                        </button>
                    </td>

                                      </tr>
            )) }  
        </thead>
        </table>
</div>

 </>
 }
 {userdivdata&&(
    <SeeUserData 
    userdivdata={userdivdata}
    userdiv={userdiv}
    setuserDiv={setuserDiv}
    />
)}
       </>
    );
};

export default AllOrders;