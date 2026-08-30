import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios  from 'axios';
import { addConnections } from '../utils/connectionSlice';
import { useDispatch } from "react-redux";  
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';

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

    if (connections.length === 0) return (
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center w-full animate-fade-in px-4">
        {/* Decorative background glow for empty state */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-accent/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        
        <div className="glass-panel p-10 rounded-3xl border border-white/10 flex flex-col items-center gap-6 max-w-md w-full relative z-10 transform-gpu hover:scale-[1.02] transition-transform duration-500 hover:border-primary-accent/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
          {/* Abstract floating shapes representing network */}
          <div className="relative w-32 h-32 mb-4 animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-accent to-secondary-accent rounded-full opacity-20 blur-md"></div>
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-secondary-accent/40 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary-accent/40 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 flex items-center justify-center shadow-xl">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
               </svg>
            </div>
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full" style={{zIndex: -1}}>
              <line x1="24" y1="24" x2="64" y2="64" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <line x1="104" y1="104" x2="64" y2="64" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="text-center space-y-2">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-extrabold text-3xl">
              No connections yet
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your network is empty right now. Start connecting with other developers to share ideas, collaborate, and grow your professional circle.
            </p>
          </div>

          <Link to="/" className="mt-4">
             <button className="btn-primary-glow px-8 py-3 rounded-full font-bold">
               Discover Developers
             </button>
          </Link>
        </div>
      </div>
    );
   

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-[#04060A]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary-accent/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none opacity-50"></div>
      
      {/* Floating Particles */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-primary-accent rounded-full animate-float opacity-40 blur-[1px]"></div>
      <div className="absolute top-[60%] right-[15%] w-3 h-3 bg-secondary-accent rounded-full animate-float opacity-30 blur-[2px]" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 bg-white rounded-full animate-float opacity-50 blur-[1px]" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16 animate-slide-up" style={{ animationDuration: '0.8s' }}>
          <div className="relative inline-block mb-2">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight">
              Connections
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-lg blur-2xl opacity-20 -z-10"></div>
          </div>
          <p className="text-lg md:text-xl text-primary-accent font-medium mt-4 tracking-wide opacity-90">
            Build your developer network.
          </p>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {connections.map((connection, index) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection;
            // Delay based on index for staggered animation (e.g. 0ms, 60ms, 120ms...)
            const delay = `${index * 60}ms`;

            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 rounded-[1.5rem]
                           bg-navy-900/40 backdrop-blur-md border border-white/5
                           shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                           transform-gpu transition-all duration-400 ease-out animate-slide-up
                           hover:-translate-y-1 hover:scale-[1.01] hover:bg-navy-900/60
                           hover:border-primary-accent/30 hover:shadow-[0_15px_40px_rgba(124,58,237,0.15)]
                           group perspective-[1000px] cursor-default"
                style={{ animationDelay: delay, animationFillMode: 'both' }}
              >
                {/* Avatar */}
                <div className="relative shrink-0 group-hover:transform group-hover:translate-z-[20px] transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-accent to-secondary-accent rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-[3px] border-navy-800 group-hover:border-transparent transition-colors duration-500 z-10"
                    style={{ backgroundClip: 'padding-box' }}
                  />
                  {/* Subtle ring that becomes visible on hover */}
                  <div className="absolute inset-[-3px] rounded-full bg-gradient-to-tr from-primary-accent to-secondary-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                </div>

                {/* Info Container */}
                <div className="flex flex-col flex-1 min-w-0 w-full text-center sm:text-left group-hover:transform group-hover:translate-z-[10px] transition-transform duration-500">
                  
                  {/* Header Row: Name & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full">
                    <div className="min-w-0">
                      <h2 className="font-extrabold text-2xl text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                        {firstName} {lastName}
                      </h2>
                      
                      {age && gender && (
                        <p className="text-xs font-semibold text-secondary-accent mt-1 tracking-wide uppercase">
                          {age} <span className="text-gray-500 mx-1">•</span> {gender}
                        </p>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-center sm:justify-end gap-2 shrink-0">
                      <Link to={`/chat/${_id}`}>
                        <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300
                                           hover:bg-primary-accent hover:text-white hover:border-primary-accent hover:shadow-[0_0_15px_rgba(124,58,237,0.4)]
                                           transition-all duration-300 active:scale-95" title="Message">
                          <FaCommentDots className="text-lg" />
                        </button>
                      </Link>
                      <Link to={`/user/${_id}`}>
                        <button className="px-4 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-gray-300
                                           hover:bg-white/10 hover:text-white hover:border-white/20
                                           transition-all duration-300 active:scale-95" title="View Profile">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* About/Headline */}
                  {about && (
                    <p className="text-sm text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                      {about}
                    </p>
                  )}

                  {/* Skills Chips */}
                  {skills && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4 pt-4 border-t border-white/5">
                      {(Array.isArray(skills) ? skills : skills.split(',')).slice(0, 5).map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-300 tracking-wide uppercase
                                     hover:bg-white/10 hover:text-white hover:border-white/20 transition-colors cursor-default"
                        >
                          {typeof skill === 'string' ? skill.trim() : skill}
                        </span>
                      ))}
                      {(Array.isArray(skills) ? skills.length : skills.split(',').length) > 5 && (
                        <span className="px-2 py-1 rounded-md text-[11px] font-semibold text-gray-500 self-center">
                          +{(Array.isArray(skills) ? skills.length : skills.split(',').length) - 5}
                        </span>
                      )}
                    </div>
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
);

}

export default Connections