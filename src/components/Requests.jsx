import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addRequests, removeRequest } from '../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Requests = () => {

    const requests = useSelector(store => store.requests);
    const dispatch = useDispatch();
    const reviewRequest = async(status , _id)=>{
        try{
            const res = axios.post(BASE_URL + "/request/review/" + status+"/"+ _id, {},{withCredentials:true});
            dispatch(removeRequest(_id));

        }catch(err)
        {

        }
    }

const fetchRequests = async ()=>{
    try{
        const res = await axios.get(BASE_URL + "/user/requests/received",{withCredentials:true,});

        dispatch(addRequests(res.data.data));

    }
    catch(err)
    {

    }
};

useEffect(()=>{
    fetchRequests();
}, []);


   if(!requests) return;

    // Corrected empty state return
if (requests.length === 0) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start pt-40">
      <h1 className="text-pink-500 font-bold text-2xl animate-pulse">
        No Requests Found!!
      </h1>
      {/* This invisible spacer ensures the footer stays at the bottom */}
      <div className="flex-grow"></div> 
    </div>
  );
}

  return (
  <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-black via-zinc-900 to-black">
    
    {/* Title */}
    <h1 className="text-center text-3xl font-bold text-pink-500 mb-10">
      Connection Requests
    </h1>

    {/* Requests List */}
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age,skills , gender, about } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex items-center justify-between gap-6
                       p-5 rounded-2xl
                       bg-white/10 backdrop-blur-xl
                       shadow-xl border border-white/10
                       hover:scale-[1.02] transition-transform"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full object-cover border-2 border-pink-500"
              />

              <div className="text-white">
                <h2 className="font-bold text-xl">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <p className="text-sm text-gray-300">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-sm text-gray-400 line-clamp-2">
                  {skills}
                </p>

                <p className="text-sm text-gray-400 line-clamp-2">
                  {about}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="btn btn-outline btn-error"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>

              <button
                className="btn btn-outline btn-success"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

}

export default Requests;