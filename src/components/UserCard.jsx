import axios from 'axios';
import {BASE_URL} from "../utils/constants";
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const dispatch = useDispatch();
    if (!user) return null;

    const {_id , firstName, lastName,photoUrl, age,gender,skills,about} = user;
    const handleSendRequest = async (status,userId) =>{
      try 
      {
        const res  = await axios.post(
          BASE_URL + "/request/send/" + status + "/"+ userId, {}, {withCredentials:true,}
        );
        dispatch(removeUserFromFeed(userId))
      }
      catch(err)
      {

      }
    }

  return (
  <div
    className="relative w-[22rem] rounded-3xl overflow-hidden
               shadow-2xl bg-base-300
               hover:scale-[1.02] transition-transform duration-300 my-30"
  >
    {/* Image */}
    <div className="h-[26rem] overflow-hidden">
      <img
        src={photoUrl}
        alt="photo"
        className="h-full w-full object-cover"
      />
    </div>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

    {/* Content */}
    <div className="absolute bottom-0 w-full p-5 text-white">
      <h2 className="text-2xl font-bold">
        {firstName} {lastName}
      </h2>

      {age && gender && (
        <p className="text-sm opacity-90">
          {age}, {gender}
        </p>
      )}
      <p className="text-sm mt-2 opacity-80 line-clamp-2">
        {skills}
      </p>

      <p className="text-sm mt-2 opacity-80 line-clamp-2">
        {about}
      </p>

      {/* Actions */}
      <div className="flex justify-center gap-6 mt-5">
        <button
          className="btn btn-circle btn-outline border-white text-white
                     hover:bg-red-500 hover:border-red-500
                     hover:scale-110 transition-all"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          ✖
        </button>

        <button
          className="btn btn-circle btn-outline border-white text-white
                     hover:bg-green-500 hover:border-green-500
                     hover:scale-110 transition-all"
          onClick={() => handleSendRequest("intrested", _id)}
        >
          ❤️
        </button>
      </div>
    </div>
  </div>
);

}

export default UserCard