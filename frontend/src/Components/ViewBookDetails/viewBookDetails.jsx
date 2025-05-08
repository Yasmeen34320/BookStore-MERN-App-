import React , {useEffect,useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'; // help with api calls
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { IoHeartOutline,IoHeartSharp ,IoCartOutline,IoCart} from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
    const {id}= useParams();
    console.log(id);
    const [Data, setData] = React.useState(null);
    const [userData, setUserData] = React.useState(null);

    const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn);
    const role =useSelector((state)=>state.auth.role);
    console.log(isLoggedIn);
    console.log(role);
    useEffect(() => {
        const fetchData = async () => {
           const res= await axios.get(`http://localhost:3000/api/book/get-book-by-id/${id}`);
          console.log(res.data.book); 
            setData(res.data.book);
             const res1 = await axios.get(`http://localhost:3000/api/user/get-user`,{headers});
             console.log(res1.data.data);
                setUserData(res1.data.data);
        }
fetchData();
    },[id]);
    const headers={
       id:localStorage.getItem("id"),
        Authorization:`Bearer ${localStorage.getItem("token")}`,
        bookid:id,
    }
    const inFav = userData && userData.favorites && userData.favorites.includes(headers.bookid);
    const inCart = userData && userData.cart && userData.cart.includes(headers.bookid); 
  console.log(userData)
    console.log("in Fav " +inFav);
    console.log("inCart "+inCart);
    console.log(headers.Authorization);
    const addToFav = async () => {
        const res= await axios.put(`http://localhost:3000/api/favourite/add-book-to-favourite`,
            {},{headers}
        );
       
        console.log(res.data);
        if(res.data.message=="Book added to favourites list"){
            //alert("Added to Favourites");
            setUserData((prev) => ({
                ...prev,
                favorites: [...prev.favorites, headers.bookid],
            }));        }else{
                const removeFromFav = async () => {
                    const res = await axios.put(`http://localhost:3000/api/favourite/remove-book-from-favourite`,
                        {}, { headers }
                    );
                    console.log(res.data);
                    if (res.data.message === "Book removed from favourites list") {
                        // alert("Removed from Favourites");
                        setUserData((prev) => ({
                            ...prev,
                            favorites: prev.favorites.filter((bookId) => bookId !== headers.bookid),
                        }));
                    } else {
                        alert("Error removing from Favourites");
                    }
                };
                removeFromFav();
            // alert("Already in Favourites");
        }
    }
    const addToCart = async () => {
        const res= await axios.put(`http://localhost:3000/api/cart/add-book-to-cart`,
            {},{headers}
        );
        console.log(res.data);
        if(res.data.message=="Book added to cart "){
            //alert("Added to Cart");
            setUserData((prev) => ({
                ...prev,
                cart: [...prev.cart, headers.bookid],
            }));
                }else{
                    const removeFromCart = async () => {
                        const res = await axios.put(`http://localhost:3000/api/cart/remove-book-from-cart/${id}`,
                            {}, { headers }
                        );
                        console.log(res.data);
                        if (res.data.message === "Book removed from cart list") {
                        //    alert("Removed from Cart");
                            setUserData((prev) => ({
                                ...prev,
                                cart: prev.cart.filter((bookId) => bookId !== headers.bookid),
                            }));
                        } else {
                            alert("Error removing from Cart");
                        }
                    };
                    removeFromCart();
            // alert("Already in Cart");
        }
    }  
    const navigate=useNavigate(); 
    const deleteBook=async()=>{
        const res = await axios.delete("http://localhost:3000/api/book/delete-book",{headers})
        alert(res.data.message)
        navigate('/books')
    }


    if (!Data) return <div className="flex items-center justify-center my-8"><Loader/></div>;

    return (
        
    <div className="px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row  justify-center h-auto">
        <div className="w-full lg:w-3/6 bg-zinc-800 rounded px-4 py-12 h-[88vh] flex  justify-around gap-4" >
            <img src={Data.url} alt="/" className="h-[70vh]" />
       {isLoggedIn && role==="user" && (
         <div className="flex flex-col gap-4  mt-4 ">
         <button className="bg-white rounded-full text-3xl p-2 " onClick={addToFav}>
        {inFav ? <IoHeartSharp /> : <IoHeartOutline />}
         {/* <IoHeartOutline /> */}
         {/* <IoHeartSharp /> */}

         </button>
         <button className="bg-white rounded-full text-3xl p-2" onClick={addToCart}>
           {inCart ? <IoCart /> : <IoCartOutline />}
             {/* <IoCartOutline/> */}
             {/* <IoCart/> */}
         </button>
     </div>
       )}
        {isLoggedIn && role==="admin" && (
         <div className="flex flex-col gap-4  mt-4 ">
            <Link to={`/update-book/${id}`}>
         <button className="bg-white rounded-full text-3xl p-2 text-blue-800">
         <FaEdit />
         {/* <IoHeartSharp /> */}

         </button>
         </Link>
         <button onClick={deleteBook} className="bg-white rounded-full text-3xl p-2 text-red-700 ">
         {/* <AiFillDelete /> */}
         <MdOutlineDelete />

         {/* <IoCart/> */}
         </button>
     </div>
       )}
        </div>
        <div className="p-4 w-full  lg:w-3/6">
        <h1 className="font-semibold text-yellow-100 text-4xl tracking-[.1em]">{Data.title}</h1>
        <p className=" text-zinc-500 mt-1" >by: {Data.auther}</p>
        <p className="text-xl text-zinc-400 mt-4 tracking-[.1em]" >{Data.desc}</p>
        <p className="flex justify-start items-center mt-4 text-zinc-400 tracking-[.1em] gap-2">
            <GrLanguage/> {Data.language}
        </p>
        <p className="mt-4 text-zinc-100 text-2xl font-semibold tracking-[.1em]">Price : ${Data.price}</p>

        </div>

    </div>
    )};


    export default ViewBookDetails;



