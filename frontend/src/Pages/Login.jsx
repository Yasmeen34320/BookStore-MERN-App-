import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
const Login = () => {
      const [Values,setValues]=useState({
            username:"",
            password:"",
        });
        const navigate=useNavigate();
        const dispatch= useDispatch();
        const change=(e)=>{ 
            const {name,value}=e.target;
            setValues((prev)=>({...prev,[name]:value}));
    
        };
        const submit=async (e)=>{ 
            e.preventDefault(); // <-- Prevent page refresh

            console.log("clicked");
            try{
                if(Values.username==="" || Values.password==="")
                    alert("Please fill all the fields");    
                else{
                    const res = await axios.post("http://localhost:3000/api/user/login",Values);
console.log(res.data)
                    if(res.data.message==="Login successful"){
                        // alert("User created successfully");
                        dispatch(authActions.login());
                        dispatch(authActions.changeRole(res.data.user.role));
                        localStorage.setItem("token",res.data.user.token);
                        localStorage.setItem("role",res.data.user.role);    
                        localStorage.setItem("id",res.data.user.id);

                        navigate("/");
                }else {
                    console.log(res.data.message);
                }
            }
            }catch(err){
                alert(err.response.data.message)     
               }
            
        };
    return (
<div className='bg-zinc-900 p-8 '>
   <div className='w-full md:w-[35%] bg-zinc-800 p-4 rounded  mx-auto flex flex-col justify-center  '>    
     <h1 className='tracking-[.1em] text-3xl text-yellow-100 font-semibold text-center'>Log In</h1>
    <form className='flex flex-col gap-4 mt-6 px-8'>
        <label className='tracking-[.1em] text-neutral-300'>Username</label>
        <input name="username" value={Values.username}  onChange={change} type="text" placeholder='Username' className='p-2 rounded bg-zinc-900 text-zinc-500'/>

        <label className=' tracking-[.1em] text-neutral-300'>Password</label>
        <input value={Values.password} name="password" onChange={change} type="password" placeholder='Password' className='p-2 rounded bg-zinc-900 text-zinc-500'/>
        <div className='flex items-center justify-center'>
        <button onClick={submit} className=' tracking-[.1em] w-3/6 text-neutral-300 bg-orange-800 p-2 rounded hover:bg-orange-700 transition-all duration-300'>Log In</button>
        </div>
    </form>
    <div className='flex flex-col justify-center items-center '>
        <p className=' text-neutral-300 text-xl mt-4 mb-2 tracking-[.1em]'>Or</p>
        <p className=' tracking-[.1em] text-neutral-300'>Don't have an account?
            <a href="/Signup" className='mx-2 font-semibold text-orange-800 hover:text-orange-700 transition-all duration-300'><u> SignUp</u> </a>
        </p>
    </div>
    </div>

</div>
    );
};

export default Login;