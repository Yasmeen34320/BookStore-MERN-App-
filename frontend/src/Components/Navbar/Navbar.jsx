import React from 'react';
import logo from '../../assets/10-removebg-preview.png';
import { Link } from 'react-router-dom';
// import { CgMenuOreos } from "react-icons/cg";
import { HiMenuAlt4 } from "react-icons/hi";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links=[
        {title:"Home", path:"/"},
        {title:"Books", path:"/books"},
        {title:"Cart",path:"/cart"},
        {title:"Profile",path:"/profile"}, 
        {title:"AdminProfile" , path:"/profile"} 
    ];
   const isLoggedIn =useSelector((state)=>{
  console.log(state.auth.isLoggedIn);
  
    return state.auth.isLoggedIn;
   });
   const role=useSelector((state)=>state.auth.role);

   if((isLoggedIn === false))
    links.splice(2,2);
  if(isLoggedIn&&role==="admin"){
    links.splice(3,1)
  }
  if(isLoggedIn&&role==="user"){
    links.splice(4,1)
  }
    const [MobileNav , setMobileNav] = React.useState("hidden");
    return (
        <nav>
      <div className="bg-zinc-800 text-white px-8 py-2 flex justify-between items-center"> 
        {/*logo*/}
        <Link to="/"className='flex items-center'> 
            <img className='h-12 me-4' alt="logo" src={logo}/>
        <h1 className="text-2xl font-semibold">BookStore</h1>
        </Link>
        {/*links*/}
<div className='nav-links-bookStore  md:flex gap-4 items-center'>
        <div className='hidden  md:flex gap-4 items-center'>
            {links.map((items,i) => (
                console.log(items.title),
                console.log(items.title==="Profile"),
                console.log((items.title=="Profile" || items.title=="AdminProfile")),

<>
{(items.title=="Profile" || items.title=="AdminProfile")? (
            <Link to={items.path} key={i}  className=' w-auto px-4 py-1 bg-orange-900 text-neutral-300 rounded hover:bg-neutral-300 hover:text-zinc-800 transition-all-duration-300'>{items.title}</Link>

):(<Link to={items.path} key={i} className='hover:text-orange-900 transition-all duration 300'>{items.title}</Link>
) }
</>
))}

        </div>
        <div className='hidden  md:flex gap-4  items-center'>
          {isLoggedIn===false &&(
            <>
              <Link to="/Login" className='px-4 py-1  border border-orange-900 text-neutral-300 rounded hover:bg-neutral-300 hover:text-zinc-800 transition-all-duration-300 hover:border-neutral-800'>LogIn</Link>
            <Link to="/Signup" className='px-4 py-1 bg-orange-900 text-neutral-300 rounded hover:bg-neutral-300 hover:text-zinc-800 transition-all-duration-300'>SignUp</Link>

            </>
          )}
        </div>
        <button className=' md:hidden text-white text-2xl' onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}>
        <HiMenuAlt4  className="text-neutral-300 hover:text-zinc-400" />

        </button>
        </div>
        </div> 
        {/*login & signup */}
        <div className={`${MobileNav} md:hidden flex flex-col gap-4 items-center bg-zinc-800 text-neutral-300 px-8 py-2`}>
        {links.map((items,i) => (
            <>
{items.title=="Profile" || items.title=="AdminProfile"? (
            <Link to={items.path} key={i}  className=' w-auto px-4 py-1 bg-orange-900 text-neutral-300 rounded hover:bg-neutral-300 hover:text-zinc-800 transition-all-duration-300'>{items.title}</Link>

):(<Link to={items.path} key={i} className='hover:text-orange-900 transition-all duration 300'>{items.title}</Link>
) }
</>))}
 <div className=' flex flex-col gap-4  items-center'>
          {
            isLoggedIn===false &&(
                <>
                  <Link to="/Login" className='w-20 px-4 py-1  border border-orange-900 text-neutral-300 rounded hover:bg-neutral-300 hover:text-zinc-800 transition-all-duration-300 hover:border-neutral-800'>LogIn</Link>
            <Link to="/Signup" className=' w-20 px-4 py-1 bg-orange-900 text-neutral-300 rounded hover:bg-neutral-300 hover:text-zinc-800 transition-all-duration-300'>SignUp</Link>

    
                </>
            )
          }
              </div>
        </div>
       
        </nav> 
        
    );
};

export default Navbar;