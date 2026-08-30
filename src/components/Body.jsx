import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from "../utils/userSlice"
import { BASE_URL } from '../utils/constants'
import { connectSocket, disconnectSocket } from '../utils/socket'



const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=> store.user); 
  const [notifications, setNotifications] = useState([]);

  const fetchuser = async () =>{
    if(userData) return;
    try{
    const res = await axios.get(BASE_URL + "/profile/view" , {withCredentials : true},);
    dispatch(addUser(res.data));
    }
    catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(()=>{
    fetchuser();
  }, []);

  // Socket connection for real-time notifications
  useEffect(() => {
    if (userData) {
        const socket = connectSocket();
        
        socket.on("new_request", (data) => {
            const notifId = Date.now();
            setNotifications(prev => [...prev, { ...data, type: "new_request", id: notifId }]);
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== notifId));
            }, 5000);
        });

        socket.on("request_accepted", (data) => {
            const notifId = Date.now();
            setNotifications(prev => [...prev, { ...data, type: "request_accepted", id: notifId }]);
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== notifId));
            }, 5000);
        });

        socket.on("new_message", (data) => {
            const notifId = Date.now();
            setNotifications(prev => [...prev, { ...data, type: "new_message", id: notifId }]);
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== notifId));
            }, 5000);
        });

        return () => {
            disconnectSocket();
        };
    }
  }, [userData]);

  const location = useLocation();
  const isChatRoute = location.pathname.includes('/chat');

  return (
    <div className="relative min-h-screen bg-navy-950 text-white overflow-hidden flex flex-col">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-accent opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-accent opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col flex-1">
        {/* Real-time Notifications */}
        {notifications.length > 0 && (
            <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl glass-panel animate-slide-up
                            ${
                                notif.type === "new_request"
                                    ? "border-primary-accent/30 bg-primary-accent/10"
                                    : notif.type === "new_message"
                                    ? "border-secondary-accent/30 bg-secondary-accent/10"
                                    : "border-green-500/30 bg-green-500/10"
                            }`}
                    >
                        <img
                            src={notif.fromUser.photoUrl}
                            alt="user"
                            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                        />
                        <div>
                            <p className="text-white font-semibold text-sm">
                                {notif.fromUser.firstName} {notif.fromUser.lastName}
                            </p>
                            <p className="text-gray-300 text-xs">{notif.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
        <NavBar/> 
        <main className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          <Outlet/>
        </main>
        {!isChatRoute && <Footer/>}
        </div>
    </div>
  )
}

export default Body