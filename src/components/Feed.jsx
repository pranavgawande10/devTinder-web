import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch ,useSelector} from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './UserCard';


const Feed = () => {
  const feed = useSelector((store)=> store.feed);
  
  const dispatch = useDispatch();

  const getFeed = async () =>{
    if(feed) return;

    try{
    const res = await axios.get(BASE_URL + "/feed", {withCredentials: true},);
    console.log(res.data);
    
    dispatch (addFeed(res.data));
    }
    catch(err)
    {
      //status(404).send("something went wrong!!");

    }
    
  };

  useEffect(()=> {
    getFeed();
  }, []);

  if(!feed) return null;

  if(feed.length <= 0) return (
    <div className="flex flex-col items-center justify-center pt-32 pb-20 w-full animate-fade-in">
      <div className="glass-panel p-8 rounded-3xl border-dashed border-2 border-primary-accent/20 flex flex-col items-center gap-4">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent font-bold text-3xl text-center">
          You're all caught up!
        </h1>
        <p className="text-gray-400 text-sm">Check back later for more developers in your area.</p>
      </div>
    </div>
  );
  return (
    feed && (
      /* min-h-screen: Ensures the page is at least full height
         flex flex-col: Allows us to use flex-grow to push the footer
      */
      <div className="flex flex-col items-center w-full pt-16 pb-10">
        
        {/* Centered content area */}
        <div className="flex-grow flex justify-center items-center my-10 w-full relative perspective-[1000px]">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;