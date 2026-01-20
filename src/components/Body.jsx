import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from "../utils/userSlice"
import { BASE_URL } from '../utils/constants'



const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=> store.user); 

  const fetchuser = async () =>{
    if(userData) return;
    try{
    const res = await axios.get(BASE_URL + "/profile/view" , {withCredentials : true ,});
    dispatch(addUser(res.data));
    }
    catch(err)
    { 
      if(err.status=== 401)
      {
        navigate("/login");
      }
      
      
    }

    

  };
  useEffect(()=>{
    fetchuser();
      
    }, []);
  return (
    <div>
        <NavBar/> 
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default Body