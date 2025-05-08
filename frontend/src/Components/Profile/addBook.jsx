import axios from 'axios';
import React, { useState } from 'react';

const AddBook = () => {
    const [Data,setData]=useState({
        url:"",
        title:"",
        auther:"",
        price:"",
        desc:"",
        language:"",
    })
    const headers={
        id:localStorage.getItem("id"),
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const change=(e)=>{
        const {name,value}=e.target;
        setData({...Data,[name]:value})
    }
    const submit=async()=>{
        try{
            if(
                Data.url===""||
                Data.title==="" ||
                Data.auther===""||
                Data.desc===""||
                Data.language===""|| 
                Data.price===""

            )
            alert("All fields are Required!!")
            else {
                const res = await axios.post("http://localhost:3000/api/book/add-book",Data,{headers})
                setData({
                    url:"",
                    title:"",
                    auther:"",
                    price:"",
                    desc:"",
                    language:"",
                })
                alert(res.data.message)
            }
        }catch(err){
alert(err.response.data.message)
        }
    }
    return (
        <div>
                <h1 className="text-3xl text-yellow-100 text-center font-semibold tracking-[.1em]">Add Book</h1>
                <div className='p-4 rounded bg-zinc-800 flex flex-col gap-4 mt-4'>
                <label className='text-zinc-400'>Image</label>
                <input className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full"  type="text" placeholder='Image Url' value={Data.url} onChange={change} name="url" required/>

                  <label className='text-zinc-400'>Title</label>
                <input className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full"  type="text" placeholder='Title' value={Data.title} onChange={change} name="title" required/>
                <label className='text-zinc-400'>Author</label>
                <input className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full"  type="text" placeholder='Author' value={Data.auther} onChange={change} name="auther" required/>
                <div className='flex items-center justify-start gap-4'>
               <div className='flex flex-col gap-4 w-full'>
               <label className='text-zinc-400'>Language</label>
                <input className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full"  type="text" placeholder='Language' value={Data.language} onChange={change} name="language" required/>
               
               </div>
               <div className='flex flex-col gap-4 w-full'>
                <label className='text-zinc-400'>Price</label>
                <input  className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full" type="text" placeholder='Price' value={Data.price} onChange={change} name="price" required/>
                </div>
                    </div>  
                    <label className='text-zinc-400'>Description</label>
<textarea  className="bg-zinc-900 rounded outline-none p-2 w-full text-neutral-400" rows="5" name="desc" value={Data.desc} onChange={change} required placeholder='Description of the book '/>                  
              
<div className='flex items-center justify-center'>
        <button onClick={submit} className='font-semibold tracking-[.1em] w-3/6 text-neutral-300 bg-orange-800 p-2 rounded hover:bg-orange-700 transition-all duration-300'>Add Book</button>
        </div>
              
                </div>

                </div>
    );
};

export default AddBook;