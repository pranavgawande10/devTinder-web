import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from "../utils/constants"
import { removeUser, addUser } from '../utils/userSlice';
import { FaBell, FaCommentDots, FaUserPlus } from 'react-icons/fa';
import { getSocket, connectSocket } from '../utils/socket';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(user?.unreadNotificationsCount || 0);
  const [notifications, setNotifications] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const autoCloseDropdown = (e) => {
    const el = e.currentTarget;
    setTimeout(() => {
      if (el) el.blur();
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 2000);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070B14]/85 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div className="flex shrink-0 items-center">
            <Link to="/feed" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="text-white font-bold font-mono text-xs">{"</>"}</span>
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-white transition-colors hidden sm:block">
                Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">Tinder</span>
              </span>
            </Link>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          {user && (
            <div className="hidden md:flex items-center gap-1 mx-auto bg-white/5 border border-white/10 rounded-full px-1.5 py-1.5 shadow-inner">
              {[
                { name: 'Feed', path: '/feed' },
                { name: 'Connections', path: '/connections' },
                { name: 'Requests', path: '/requests' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-7 py-3 rounded-full text-[17px] font-bold transition-all duration-300 relative group ${
                    isActive(link.path) 
                      ? "text-white bg-white/10 shadow-sm" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-accent shadow-[0_0_8px_#7c3aed]"></span>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* RIGHT: Controls & Profile */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            
            {user && (
              <>
                {/* Notification Bell */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    onMouseDown={handleClearNotifications}
                    onClick={autoCloseDropdown}
                  >
                    <FaBell className="text-[17px]" />
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </div>

                  <div
                    tabIndex={0}
                    className="dropdown-content mt-4 w-[320px] sm:w-[350px] max-h-[80vh] overflow-y-auto
                               rounded-3xl glass-card text-white
                               animate-slide-down flex flex-col p-4 z-50 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  >
                    <h3 className="font-bold text-sm tracking-widest uppercase text-gray-400 border-b border-white/10 pb-3 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-accent"></span>
                        Activity
                    </h3>
                    
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                <FaBell className="text-lg text-gray-600" />
                            </div>
                            <p className="text-sm font-medium">No recent activity</p>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-1">
                            {notifications.map(notif => (
                                <li key={notif._id} className="p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/5" onClick={() => navigateToContext(notif)}>
                                    <div className="flex gap-4 items-start">
                                        <img src={notif.senderId?.photoUrl} className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-transparent group-hover:ring-primary-accent/50 transition-all" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-300 leading-snug">
                                                <span className="font-bold text-white mr-1">{notif.senderId?.firstName}</span>
                                                {notif.text}
                                            </p>
                                            <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1.5 font-semibold">
                                                {new Date(notif.createdAt).toLocaleDateString()}
                                            </p>
                                            
                                            {notif.type === "connection_request" && notif.connectionRequestId && !notif.handled && (
                                                <div className="flex gap-2 mt-3" onClick={e => e.stopPropagation()}>
                                                    <button 
                                                        className="h-8 flex-1 bg-gradient-to-r from-primary-accent to-blue-500 hover:from-primary-accent hover:to-blue-400 text-white font-bold text-xs rounded-lg transition-all shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                                                        onClick={(e) => handleReviewRequest("accepted", notif.connectionRequestId, notif._id)}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button 
                                                        className="h-8 flex-1 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-lg transition-all"
                                                        onClick={(e) => handleReviewRequest("rejected", notif.connectionRequestId, notif._id)}
                                                    >
                                                        Ignore
                                                    </button>
                                                </div>
                                            )}
                                            {notif.type === "connection_request" && notif.handled && (
                                                <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded-md inline-block">
                                                    Handled
                                                </div>
                                            )}
                                        </div>
                                        <div className="shrink-0 pt-1 text-gray-600 group-hover:text-primary-accent transition-colors">
                                            {notif.type === "new_message" && <FaCommentDots />}
                                            {notif.type === "connection_request" && <FaUserPlus />}
                                            {notif.type === "request_accepted" && <span className="text-secondary-accent">❤️</span>}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                  </div>
                </div>

                {/* Desktop User Avatar Dropdown */}
                <div className="hidden md:block dropdown dropdown-end ml-1">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
                    onClick={autoCloseDropdown}
                  >
                    <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-primary-accent to-secondary-accent">
                      <img alt="User" src={user.photoUrl} className="w-full h-full rounded-full object-cover border border-[#070B14]" />
                    </div>
                    <span className="text-base font-semibold text-white">{user.firstName}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 w-56
                               rounded-2xl glass-card text-gray-200 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                               animate-slide-down p-2 z-50 font-medium"
                  >
                    <div className="px-4 py-3 border-b border-white/10 mb-1 text-xs text-gray-400 uppercase tracking-widest font-bold">
                      Account
                    </div>
                    <li><Link to="/profile" className="hover:bg-white/10 rounded-xl py-2.5 transition-colors focus:bg-white/10 active:bg-white/10">Profile</Link></li>
                    <div className="h-px bg-white/5 my-1 mx-2"></div>
                    <li>
                      <a onClick={handleLogout} className="text-red-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl py-2.5 transition-colors focus:bg-red-500/10 focus:text-red-400">
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-[#070B14]/95 backdrop-blur-2xl animate-fade-in flex flex-col">
          <div className="px-4 py-5 flex items-center justify-between border-b border-white/10">
             <Link to="/feed" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                  <span className="text-white font-bold font-mono text-[10px]">{"</>"}</span>
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">Tinder</span>
                </span>
             </Link>
             <button 
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Feed', path: '/feed' },
                { name: 'Connections', path: '/connections' },
                { name: 'Requests', path: '/requests' },
                { name: 'Edit Profile', path: '/profile' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-4 rounded-2xl text-lg font-bold transition-all ${
                    isActive(link.path) 
                      ? "text-white bg-white/10 border border-white/5" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <img src={user.photoUrl} className="w-10 h-10 rounded-full object-cover border-2 border-[#070B14] ring-2 ring-primary-accent/50" />
                 <div>
                   <p className="text-white font-bold leading-tight">{user.firstName} {user.lastName}</p>
                   <p className="text-xs text-gray-400">Premium Member</p>
                 </div>
               </div>
               <button 
                 onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                 className="text-red-400 font-bold px-4 py-2 rounded-xl bg-red-500/10"
               >
                 Logout
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
