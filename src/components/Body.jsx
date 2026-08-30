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
    <div>
        {/* Real-time Notifications */}
        {notifications.length > 0 && (
            <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10
                            ${
                                notif.type === "new_request"
                                    ? "bg-pink-500/20 border-pink-500/30"
                                    : notif.type === "new_message"
                                    ? "bg-blue-500/20 border-blue-500/30"
                                    : "bg-green-500/20 border-green-500/30"
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
        <Outlet/>
        {!isChatRoute && <Footer/>}
    </div>
  )
}

export default Body