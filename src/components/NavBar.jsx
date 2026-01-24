import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils/constants"
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {}
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
                         bg-white/80 backdrop-blur-md text-gray-800
                         animate-slide-down"
            >
              <li>
                <Link to="/profile" className="justify-between font-medium">
                  Profile
                  <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li>
                <a onClick={handleLogout} className="text-red-500 font-semibold">
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
