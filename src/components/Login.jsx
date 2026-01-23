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
  const [isLoginForm, setIsLoginForm] = useState(true);
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
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="card w-96 backdrop-blur-xl bg-white/20 shadow-3xl border border-white/30 animate-fade-in">
        <div className="card-body space-y-1">

          <h2 className="text-3xl font-bold text-center text-white tracking-wide">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {/* First Name */}
          {!isLoginForm && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-white">
                First Name
              </legend>
              <input
                type="text"
                value={firstName}
                className="input w-full bg-white/80 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
          )}

          {/* Last Name */}
          {!isLoginForm && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-white">
                Last Name
              </legend>
              <input
                type="text"
                value={lastName}
                className="input w-full bg-white/80 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          )}

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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="input w-full bg-white/80 focus:bg-white transition-all duration-300 
                           focus:ring-2 focus:ring-pink-500 pr-10"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                           text-gray-600 hover:text-pink-600 transition-colors"
              >
                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>
          </fieldset>

          {/* Error */}
          {error && (
            <p className="text-red-300 text-sm text-center animate-shake">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div className="card-actions justify-center pt-2">
            <button
              className="btn btn-primary w-full bg-gradient-to-r from-purple-600 to-pink-600 
                         border-none text-white hover:scale-105 transition-transform duration-300 shadow-lg"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login 🚀" : "Sign Up 🚀"}
            </button>
          </div>

          {/* Toggle */}
          <p
            className="m-auto cursor-pointer py-2 text-white/90 hover:underline"
            onClick={() => setIsLoginForm((prev) => !prev)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
