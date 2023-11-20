import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/UserSlice';

const EditProfile = ({setOpen ,setImageUrl}) => {

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  


  const uploadImage =async(e)=>{
    
    e.preventDefault()
    const formData = new FormData()
    formData.append("image",e.target.files[0])
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
      try{
          const res = await axios.put("http://localhost:3000/user/",formData,config)
          console.log(res.data.profileImage)
          setImageUrl(res.data.profileImage)
          dispatch(loginSuccess(res.data))
      }catch(err){
        console.log(err)
      }

  }
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>Choose a new profile picture</p>
        
          <input
            type="file"
            className="bg-transparent border border-slate-500 rounded p-2"
            accept="image/*"
            onChange={(e)=>uploadImage(e)}
          />
       

        <p>Delete Account</p>
        <button
          className="bg-red-500 text-white py-2 rounded-full"
          
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default EditProfile