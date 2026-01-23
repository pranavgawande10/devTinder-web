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

  if(!feed) return;

  if(feed.length <= 0) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start pt-40">
      <h1 className="text-pink-500 font-bold text-2xl animate-pulse">
        No User Found!!
      </h1>
      {/* This invisible spacer ensures the footer stays at the bottom */}
      <div className="flex-grow"></div> 
    </div>
  );
  return (
    feed && (
      /* min-h-screen: Ensures the page is at least full height
         flex flex-col: Allows us to use flex-grow to push the footer
      */
      <div className="min-h-screen bg-black flex flex-col items-center">
        
        {/* Centered content area */}
        <div className="flex-grow flex justify-center items-center my-10 w-full">
          <UserCard user={feed[0]} />
        </div>

        {/* If your Footer is not part of a global Layout, 
           you can place it here. If it is global, the 
           'flex-grow' above will push it to the bottom. 
        */}
      </div>
    )
  );
};

export default Feed;