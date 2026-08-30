import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import SkillsInput from "./SkillsInput";


export const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age , setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [skills, setSkills] = useState(user.skills || []);
    const [photoUrl , setPhotoUrl]= useState(user.photoUrl  || "")
    const [githubUsername, setGithubUsername] = useState(user.githubUsername || "");
    const [error, setError] = useState("");
    const [showToast , setShowToast] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append("photo", file);
        
        try {
            setIsUploading(true);
            setError("");
            const res = await axios.post(BASE_URL + "/profile/uploadPhoto", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            });
            setPhotoUrl(res.data.photoUrl);
            dispatch(addUser(res.data.data));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to upload photo");
        } finally {
            setIsUploading(false);
        }
    };

    const saveProfile = async () =>{
        setError("");
        try{
            const res = await  axios.patch(BASE_URL + "/profile/edit" , {firstName,lastName,age,gender,photoUrl,skills, about, githubUsername}, {withCredentials : true,});
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
  <div className="min-h-screen w-full relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
    
    {/* Global Background Effects */}
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-accent/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary-accent/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

    {/* Toast Notification */}
    {showToast && (
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
        <div className="bg-secondary-accent/20 border border-secondary-accent text-white font-medium shadow-[0_0_30px_rgba(34,211,238,0.3)] rounded-2xl px-6 py-3 flex items-center gap-3 backdrop-blur-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-secondary-accent shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm tracking-wide">Profile updated successfully!</span>
        </div>
      </div>
    )}

    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative z-10">
      
      {/* LEFT: Profile Preview */}
      <div className="w-full lg:w-5/12 flex flex-col items-center animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
         <div className="mb-6 text-center lg:text-left w-full">
            <h2 className="text-3xl font-extrabold text-[#F8FAFC] tracking-tight">Profile Preview</h2>
            <p className="text-[#94A3B8] text-sm mt-1 font-medium">This is how others see you on DevTinder.</p>
         </div>
         
         {/* Live Preview Card */}
         <div className="transform origin-top w-full flex justify-center pointer-events-none">
             {/* Note: pointer-events-none so we don't accidentally trigger actions on preview card */}
             <UserCard user={{ _id: "preview", firstName, lastName, photoUrl, age, gender, skills, about, githubUsername }} hideActions={true} />
         </div>
      </div>

      {/* RIGHT: Edit Form */}
      <div className="w-full lg:w-7/12 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
         <div className="p-8 sm:p-10 rounded-[2.5rem] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-[#111827]/60 backdrop-blur-2xl relative overflow-hidden">
             
             {/* Subtle form glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

             <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">
                  Customize Identity
                </h1>
                <p className="text-[#94A3B8] font-medium mt-2">
                  Build your premium developer persona.
                </p>
             </div>

             <div className="space-y-10 relative z-10">
                
                {/* 1. Personal Information */}
                <div>
                   <h3 className="text-xs font-bold text-primary-accent uppercase tracking-widest mb-5 flex items-center gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary-accent shadow-[0_0_10px_#7c3aed]"></span>
                     Personal Information
                     <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                   </h3>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="h-12 w-full rounded-xl bg-[#070B14]/80 border border-white/10 px-4 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="h-12 w-full rounded-xl bg-[#070B14]/80 border border-white/10 px-4 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Age</label>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="25"
                          className="h-12 w-full rounded-xl bg-[#070B14]/80 border border-white/10 px-4 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Gender</label>
                        <div className="relative">
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-12 w-full rounded-xl bg-[#070B14]/80 border border-white/10 px-4 pr-10 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all appearance-none font-medium"
                          >
                            <option value="" disabled className="bg-navy-900 text-gray-400">Select</option>
                            <option value="male" className="bg-navy-900 text-white">Male</option>
                            <option value="female" className="bg-navy-900 text-white">Female</option>
                            <option value="others" className="bg-navy-900 text-white">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>

                {/* 2. Professional Information */}
                <div>
                   <h3 className="text-xs font-bold text-secondary-accent uppercase tracking-widest mb-5 flex items-center gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-secondary-accent shadow-[0_0_10px_#06b6d4]"></span>
                     Professional Profile
                     <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                   </h3>
                   
                   <div className="space-y-6">
                      
                      {/* Photo Upload */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Profile Avatar</label>
                        <div className="flex items-center gap-4 bg-[#070B14]/80 p-3 rounded-2xl border border-white/5">
                           <div className="relative shrink-0">
                             <img src={photoUrl || "https://via.placeholder.com/150"} alt="Avatar" className="w-14 h-14 rounded-full object-cover border border-white/10"/>
                             {isUploading && (
                               <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                 </svg>
                               </div>
                             )}
                           </div>
                           <input
                             type="file"
                             accept="image/*"
                             onChange={handlePhotoUpload}
                             disabled={isUploading}
                             className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white/5 file:text-white hover:file:bg-white/10 transition-all cursor-pointer outline-none"
                           />
                        </div>
                      </div>

                      {/* GitHub */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">GitHub Username</label>
                        <div className="relative flex items-center bg-[#070B14]/80 border border-white/10 rounded-xl overflow-hidden focus-within:border-primary-accent focus-within:ring-1 focus-within:ring-primary-accent transition-all">
                          <span className="pl-4 pr-2 py-3 text-gray-500 font-medium text-sm flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                             github.com/
                          </span>
                          <input
                            type="text"
                            value={githubUsername}
                            onChange={(e) => setGithubUsername(e.target.value)}
                            placeholder="username"
                            className="h-12 w-full bg-transparent text-white focus:outline-none pr-4 font-medium"
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Core Skills</label>
                        <SkillsInput value={skills} onChange={setSkills} />
                      </div>

                      {/* About */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">About Me</label>
                        <textarea
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          placeholder="Tell the network about your experience, what you're building, and what you're looking for..."
                          rows={4}
                          className="w-full rounded-xl bg-[#070B14]/80 border border-white/10 p-4 text-white focus:border-primary-accent focus:ring-1 focus:ring-primary-accent focus:outline-none transition-all placeholder:text-gray-600 font-medium resize-none leading-relaxed"
                        />
                      </div>
                   </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 flex items-start gap-3 animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-400 font-semibold leading-snug">{error}</p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={saveProfile}
                  className="w-full h-14 mt-4 bg-gradient-to-r from-primary-accent to-blue-500 hover:from-primary-accent hover:to-blue-400 text-white font-extrabold rounded-2xl text-lg shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_10px_30px_rgba(124,58,237,0.5)] transform hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Profile
                </button>
                
             </div>
         </div>
      </div>
    </div>
  </div>
);


}


export default EditProfile;