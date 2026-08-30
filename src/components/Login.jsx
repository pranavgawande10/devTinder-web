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
      navigate("/feed");
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
    <div className="flex min-h-screen w-full bg-[#070B14] overflow-hidden font-sans">
      
      {/* LEFT SIDE - VISUAL (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-16 overflow-hidden bg-[#04060A] border-r border-white/5">
        
        {/* Aceternity Inspired Grid Background with Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Aceternity Inspired Spotlights */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-accent/20 blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary-accent/20 blur-[100px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>

        {/* Aceternity Inspired Floating Particles (Sparkles) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" style={{ animationDuration: '3s' }}></div>
           <div className="absolute top-[40%] right-[20%] w-2 h-2 bg-primary-accent rounded-full shadow-[0_0_15px_#7c3aed] animate-pulse" style={{ animationDuration: '4s' }}></div>
           <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-secondary-accent rounded-full shadow-[0_0_15px_#06b6d4] animate-pulse" style={{ animationDuration: '2.5s' }}></div>
           <div className="absolute bottom-[15%] right-[30%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" style={{ animationDuration: '5s' }}></div>
        </div>

        {/* Brand */}
        <div className="absolute top-10 left-10 flex items-center gap-3 z-20">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-accent to-secondary-accent flex items-center justify-center text-white font-extrabold text-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            DT
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">DevTinder</span>
        </div>

        {/* Animated Text Section (Aceternity Style Reveal) */}
        <div className="relative z-20 max-w-lg">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Authentication</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.2]">
            <span className="block text-white animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              Welcome back to
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              DevTinder
            </span>
          </h1>
          
          <p className="text-[#94A3B8] text-lg font-medium leading-relaxed animate-fade-in max-w-md border-l-2 border-primary-accent/50 pl-4" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
            Sign in to access your developer network, review connection requests, and find your next big opportunity.
          </p>

          {/* Floating Technology Badges (Aceternity style floating elements) */}
          <div className="flex flex-wrap gap-3 mt-10 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'both' }}>
            {['React', 'Node.js', 'Python', 'System Design'].map((tech, idx) => (
              <span key={tech} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 shadow-lg backdrop-blur-md transform hover:-translate-y-1 transition-transform cursor-default hover:border-primary-accent/50 hover:text-white">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        
        {/* Mobile Decorative Background (Desktop hides this) */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary-accent/15 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary-accent/15 rounded-full blur-[100px]"></div>
        </div>

        {/* Mobile Brand */}
        <div className="lg:hidden flex flex-col items-center gap-4 mb-10 z-20 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-accent to-secondary-accent flex items-center justify-center text-white font-bold text-3xl shadow-[0_0_20px_rgba(124,58,237,0.5)]">
            DT
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-white">DevTinder</span>
        </div>

        {/* Glass Login Card */}
        <div className="w-full max-w-[440px] p-8 sm:p-10 rounded-[2rem] bg-[#111827]/70 backdrop-blur-xl border border-white/5 shadow-[0_15px_50px_rgba(0,0,0,0.5)] animate-slide-up relative overflow-hidden group">
          {/* Subtle card glow border effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Form Header */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
              <h2 className="text-3xl font-extrabold text-[#F8FAFC] mb-2 tracking-tight">
                {isLoginForm ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-[#94A3B8] text-sm font-medium">
                {isLoginForm ? "Continue building your developer network." : "Join the developer network and start building."}
              </p>
            </div>
            
            <div className="space-y-5">
              {/* Sign Up Fields */}
              {!isLoginForm && (
                <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      className="h-12 w-full rounded-xl bg-[#070B14]/80 border border-white/10 px-4 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                      placeholder="John"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      className="h-12 w-full rounded-xl bg-[#070B14]/80 border border-white/10 px-4 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                      placeholder="Doe"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5 animate-slide-up" style={{ animationDelay: isLoginForm ? '200ms' : '300ms', animationFillMode: 'both' }}>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                <input
                  type="email"
                  value={emailId}
                  className="h-12 w-full rounded-xl bg-[#070B14]/80 border border-white/10 px-4 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                  placeholder="developer@example.com"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5 animate-slide-up" style={{ animationDelay: isLoginForm ? '300ms' : '400ms', animationFillMode: 'both' }}>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className="h-12 w-full rounded-xl bg-[#070B14]/80 border border-white/10 px-4 pr-12 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all placeholder:text-gray-600 font-medium tracking-wide"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" 
                    onClick={togglePassword}
                  >
                    {showPassword ? <IoEye size={18} /> : <IoEyeOff size={18} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl animate-fade-in mt-2" style={{ animationDelay: isLoginForm ? '400ms' : '500ms', animationFillMode: 'both' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-400 text-sm font-semibold leading-snug">{error}</p>
                </div>
              )}

              {/* Action Button */}
              <div className="animate-slide-up" style={{ animationDelay: isLoginForm ? '500ms' : '600ms', animationFillMode: 'both' }}>
                <button
                  className="w-full h-12 mt-6 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-extrabold rounded-xl text-base shadow-[0_4px_15px_rgba(124,58,237,0.3)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.5)] transform hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                  onClick={isLoginForm ? handleLogin : handleSignup}
                >
                  {isLoginForm ? "Log In" : "Create Account"}
                </button>
              </div>
              
              {/* Toggle Switch */}
              <div className="pt-4 text-center animate-slide-up" style={{ animationDelay: isLoginForm ? '600ms' : '700ms', animationFillMode: 'both' }}>
                <button 
                  className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors group"
                  onClick={() => {
                    setIsLoginForm(!isLoginForm);
                    setError(""); 
                  }}
                >
                  {isLoginForm ? "Don't have an account? " : "Already have an account? "}
                  <span className="text-[#06B6D4] font-bold group-hover:underline decoration-2 underline-offset-4">{isLoginForm ? "Sign up" : "Log in"}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;