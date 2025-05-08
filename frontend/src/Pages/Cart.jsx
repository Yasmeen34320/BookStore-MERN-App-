import axios from "axios";
import react, { useEffect, useState } from "react";
import Loader from "../Components/Loader/Loader";
import BookCard from "../Components/BookCard/BookCard";
import { useNavigate } from "react-router-dom";



const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [TotalPrice, setTotalPrice] = useState(0);
    const headers = {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
   // console.log(headers.Authorization);
useEffect(() => {
const fetchData = async () => {
    const res = await axios.get(`http://localhost:3000/api/cart/get-books-in-cart`, { headers });
//    for (let i = 0; i < res.data.data.length; i++) {
//         res.data.data[i].bookid = res.data.data[i]._id;
//       //  console.log("fav " + res.data);    
//         console.log("fav " + res.data.data[i].bookid);
//     }
setCartData(res.data.data);
};
    fetchData();
    
}, [cartData]);

useEffect(() => {
    if(cartData.length === 0) return; // Avoid calculating total if cart is empty
    if(cartData){   
    let total = 0;
        cartData.forEach((book) => {
            total += book.price; // Assuming each book has a 'price' property
        });
        setTotalPrice(total);
        total = 0;
    }
},[cartData])
const navigate =useNavigate();
const placeOrder = async () => {
    /**
     * 
     * order 
     * place-order 
     *   const {id}=req.headers;
        const {order}=req.body; 

     */
try{
    const res = await axios.post(`http://localhost:3000/api/order/place-order`, {order:cartData}, { headers });
  alert(res.data.message);
  navigate("/profile/OrderHistory");  
    console.log(res.data);

}catch(err){    
console.log(err);
}

}
    return (
    // <div className="text-neutral-300 bg-zinc-800 h-auto px-4 py-8">
    //     Favourites
    // </div>
    <div className='bg-zinc-900 px-4 h-auto py-4'>
        {cartData.length === 0 && 
        <div>
        <h4 className=' text-3xl text-zinc-500 text-center font-semibold tracking-[.1em]'>
            No Books in the Cart
            </h4>
            <img src="/2.png" alt="empty cart" className="w-1/3 mx-auto mt-2 h-[50%]" />
            </div>}
        {cartData.length > 0 && <h4 className=' text-3xl text-yellow-100 text-center font-semibold tracking-[.2em]'>Cart</h4>}
       {!cartData &&<div className='flex items-center justify-center my-8'> <Loader /></div>}
            <div className='my-6 mt-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 items-stretch justify-items-center'>
                {cartData&& cartData.map((book , i ) => (
                    <div key={i} className='w-full h-full'>
                        <BookCard data={book} cart={true} />{" "}
                    </div>
                ))}


            </div>
{cartData&& cartData.length > 0 &&
<div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 mb-8">  
 <div className="w-full md:w-1/2 bg-zinc-800 rounded px-4 py-8  flex flex-col  justify-around gap-4" >
    <h4 className=' text-3xl text-yellow-100 text-center font-semibold tracking-[.2em] mt-0'>Total Amount</h4>
    <div className="flex justify-center items-center font-semibold text-xl text-zinc-400 gap-12">
    <p>
        {cartData.length} books
    </p>
    <p>
         $  {TotalPrice.toFixed(2)}
    </p>

    </div>
    <div className="flex justify-center items-center">
        <button onClick={placeOrder} className="bg-yellow-100 w-1/3 text-zinc-900 font-semibold text-xl px-4 py-2 rounded-full hover:bg-yellow-200 transition duration-300 ease-in-out tracking-[.1em]">
            Checkout
        </button>
    </div>
    </div>.
    </div>
    }
</div>
);
};
export default Cart;