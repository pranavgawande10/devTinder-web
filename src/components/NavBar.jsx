import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils/constants"
import { removeUser, addUser } from '../utils/userSlice';
import { FaBell, FaCommentDots, FaUserPlus } from 'react-icons/fa';
import { getSocket, connectSocket } from '../utils/socket';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(user?.unreadNotificationsCount || 0);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
      try {
          const res = await axios.get(BASE_URL + "/notifications", { withCredentials: true });
          setNotifications(res.data.data);
      } catch (err) {
          console.error(err);
      }
  };

  useEffect(() => {
      if (user) {
          fetchNotifications();
      }
  }, [user]);

  useEffect(() => {
      if (user && user.unreadNotificationsCount !== undefined) {
          setUnreadCount(user.unreadNotificationsCount);
      }
  }, [user?.unreadNotificationsCount]);

  const handleClearNotifications = async () => {
      if (unreadCount === 0) return;
      setUnreadCount(0);
      dispatch(addUser({ ...user, unreadNotificationsCount: 0 }));
      try {
          await axios.patch(BASE_URL + "/notifications/mark-read", {}, { withCredentials: true });
      } catch (err) {
          console.error(err);
      }
  };

  useEffect(() => {
    if (user) {
        const socket = connectSocket();
        const handleNotification = () => {
            setUnreadCount(prev => prev + 1);
            fetchNotifications();
        };
        socket.on("new_request", handleNotification);
        socket.on("request_accepted", handleNotification);
        socket.on("new_message", handleNotification);
        return () => {
            socket.off("new_request", handleNotification);
            socket.off("request_accepted", handleNotification);
            socket.off("new_message", handleNotification);
        };
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {}
  };

  const handleReviewRequest = async (status, reqId, notifId) => {
      try {
          await axios.post(BASE_URL + "/request/review/" + status + "/" + reqId, {}, { withCredentials: true });
          setNotifications(prev => prev.map(n => n._id === notifId ? { ...n, handled: true } : n));
      } catch (err) {
          console.error(err);
      }
  };

  const navigateToContext = (notif) => {
      if (notif.type === "new_message") {
          navigate("/chat/" + notif.senderId._id);
      } else if (notif.type === "request_accepted") {
          navigate("/user/" + notif.senderId._id);
      } else {
          navigate("/requests");
      }
  };

  return (
   <div
  className="navbar px-8 py-4 fixed top-0 z-50
             bg-black/40 backdrop-blur-xl
             text-white border-b border-white/10"
>

      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527443224154-c4a3942d3acf')]
                   bg-cover bg-center opacity-15"
      ></div>

      {/* Left Section */}
      <div className="flex-1 relative z-10">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-extrabold tracking-wide
                     hover:scale-105 transition-transform duration-300"
        >
          <img src="/devTinder.png" alt="DevTinder Logo" className="w-10 h-10 mr-2" />
    DevTinder
        </Link>
      </div>

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-4 relative z-10">

          {/* Notification Bell Dropdown */}
          <div className="dropdown dropdown-end">
            <div 
                tabIndex={0} 
                role="button" 
                className="relative btn btn-ghost btn-circle text-white hover:text-yellow-300 transition-colors"
                onMouseDown={handleClearNotifications}
            >
                <FaBell className="text-xl" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-2 bg-pink-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold animate-bounce">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </div>

            <div 
                tabIndex={0} 
                className="dropdown-content mt-4 w-[350px] max-h-[80vh] overflow-y-auto
                           rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                           bg-[#1a1a1f]/95 backdrop-blur-xl border border-white/10 text-white
                           animate-slide-down flex flex-col p-4 z-50"
            >
                <h3 className="font-bold text-lg border-b border-white/10 pb-3 mb-2 flex items-center gap-2">
                    <FaBell className="text-pink-500"/> Activity
                </h3>
                
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                            <FaBell className="text-xl text-gray-500" />
                        </div>
                        <p>No recent activity</p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-1">
                        {notifications.map(notif => (
                            <li key={notif._id} className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => navigateToContext(notif)}>
                                <div className="flex gap-4 items-start">
                                    <img src={notif.senderId?.photoUrl} className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-transparent group-hover:ring-pink-500 transition-all" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-300 leading-tight">
                                            <span className="font-bold text-white mr-1">{notif.senderId?.firstName}</span>
                                            {notif.text}
                                        </p>
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            {new Date(notif.createdAt).toLocaleDateString()}
                                        </p>
                                        
                                        {/* Accept / Reject Buttons for Connection Requests */}
                                        {notif.type === "connection_request" && notif.connectionRequestId && !notif.handled && (
                                            <div className="flex gap-2 mt-3" onClick={e => e.stopPropagation()}>
                                                <button 
                                                    className="btn btn-xs flex-1 bg-pink-500 hover:bg-pink-600 text-white border-none rounded-lg"
                                                    onClick={(e) => handleReviewRequest("accepted", notif.connectionRequestId, notif._id)}
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    className="btn btn-xs flex-1 bg-white/10 hover:bg-white/20 text-white border-none rounded-lg"
                                                    onClick={(e) => handleReviewRequest("rejected", notif.connectionRequestId, notif._id)}
                                                >
                                                    Ignore
                                                </button>
                                            </div>
                                        )}
                                        {notif.type === "connection_request" && notif.handled && (
                                            <div className="mt-2 text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full inline-block">
                                                Handled
                                            </div>
                                        )}
                                    </div>
                                    {/* Icon indicator */}
                                    <div className="shrink-0 pt-1 text-gray-500 group-hover:text-pink-500 transition-colors">
                                        {notif.type === "new_message" && <FaCommentDots />}
                                        {notif.type === "connection_request" && <FaUserPlus />}
                                        {notif.type === "request_accepted" && <span className="text-green-500">❤️</span>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
          </div>

          {/* Welcome Text */}
          <div className="hidden sm:block font-semibold animate-fade-in">
            Welcome, <span className="text-yellow-300">{user.firstName}</span>
          </div>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar
                         ring ring-white ring-offset-2 ring-offset-purple-600
                         hover:scale-110 transition-transform duration-300"
            >
              <div className="w-11 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 w-52
                         rounded-2xl shadow-xl
                         bg-[#1a1a1f]/95 backdrop-blur-xl border border-white/10 text-white
                         animate-slide-down"
            >
              <li>
                <Link to="/profile" className="justify-between hover:bg-white/10 rounded-lg">
                  Profile
                  <span className="badge bg-pink-500 border-none text-white">New</span>
                </Link>
              </li>
              <li><Link to="/connections" className="hover:bg-white/10 rounded-lg">Connections</Link></li>
              <li><Link to="/requests" className="hover:bg-white/10 rounded-lg">Requests</Link></li>
              <li>
                <a onClick={handleLogout} className="text-red-500 font-semibold hover:bg-white/10 rounded-lg">
                  Logout
                </a>
              </li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default NavBar;
