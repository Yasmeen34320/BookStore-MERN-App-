import axios from "axios";
import react, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import BookCard from "../BookCard/BookCard";



const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    const headers = {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
 //   console.log(headers.Authorization);
useEffect(() => {
const fetchData = async () => {
    const res = await axios.get(`http://localhost:3000/api/favourite/get-favourite-books`, { headers });
//    for (let i = 0; i < res.data.data.length; i++) {
//         res.data.data[i].bookid = res.data.data[i]._id;
//       //  console.log("fav " + res.data);    
//         console.log("fav " + res.data.data[i].bookid);
//     }
    setFavourites(res.data.data);
};
    fetchData();
    
}, [favourites]);
    return (
    // <div className="text-neutral-300 bg-zinc-800 h-auto px-4 py-8">
    //     Favourites
    // </div>
    <div className='bg-zinc-900 px-4 h-auto py-4'>
        {favourites.length === 0 &&
        <div>
        
            <img src="/33.png" alt="empty fav" className="w-1/2 mx-auto mt-2 h-[50%]" />

            </div>
            }
        {favourites.length > 0 && <h4 className=' text-3xl text-yellow-100  font-semibold tracking-[.1em]'>Favourites</h4>}
       {!favourites &&<div className='flex items-center justify-center my-8'> <Loader /></div>}
            <div className='my-6 mt-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 items-stretch justify-items-center'>
                {favourites&& favourites.map((book , i ) => (
                    <div key={i} className='w-full h-full'>
                        <BookCard data={book} fav={true} />{" "}
                    </div>
                ))}
            </div>

</div>
);
};
export default Favourites;