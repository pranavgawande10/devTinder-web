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
    const [photoUrl , setPhotoUrl]= useState(user.photoUrl  || "")
    const [error, setError] = useState("");
    const [showToast , setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () =>{
        setError("");
        try{
            const res = await  axios.patch(BASE_URL + "/profile/edit" , {firstName,lastName,age,gender,photoUrl,about}, {withCredentials : true,});
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
    <>
    <div className="flex justify-center my-10">
    <div className="flex justify-center mx-10 ">
      <div className="card bg-base-300 w-96  shadow-sm">
        <div className="card-body ">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name </legend>
            <input
              type="text"
              value={firstName}
              className="input"
              placeholder="Type here"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
           <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name </legend>
            <input
              type="text"
              value={lastName}
              className="input"
              placeholder="Type here"
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
           <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              value={age}
              className="input"
              placeholder="Type here"
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>
           <fieldset className="fieldset">
  <legend className="fieldset-legend text-sm font-medium">
    Gender
  </legend>
  <select
    value={gender}
    className="select select-bordered w-full focus:select-primary"
    onChange={(e) => setGender(e.target.value)}
  >
    <option value="" disabled>
      Select gender
    </option>
    <option value="male">male</option>
    <option value="female">female</option>
    <option value="others">others</option>
    <option value="prefer not to say">prefer not to say</option>
  </select>
</fieldset>


          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-medium">
              About
            </legend>
            <textarea
              value={about}
              className="textarea textarea-bordered w-full resize-none focus:textarea-primary"
              placeholder="Write something about yourself"
              rows={3}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset> 

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL </legend>
            <input
              type="text"
              value={photoUrl}
              className="input"
              placeholder="Type here"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>


         
        <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile} >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user = {{firstName, lastName,photoUrl,age,gender,about  }}/>
    </div>

     {showToast && (
        <div className="toast toast-top toast-center">
        <div className="alert alert-success">
             <span>Profile saved successfully.</span>
        </div>
    </div>
     )} 
    </>
     
  )
}


export default EditProfile;