import React from 'react';
import FirstSection from '../Components/Home/FirstSection';
import RecentlyAdded from '../Components/Home/recentlyAdded';

const Home = () => {
    return (
    <div className=' bg-zinc-950 text-neutral-300 px-9 py-4 ' >
       <FirstSection/>
       <RecentlyAdded/>
    </div>
    );
};

export default Home;