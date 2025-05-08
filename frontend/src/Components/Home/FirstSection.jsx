import React from "react";
import { Link } from 'react-router-dom';
import home from '../../assets/5.png';


const FirstSection = () => {return(
    <div>
         <div className=' md:flex'>
        <div className='w-full  lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4xl lg:text-5xl tracking-[.1em] font-semibold text-yellow-100'>Discover Your Next
         Great Story</h1>
        <p className='mt-4 text-xl text-zinc-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam hic quo fuga maiores magni animi optio iste vero enim reiciendis? Maxime minima quas fugiat quod excepturi! Hic aperiam sequi adipisci!</p>
       <div className='mt-8 mb-8'>
         <Link to="/books" className='text-yellow-100 my-4 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc rounded-full'>
            Discover Books</Link>
            </div>
        </div>
        <div className='w-full  lg:w-3/6'>
        <img  className="h-full w-800 object-contain mx-auto"src={home} alt="home"/>

        </div>
        </div>
    </div>
)};

export default FirstSection;