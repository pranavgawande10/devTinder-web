import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("jadhav@gmail.com");
  const [password, setPassword] = useState("Aryan@1234");
  const [error, setError] = useState("");
     const navigate  = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
   

    try {
      const res = await axios.post(
        BASE_URL+ "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      // ✅ Store user data in Redux
      dispatch(addUser(res.data));
      return navigate("/");

    } catch (err) {
      setError(err?.response?.data || " something went wrong");
      
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <div className="card w-96 backdrop-blur-xl bg-white/20 shadow-2xl border border-white/30 animate-fade-in">
      <div className="card-body space-y-4">
        
        <h2 className="text-3xl font-bold text-center text-white tracking-wide">
          Welcome Back 👋
        </h2>
        <p className="text-center text-white/80 text-sm">
          Login to continue
        </p>

        {/* Email */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-white">
            Email ID
          </legend>
          <input
            type="text"
            value={emailId}
            className="input w-full bg-white/80 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </fieldset>

        {/* Password */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-white">
            Password
          </legend>
          <input
            type="password"
            value={password}
            className="input w-full bg-white/80 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-pink-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        {/* Error */}
        {error && (
          <p className="text-red-300 text-sm text-center animate-shake">
            {error}
          </p>
        )}

        {/* Button */}
        <div className="card-actions justify-center pt-2">
          <button
            className="btn btn-primary w-full bg-gradient-to-r from-purple-600 to-pink-600 border-none text-white hover:scale-105 transition-transform duration-300 shadow-lg"
            onClick={handleLogin}
          >
            Login 🚀
          </button>
        </div>

      </div>
    </div>
  </div>
);

};

export default Login;
