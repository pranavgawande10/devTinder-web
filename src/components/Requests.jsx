import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addRequests, removeRequest } from '../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

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
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center w-full animate-fade-in px-4">
      {/* Decorative background glow for empty state */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-accent/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
      
      <div className="glass-panel p-10 rounded-3xl border border-white/10 flex flex-col items-center gap-6 max-w-md w-full relative z-10 transform-gpu hover:scale-[1.02] transition-transform duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        {/* Abstract futuristic inbox visual */}
        <div className="relative w-32 h-32 mb-4 animate-float">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-accent to-secondary-accent rounded-full opacity-20 blur-md"></div>
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-secondary-accent/20 backdrop-blur-md border border-secondary-accent/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-[#111827] border border-white/10 flex items-center justify-center shadow-xl rotate-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
             </svg>
          </div>
          {/* Subtle connecting dots */}
          <div className="absolute top-0 right-1/2 w-1 h-1 bg-white rounded-full opacity-50"></div>
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full opacity-50"></div>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] to-[#94A3B8] font-extrabold text-3xl">
            You're all caught up.
          </h1>
          <p className="text-[#94A3B8] text-sm leading-relaxed">
            No new connection requests right now.
          </p>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-[#070B14]">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-accent/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up" style={{ animationDuration: '0.8s' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
              Connection Requests
            </h1>
            {requests.length > 0 && (
              <span className="bg-primary-accent text-white text-sm font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                {requests.length}
              </span>
            )}
          </div>
          <p className="text-lg text-[#94A3B8] font-medium tracking-wide mt-3">
            People who want to join your developer network.
          </p>
        </div>

        {/* Requests List */}
        <div className="flex flex-col gap-6">
      {requests.map((request, index) => {
        const { _id, firstName, lastName, photoUrl, age, skills, gender, about } = request.fromUserId;
        const delay = `${index * 60}ms`;

        return (
          <div
            key={request._id}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6
                       p-6 md:p-8 rounded-[1.5rem] bg-[#111827]/80 backdrop-blur-xl border border-white/5
                       shadow-[0_8px_30px_rgba(0,0,0,0.5)]
                       transform-gpu transition-all duration-400 ease-out animate-slide-up
                       hover:-translate-y-1.5 hover:bg-[#111827] hover:border-white/10
                       group perspective-[1000px]"
            style={{ animationDelay: delay, animationFillMode: 'both' }}
          >
            {/* Profile Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full sm:w-auto text-center sm:text-left group-hover:transform group-hover:translate-z-[10px] transition-transform duration-500 min-w-0">
              <div className="relative shrink-0 group-hover:transform group-hover:translate-z-[15px] transition-transform duration-500">
                <div className="absolute inset-0 bg-primary-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-[3px] border-[#070B14] group-hover:border-primary-accent/50 transition-colors duration-500 z-10"
                />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <h2 className="font-extrabold text-2xl text-[#F8FAFC] truncate">
                  {firstName} {lastName}
                </h2>

                {/* Headline / About */}
                {about && (
                  <p className="text-sm text-[#94A3B8] mt-1.5 line-clamp-2 leading-relaxed">
                    {about}
                  </p>
                )}

                {/* Skills */}
                {skills && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                    {(Array.isArray(skills) ? skills : skills.split(',')).slice(0, 4).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-[#F8FAFC] tracking-wider uppercase
                                   hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                      >
                        {typeof skill === 'string' ? skill.trim() : skill}
                      </span>
                    ))}
                    {(Array.isArray(skills) ? skills.length : skills.split(',').length) > 4 && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-bold text-[#94A3B8] self-center">
                        +{(Array.isArray(skills) ? skills.length : skills.split(',').length) - 4}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Meta data (Age / Gender) */}
                {age && gender && (
                  <p className="text-[11px] font-semibold text-[#06B6D4] mt-3 tracking-widest uppercase">
                    {age} <span className="text-gray-600 mx-1">•</span> {gender}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 shrink-0 w-full sm:w-auto justify-center sm:justify-end mt-4 sm:mt-0 sm:self-center">
              <button
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20
                           hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]
                           active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50
                           transition-all duration-300 font-bold tracking-wide"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                <FaTimes />
                Reject
              </button>

              <button
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20
                           hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
                           active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500/50
                           transition-all duration-300 font-bold tracking-wide"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                <FaCheck />
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
);

}

export default Requests;