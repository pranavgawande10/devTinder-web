import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";


export const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age , setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [skills, setSkills] = useState(user.skills || "");
    const [photoUrl , setPhotoUrl]= useState(user.photoUrl  || "")
    const [error, setError] = useState("");
    const [showToast , setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () =>{
        setError("");
        try{
            const res = await  axios.patch(BASE_URL + "/profile/edit" , {firstName,lastName,age,gender,photoUrl,skills, about}, {withCredentials : true,});
             dispatch(addUser(res?.data?.data));
             setShowToast(true);
             setTimeout(() => {
                setShowToast(false);
             },3000);
        }
        catch(err)
        {
            setError(err.response.data);
        }
    }

return (
  <div className="relative"> {/* Added relative container for toast positioning */}
    
    {/* Toast Notification */}
    {showToast && (
      <div className="toast toast-top toast-center z-50">
        <div className="alert bg-green-600 border-none text-white font-medium shadow-2xl rounded-full px-8 py-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-lg">Profile saved successfully!</span>
        </div>
      </div>
    )}

    <div className="w-full max-w-lg bg-[#0f0f14] border border-white/10 rounded-2xl px-8 py-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <img
          src={photoUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
        />
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Edit Profile
          </h1>
          <p className="text-xl text-gray-400 mt-1">
            Update your public information
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-5 text-white">

        {/* Names Row */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium ml-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="h-12 px-5 rounded-full bg-[#0b0b10] border border-white/10 
                         text-lg text-white focus:border-pink-500 outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium ml-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="h-12 px-5 rounded-full bg-[#0b0b10] border border-white/10 
                         text-lg text-white focus:border-pink-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Photo URL */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium ml-1">Photo URL</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Profile photo URL"
            className="h-12 px-5 w-full rounded-full bg-[#0b0b10] border border-white/10 
                       text-lg text-white focus:border-pink-500 outline-none transition-all"
          />
        </div>

        {/* Age + Gender Row */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium ml-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="h-12 px-5 rounded-full bg-[#0b0b10] border border-white/10 
                         text-lg text-white focus:border-pink-500 outline-none transition-all"
            />
          </div>
          {/* Photo URL */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium ml-1">Skills</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="SkillsL"
            className="h-12 px-5 w-full rounded-full bg-[#0b0b10] border border-white/10 
                       text-lg text-white focus:border-pink-500 outline-none transition-all"
          />
        </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium ml-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="h-12 px-5 rounded-full bg-[#0b0b10] border border-white/10 
                         text-lg text-white focus:border-pink-500 outline-none transition-all appearance-none"
            >
              <option value="" disabled>Select Gender</option>
              <option>male</option>
              <option>female</option>
              <option>others</option>
            </select>
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium ml-1">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About you"
            rows={4}
            className="px-5 py-4 w-full rounded-2xl bg-[#0b0b10] border border-white/10 
                       text-lg text-white focus:border-pink-500 outline-none resize-none transition-all"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-base text-red-400 font-medium px-2">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={saveProfile}
          className="mt-6 h-14 w-full rounded-full 
                     bg-[#e91e63] hover:bg-[#d81b60] 
                     text-xl font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
);


}


export default EditProfile;