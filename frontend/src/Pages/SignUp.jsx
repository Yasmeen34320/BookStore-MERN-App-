import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [Values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        address:"",
    });
    const navigate=useNavigate();
    const change=(e)=>{ 
        const {name,value}=e.target;
        setValues((prev)=>({...prev,[name]:value}));

    };
    const submit=async (e)=>{ 
        e.preventDefault(); // <-- Prevent page refresh

        console.log("clicked");
        try{
            if(Values.username==="" || Values.email==="" || Values.password==="" || Values.address==="")
                alert("Please fill all the fields");    
            else{
                const res = await axios.post("http://localhost:3000/api/user/sign-up",Values);
                 console.log(res.data)
                if(res.data.message==="User created successfully"){
                    // alert("User created successfully");
                   
                   navigate("/Login");
            }else {
                console.log(res.data.message);
            }
        }
        }catch(err){
alert(err.response.data.message)        }
    };
    return (
<div className='bg-zinc-900 p-8 '>
   <div className='w-full md:w-[35%] bg-zinc-800 p-4 rounded  mx-auto flex flex-col justify-center  '>    
     <h1 className='tracking-[.1em] text-3xl text-yellow-100 font-semibold text-center'>Sign Up</h1>
    <form className='flex flex-col gap-4 mt-6 px-8'>
        <label className='tracking-[.1em] text-neutral-300'>Username</label>
        <input   name="username" required value={Values.username} onChange={change} type="text" placeholder='Username' className='p-2 rounded bg-zinc-900 text-zinc-500'/>
        <label className=' tracking-[.1em] text-neutral-300'>Email</label>

        <input   name="email" type="email" placeholder='Email' value={Values.email} onChange={change} className='p-2 rounded bg-zinc-900 text-zinc-500'/>
        <label className=' tracking-[.1em] text-neutral-300'>Password</label>
        <input   name="password" type="password" placeholder='Password' value={Values.password} onChange={change} className='p-2 rounded bg-zinc-900 text-zinc-500'/>
       <label className='tracking-[.1em] text-neutral-300'>Address</label>
        <textarea   name="address" rows="5" placeholder='Your Address' value={Values.address} onChange={change} className='p-2 rounded bg-zinc-900 text-zinc-100 mb-2'/>
        <div className='flex items-center justify-center'>
        <button className=' tracking-[.1em] w-3/6 text-neutral-300 bg-orange-800 p-2 rounded hover:bg-orange-700 transition-all duration-300' onClick={submit}>Sign Up</button>
        </div>
    </form>
    <div className='flex flex-col justify-center items-center '>
        <p className=' text-neutral-300 text-xl mt-4 mb-2 tracking-[.1em]'>Or</p>
        <p className=' tracking-[.1em] text-neutral-300'>Already have an account?
            <a href="/Login" className='mx-2 font-semibold text-orange-800 hover:text-orange-700 transition-all duration-300'><u> LogIn</u> </a>
        </p>
    </div>
    </div>

</div>

    );
};

export default Signup;