import React , { useEffect } from 'react';
import Loader from '../Components/Loader/Loader';
import BookCard from '../Components/BookCard/BookCard';
import axios from 'axios'; // help with api calls

const AllBooks = () => {
    const [Data, setData] = React.useState();
    useEffect(() => {
        const fetchData = async () => {
           const res= await axios.get("http://localhost:3000/api/book/get-all-books");
        //    console.log(res.data.books); 
              setData(res.data.books);
            // console.log(!Data);
        }
fetchData();
    },[]);
    return (
<div className='bg-zinc-900 px-4 h-auto py-8'>
<h4 className=' text-3xl text-yellow-100 text-center font-semibold tracking-[.1em]'>All Books</h4>
            {!Data &&<div className='flex items-center justify-center my-8'> <Loader /></div>}
            <div className='my-6 mt-9 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 items-stretch justify-items-center'>
                {Data&& Data.map((book , i ) => (
                    <div key={i} className='w-full h-full'>
                        <BookCard data={book} />{" "}
                    </div>
                ))}
            </div>

</div>

    );
};

export default AllBooks;