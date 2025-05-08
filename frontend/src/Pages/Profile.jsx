import React, { useEffect, useState } from 'react';
import SideBar from '../Components/Profile/sideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../Components/Loader/Loader';

const Profile = () => {
//    const isLoggedIn= useSelector((state) => {
//         console.log(state.auth.isLoggedIn);
//         return state.auth.isLoggedIn;
//     });
const [Profile,setProfile]= useState({});
    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch=async()=>{
            const res = await axios.get("http://localhost:3000/api/user/get-user",{headers});
            console.log(res.data.data);
                setProfile(res.data.data);
        }
        fetch();
    }, []);

    return (
<div className='bg-zinc-900 px-4 h-auto py-8 flex flex-col md:flex-row gap-4'>
{!Profile&&<div className='flex items-center justify-center my-8'> <Loader /></div>}
{Profile&&<>
<div className='w-full lg:w-1/6 flex justify-center'>
    <SideBar data={Profile}/>
</div>
<div className='w-full lg:w-5/6'>
    <Outlet/>
    </div> 
</>   }

</div>
    )};

export default Profile;