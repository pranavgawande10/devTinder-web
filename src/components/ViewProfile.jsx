import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import GitHubCard from './GitHubCard';
import { FaGithub } from 'react-icons/fa';

const ViewProfile = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(BASE_URL + "/user/profile/" + userId, { withCredentials: true });
                setProfile(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching profile");
            }
        };
        fetchProfile();
    }, [userId]);

    if (error) {
        return (
            <div className="w-full pt-32 pb-20 px-4 flex flex-col items-center justify-center animate-fade-in">
                <div className="glass-panel p-8 rounded-3xl border-dashed border-2 border-red-500/30 flex flex-col items-center gap-6 max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-red-400 font-bold text-xl">{error}</h1>
                    <button className="btn bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl w-full" onClick={() => navigate("/connections")}>
                        Return to Connections
                    </button>
                </div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="w-full pt-16 pb-20 px-4 flex flex-col items-center animate-fade-in relative z-10">
            <div className="text-center mb-10 relative">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 inline-block">
                    {profile.firstName}'s Profile
                </h1>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full opacity-70"></div>
            </div>
            
            <div className="flex flex-col items-center max-w-4xl w-full gap-8">
                
                {/* Large Profile Box */}
                <div className="w-full bg-navy-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden">
                   
                   {/* Background Glow */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

                   {/* Avatar */}
                   <div className="shrink-0 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary-accent to-secondary-accent rounded-full blur-xl opacity-30"></div>
                      <img src={profile.photoUrl} alt="Avatar" className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-[6px] border-navy-800 relative z-10 shadow-2xl" />
                   </div>

                   {/* Profile Details */}
                   <div className="flex-1 w-full text-center md:text-left z-10">
                      <h2 className="text-4xl font-extrabold text-white mb-2">{profile.firstName} {profile.lastName}</h2>
                      
                      {profile.headline && (
                        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-5 tracking-wide uppercase">
                           {profile.headline}
                        </p>
                      )}

                      <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                        {profile.age && <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-gray-300">{profile.age} years</span>}
                        {profile.gender && <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-gray-300 capitalize">{profile.gender}</span>}
                        {profile.githubUsername && (
                           <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/10 transition-all group/link">
                             <FaGithub className="text-gray-400 group-hover/link:text-white transition-colors" size={16}/>
                             <span className="text-sm font-medium text-gray-300 group-hover/link:text-white transition-colors">@{profile.githubUsername}</span>
                           </a>
                        )}
                      </div>

                      {/* About me (No truncation) */}
                      {profile.about && (
                        <div className="mb-8 text-left bg-navy-950/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-primary-accent"></span> About Me
                           </h3>
                           <p className="text-base text-gray-300 leading-relaxed whitespace-pre-wrap">{profile.about}</p>
                        </div>
                      )}

                      {/* Skills */}
                      {profile.skills && profile.skills.length > 0 && (
                        <div className="text-left">
                           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-secondary-accent"></span> Core Skills
                           </h3>
                           <div className="flex flex-wrap gap-2">
                             {(Array.isArray(profile.skills) ? profile.skills : profile.skills.split(',')).map((skill, idx) => (
                               <span key={idx} className="bg-primary-accent/20 border border-primary-accent/30 text-primary-accent px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                                 {typeof skill === 'string' ? skill.trim() : skill}
                               </span>
                             ))}
                           </div>
                        </div>
                      )}
                   </div>
                </div>

                {/* Github Data */}
                {profile.githubData && (
                    <div className="w-full">
                       <GitHubCard githubData={profile.githubData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewProfile;
