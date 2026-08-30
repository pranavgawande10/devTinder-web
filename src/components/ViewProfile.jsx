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
            <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-black via-zinc-900 to-black flex flex-col items-center justify-start">
                <h1 className="text-red-500 font-bold text-2xl">{error}</h1>
                <button className="btn btn-outline border-white text-white mt-5 hover:bg-white hover:text-black" onClick={() => navigate("/connections")}>Go Back</button>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen pt-24 px-4 pb-20 bg-gradient-to-br from-black via-zinc-900 to-black flex flex-col items-center">
            <h1 className="text-3xl font-bold text-pink-500 mb-8">{profile.firstName}'s Profile</h1>
            <div className="flex flex-col items-center max-w-lg w-full">
                <UserCard user={profile} hideActions={true} />
                {profile.githubData && (
                    <GitHubCard githubData={profile.githubData} />
                )}
            </div>
        </div>
    );
};

export default ViewProfile;
