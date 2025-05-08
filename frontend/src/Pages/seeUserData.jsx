import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";

const SeeUserData = ({ userdivdata, userdiv, setuserDiv }) => {
    return (
        <>
            {/* Overlay */}
            <div className={`${userdiv} top-0 left-0 h-screen w-full bg-black bg-opacity-50 fixed z-40`} onClick={() => setuserDiv("hidden")}></div>

            {/* Modal */}
            <div className={`${userdiv} top-0 left-0 h-screen w-full flex flex-col items-center justify-center fixed z-50`}>
                <div className='bg-zinc-900 text-white rounded p-6 w-[80%] md:w-[50%] lg:w-[40%] shadow-lg relative'>
                    <div className='flex items-center justify-between mb-4'>
                        <h1 className='text-2xl font-semibold'>User Information</h1>
                        <button onClick={() => setuserDiv("hidden")} className="text-2xl text-red-500 hover:text-red-700">
                            <IoIosCloseCircle />
                        </button>
                    </div>
                    <div className='space-y-4'>
                        <label>Username: <span className='font-semibold ml-2'>{userdivdata.username}</span></label><br />
                        <label>Email: <span className='font-semibold ml-2'>{userdivdata.email}</span></label><br />
                        <label>Address: <span className='font-semibold ml-2'>{userdivdata.address}</span></label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SeeUserData;
