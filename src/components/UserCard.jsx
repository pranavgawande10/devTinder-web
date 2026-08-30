import axios from 'axios';
import { FaGithub } from 'react-icons/fa';
import {BASE_URL} from "../utils/constants";
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user, hideActions = false}) => {
    const dispatch = useDispatch();
    if (!user) return null;

    const {_id , firstName, lastName,photoUrl, age,gender,skills,about,githubUsername, headline} = user;
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
    className="relative w-[22rem] sm:w-[24rem] rounded-[2rem] overflow-hidden
               shadow-2xl glass-card group my-10 transform-gpu
               transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(124,58,237,0.3)]
               hover:-translate-y-2 border border-white/5"
    style={{ transformStyle: 'preserve-3d' }}
  >
    {/* Image */}
    <div className="h-[28rem] overflow-hidden">
      <img
        src={photoUrl}
        alt="photo"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-90"></div>

    {/* Content */}
    <div className="absolute bottom-0 w-full p-6 text-white transform-gpu translate-z-[50px]">
      <h2 className="text-3xl font-extrabold tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
        {firstName} {lastName}
      </h2>

      {headline && (
        <p className="text-[13px] font-semibold text-purple-300 mb-2 tracking-wide uppercase">
          {headline}
        </p>
      )}

      {age && gender && (
        <p className="text-sm font-medium text-primary-accent mb-3">
          {age} • <span className="capitalize">{gender}</span>
        </p>
      )}

      {skills && (
        <div className="flex flex-wrap gap-2 mb-3">
          {(Array.isArray(skills) ? skills : skills.split(',')).slice(0, 3).map((skill, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider bg-white/10 px-2 py-1 rounded-md font-bold text-gray-300 border border-white/5">
              {typeof skill === 'string' ? skill.trim() : skill}
            </span>
          ))}
          {(Array.isArray(skills) ? skills.length : skills.split(',').length) > 3 && <span className="text-xs text-gray-400 self-center">+{(Array.isArray(skills) ? skills.length : skills.split(',').length) - 3}</span>}
        </div>
      )}

      <p className="text-sm opacity-80 line-clamp-2 leading-relaxed text-gray-300">
        {about}
      </p>

      {githubUsername && (
        <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 cursor-pointer group/link bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all">
          <FaGithub className="text-gray-400 group-hover/link:text-white transition-colors" size={16}/>
          <span className="text-xs font-semibold text-gray-400 group-hover/link:text-white transition-colors">@{githubUsername}</span>
        </a>
      )}

      {/* Actions */}
      {!hideActions && (
        <div className="flex justify-center gap-4 mt-6 transform-gpu translate-z-[60px]">
          <button
            className="w-14 h-14 flex items-center justify-center rounded-full bg-navy-800/80 backdrop-blur-md border border-gray-600 text-gray-400
                       hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]
                       transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="w-14 h-14 flex items-center justify-center rounded-full bg-navy-800/80 backdrop-blur-md border border-gray-600 text-gray-400
                       hover:bg-primary-accent/20 hover:border-primary-accent hover:text-primary-accent hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]
                       transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => handleSendRequest("intrested", _id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  </div>
);

}

export default UserCard