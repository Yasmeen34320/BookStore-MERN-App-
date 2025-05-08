import React from 'react';
import { Link } from 'react-router-dom';
import { CiCircleRemove } from "react-icons/ci";
import axios from 'axios';
import { BsFillCartXFill } from "react-icons/bs";

const BookCard = ({data,fav,cart}) => {
    const headers={
        id:localStorage.getItem("id"),
        Authorization:`Bearer ${localStorage.getItem("token")}`,
        bookid:data._id,
    }
    // console.log(data);
     const removeFromFav = async () => {
                        const res = await axios.put(`http://localhost:3000/api/favourite/remove-book-from-favourite`,
                            {}, { headers }
                        );
                       // console.log(res.data);
                       
                       
                    };
                    const removeFromCart = async () => {
                        const res = await axios.put(`http://localhost:3000/api/cart/remove-book-from-cart/${data._id}`,
                            {}, { headers }
                        );
                       // console.log(res.data);
                       
                       
                    };
    return (
<>
<div className='w-full h-full text-center bg-zinc-800 text-neutral-300 rounded p-4 flex flex-col gap-4  hover:scale-105 transition-all duration-300'>
<Link to={`/view-book/${data._id}`}>

<div className='bg-zinc-900 rounded w-full flex items-center justify-center'>  
    <img src={data.url} alt="/" className=' h-[35vh] md:h-[30vh] w-30'/>
</div>
<h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
<p className='mt-4  text-zinc-400 font-semibold'>by {data.auther}</p>
<p className='mt-4 text-xl text-zinc-200 font-semibold'>$ {data.price}</p>
</Link>

{fav&& <button onClick={removeFromFav} className='text-4xl text-red-500 hover:text-red-700 '>    
    <CiCircleRemove />
    </button>}

    {cart&& <button onClick={removeFromCart} className='text-4xl hover:text-red-900 '>    
    <BsFillCartXFill />
    </button>}
</div>
</>
    )};

export default BookCard;