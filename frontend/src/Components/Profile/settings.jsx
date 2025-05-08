import react, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";



const Settings = () => {
    const [ProfileData, setProfileData] = useState();
    const [address, setAddress] = useState({address:""}); 
    const headers = {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(()=> {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3000/api/user/get-user`, { headers });
      //     console.log("profile " +res.data.data.address);
            setProfileData(res.data.data);
            setAddress({address:res.data.data.address});
            console.log(ProfileData + " ");
        };
        fetchData();
    }, []);
    const change=(e)=>{
        const {name,value}=e.target;
        setAddress({...address,[name]:value})

    }
    const submitAdress=async()=>{
        const res = await axios.put("http://localhost:3000/api/user/update-addr" ,address, {headers})
        console.log(res);
        alert(res.data.message)
    }
    return (
        <>
        {!ProfileData &&  <div className='flex items-center justify-center my-8'> <Loader />
            </div>}

        {ProfileData  && <>
                <h1 className="text-3xl text-yellow-100 text-center font-semibold tracking-[.1em]">Settings</h1>
                <div className="p-5">
                <div className="flex items-left justify-center mt-8 gap-4">
                    <div className="text-zinc-500 w-2/6 flex flex-col items-left justify-center">
                    <label className="mb-3 text-zinc-100 font-semibold tracking-[.1em]">userName</label>
                    <p className="bg-zinc-800 rounded w-auto px-4 py-4 text-zinc-400 tracking-[.1em]">{ProfileData.username}</p>
                    </div>
                    <div className="text-zinc-500 w-4/6 flex flex-col items-left justify-center">
                    <label className="mb-3 text-zinc-100 font-semibold tracking-[.1em]">Email</label>
                    <p className="bg-zinc-800 rounded w-auto px-4 py-4 text-zinc-400 tracking-[.1em]">{ProfileData.email}</p>
                    </div>

                </div> 
                <div className="flex flex-col">
                <label className="mb-3 mt-4 text-zinc-100 font-semibold tracking-[.1em]">Address</label>
                <textarea   name="address" rows="3" onChange={change}  className='p-2 rounded bg-zinc-800 text-zinc-100 mb-2 border-yellow-700' value={address.address}/>
                </div> 
            <div className="flex items-right justify-end">
                <button  onClick={submitAdress} className="bg-yellow-700 text-neutral-300 p-2 tracking-[.2em] mt-4 font-semibold hover:scale-105 transition-all duration-300">Update</button>
        
                </div>  
                </div>
                  </>}
            {/* {orderHistory&&orderHistory.length === 0 &&
        <div>
         <h4 className=' text-3xl text-zinc-500 text-center font-semibold tracking-[.1em]'>
            No Order History
            </h4>
            <img src="/33.png" alt="empty fav" className="w-1/2 mx-auto mt-2 h-[50%]" />

            </div>
            } */}
            </>
    );
};
export default Settings;