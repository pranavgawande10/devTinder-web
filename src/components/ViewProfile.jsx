import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import GitHubCard from './GitHubCard';

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
            
            <div className="flex flex-col items-center max-w-lg w-full gap-8 perspective-[1000px]">
                <UserCard user={profile} hideActions={true} />
                {profile.githubData && (
                    <GitHubCard githubData={profile.githubData} />
                )}
            </div>
        </div>
    );
};

export default ViewProfile;
