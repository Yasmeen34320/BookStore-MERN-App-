import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";


const SideBar = (data) => { 
    // /get-user
// console.log(data.data);

const dispatch = useDispatch();
const history=useNavigate();
const role = useSelector((state)=>state.auth.role)
return (
    //
<div className="w-[70%] md:w-full bg-zinc-800 px-4 py-4 flex flex-col gap-4 items-center justify-center"> 
    
    <img src={data.data.avatar}  alt="profile" className=" w-32 h-22 rounded-full  " />
    <h2 className="text-2xl text-neutral-300 ">{data.data.username}</h2>
    <p className="text-zinc-500">{data.data.email}</p>
    <div className="h-[1px] w-full mt-2 bg-zinc-400 block"></div>

    {role==="user" && 
    <>
    <Link to="/Profile" className="mt-2 text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rouned transition-all-duration-300">
Favourites
</Link>
<Link to="/Profile/OrderHistory" className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rouned transition-all-duration-300">
Order History
</Link>
<Link to="/Profile/settings" className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rouned transition-all-duration-300">
Settings
</Link>
    </>
    }
    {role==="admin" && 
     <>
     <Link to="/Profile" className="mt-2 text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rouned transition-all-duration-300">
 All Orders
 </Link>
 <Link to="/Profile/add-book" className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rouned transition-all-duration-300">
Add Book </Link>

     </>
    }

<button className="bg-zinc-900 mt-4 text-neutral-300 font-semibold flex items-center justify-center gap-4 w-full text-center hover:bg-zinc-800 rounded transition-all-duration-300"
onClick={()=>{
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id")
    localStorage.clear("token")
    localStorage.clear("role")
    history("/")
}}
>
    Log Out  <TbLogout />

    </button>
</div>)
};

export default SideBar;