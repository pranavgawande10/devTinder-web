import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // This controls the toggle
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      // Check if your backend sends error as a string or object
      setError(typeof err?.response?.data === 'string' ? err.response.data : "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
      </div>

      {/* Card */}
      <div className="z-10 card w-full max-w-sm backdrop-blur-xl bg-white/10 shadow-2xl border border-white/20 p-8 m-4 rounded-3xl">
        <h2 className="text-4xl font-extrabold text-white text-center mb-6 tracking-tighter">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        
        <div className="space-y-4">
          {/* Sign Up Fields - Only visible when isLoginForm is false */}
          {!isLoginForm && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="input h-12 w-full bg-white/10 border-none text-white focus:bg-white/20 rounded-full px-6 outline-none"
                  placeholder="John"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="input h-12 w-full bg-white/10 border-none text-white focus:bg-white/20 rounded-full px-6 outline-none"
                  placeholder="Doe"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Email Address</label>
            <input
              type="text"
              value={emailId}
              className="input h-12 w-full bg-white/10 border-none text-white focus:bg-white/20 rounded-full px-6 outline-none"
              placeholder="mail@example.com"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="input h-12 w-full bg-white/10 border-none text-white focus:bg-white/20 rounded-full px-6 outline-none pr-12"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" onClick={togglePassword}>
                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-xs text-center font-bold">{error}</p>}

          {/* Action Button */}
          <button
            className="w-full h-12 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg hover:brightness-110 transition-all"
            onClick={isLoginForm ? handleLogin : handleSignup}
          >
            {isLoginForm ? "Login 🚀" : "Sign Up 🚀"}
          </button>
          
          {/* Toggle Switch */}
          <p 
            className="text-center text-xs font-bold text-gray-300 cursor-pointer hover:text-white mt-4 uppercase tracking-tight"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError(""); // Clear errors when switching
            }}
          >
            {isLoginForm ? "New User? Signup Here" : "Already a member? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;