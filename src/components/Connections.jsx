import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios  from 'axios';
import { addConnections } from '../utils/connectionSlice';
import { useDispatch } from "react-redux";  
import { useSelector } from 'react-redux';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async ()=> {
        
        try {
            const res  = await axios.get(BASE_URL + "/user/connections" , {withCredentials: true,});
            // console.log(res.data.data);
            dispatch(addConnections(res.data.data));

        }
        catch(err)
        {   
            //  
        }
    };

    useEffect(() => {
        fetchConnections();
    } , []);

    if(!connections) return;

    if(connections.length === 0) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start pt-40">
      <h1 className="text-pink-500 font-bold text-2xl animate-pulse">
        No Connections Found!!
      </h1>
      {/* This invisible spacer ensures the footer stays at the bottom */}
      <div className="flex-grow"></div> 
    </div>
  );
   

  return (
  <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-black via-zinc-900 to-black">
    
    {/* Page Title */}
    <h1 className="text-center text-4xl font-bold text-pink-500 mb-12">
      Your Connections
    </h1>

    {/* Connections List */}
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about ,skills } = connection;

        return (
          <div
            key={_id}
            className="flex items-center gap-5 p-5 rounded-2xl
                       bg-white/10 backdrop-blur-xl
                       shadow-xl border border-white/10
                       hover:scale-[1.02] transition-transform"
          >
            {/* Avatar */}
            <img
              src={photoUrl}
              alt="photo"
              className="w-20 h-20 rounded-full object-cover border-2 border-pink-500"
            />

            {/* Info */}
            <div className="text-white">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>

              

              {age && gender && (
                <p className="text-sm text-gray-300">
                  {age}, {gender}
                </p>
              )}
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {skills}
              </p>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {about}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

}

export default Connections