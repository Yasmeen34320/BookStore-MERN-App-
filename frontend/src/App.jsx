import React, { useEffect } from "react";
import Home from "./Pages/home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/footer";
import { Route, Routes} from 'react-router-dom';
import AllBooks from "./Pages/AllBooks";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import ViewBookDetails from "./Components/ViewBookDetails/viewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./Components/Profile/favourites";
import UserOrderHistory from "./Components/Profile/userOrderHistory";
import Settings from "./Components/Profile/settings";
import AllOrders from "./Components/Profile/AllOrders";
import AddBook from "./Components/Profile/addBook";
import UpdateBook from "./Pages/updateBook";


const App = () => {
  const dispatch = useDispatch();
  const role =useSelector((state)=>{
    return state.auth.role;
  }
  );
  useEffect(() => {
    if(localStorage.getItem("token")&&localStorage.getItem("role")&&localStorage.getItem("id")){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
     }
  });
return <div className="flex flex-col min-h-screen justify-between bg-zinc-900">
  <Navbar/>
  <Routes>
  <Route exact path="/" element={<Home/>}/>
  <Route  path="/books" element={<AllBooks/>}/>
  <Route  path="/profile" element={<Profile/>}>
{role ==="user" ?     <Route index element={<Favourites/>}/>
:    <Route index element={<AllOrders/>}/>
}
{role==="admin" &&     <Route path="/profile/add-book" element={<AddBook/>}/>
 }
    <Route path="/profile/OrderHistory" element={<UserOrderHistory/>}/>
    <Route path="/profile/settings" element={<Settings/>}/>
  </Route>
  <Route  path="/cart" element={<Cart/>}/>
  <Route  path="/Login" element={<Login/>}/>
  <Route  path="/Signup" element={<Signup/>}/>
  <Route  path="/view-book/:id" element={<ViewBookDetails/>}/>
  <Route path="/update-book/:id" element={<UpdateBook/>}/>
</Routes>
<Footer/>

  </div>

};

export default App;