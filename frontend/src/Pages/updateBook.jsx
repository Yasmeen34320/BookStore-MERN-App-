import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';

const UpdateBook = () => {
    const {id}=useParams();

    const headers={
        id:localStorage.getItem("id"),
        Authorization:`Bearer ${localStorage.getItem("token")}`,
        bookid:id
    }
    const change=(e)=>{
        const {name,value}=e.target;
        setPrev({...prevBook,[name]:value})
    }
    const navigate=useNavigate();
    const submit=async()=>{
        try{
            if(
                prevBook.url===""||
                prevBook.title==="" ||
                prevBook.auther===""||
                prevBook.desc===""||
                prevBook.language===""|| 
                prevBook.price===""

            )
            alert("All fields are Required!!")
            else {
                const res = await axios.post("http://localhost:3000/api/book/update-book",prevBook,{headers})
            
                alert(res.data.message)
                navigate('/books')
            }
        }catch(err){
alert(err.response.data.message)
        }
    }
    const [prevBook , setPrev]=useState({   url: "",
        title: "",
        auther: "",
        price: "",
        desc: "",
        language: ""
    });
    useEffect( ()=>{
        const fetchData = async () => {

        const res  = await axios.get(`http://localhost:3000/api/book/get-book-by-id/${id}`)
        setPrev(res.data.book);
        console.log(res.data)
        }
        fetchData();
    },[])
    return (<>
        {!prevBook&& <div className="flex items-center justify-center my-8"><Loader/></div>}
        {prevBook&& <div className='flex flex-col items-center mb-8'>
            <h1 className="my-8 text-3xl text-yellow-100 text-center font-semibold tracking-[.1em]">Update Book</h1>
            <div className='p-4 rounded bg-zinc-800 flex flex-col gap-4 mt-4 w-[60%]'>
            <label className='text-zinc-400'>Image</label>
            <input className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full"  type="text" placeholder='Image Url' value={prevBook.url} onChange={change} name="url" required/>

              <label className='text-zinc-400'>Title</label>
            <input className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full"  type="text" placeholder='Title' value={prevBook.title} onChange={change} name="title" required/>
            <label className='text-zinc-400'>Auther</label>
            <input className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full"  type="text" placeholder='Author' value={prevBook.auther} onChange={change} name="auther" required/>
            <div className='flex items-center justify-start gap-4'>
           <div className='flex flex-col gap-4 w-full'>
           <label className='text-zinc-400'>Language</label>
            <input className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full"  type="text" placeholder='Language' value={prevBook.language} onChange={change} name="language" required/>
           
           </div>
           <div className='flex flex-col gap-4 w-full'>
            <label className='text-zinc-400'>Price</label>
            <input  className="text-neutral-400 bg-zinc-900 rounded outline-none p-2 w-full" type="text" placeholder='Price' value={prevBook.price} onChange={change} name="price" required/>
            </div>
                </div>  
                <label className='text-zinc-400'>Description</label>
<textarea  className="bg-zinc-900 rounded outline-none p-2 w-full text-neutral-400" rows="5" name="desc" value={prevBook.desc} onChange={change} required placeholder='Description of the book '/>                  
          
<div className='flex items-center justify-center'>
    <button onClick={submit} className='font-semibold tracking-[.1em] w-3/6 text-neutral-300 bg-yellow-800 p-2 rounded hover:bg-yellow-700 transition-all duration-300'>Update Book</button>
    </div>
          
            </div>

            </div>}
            </>
       
    );
};

export default UpdateBook;