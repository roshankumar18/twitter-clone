import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginFailed, loginStart, loginSuccess } from '../../redux/UserSlice'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    

    const dispatch = useDispatch()
    const navigate = useNavigate()


  

    const handleLogin = async(e) =>{
        e.preventDefault()
        try{
            dispatch(loginStart())
        const  token = await axios.post("http://localhost:5000/user/login",{email,password})
        localStorage.setItem("token",token.data.token)
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        const response = await axios.get("http://localhost:5000/user/" , config)
        dispatch(loginSuccess(response.data))
        navigate("/")
        }catch(e){
            dispatch(loginFailed())
            console.log(e)
        }
    }
  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>

      <input
        type="text"
        onChange={e=>{
            setEmail(e.target.value)
        }}
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
      onChange={e=>setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />

      <button
      onClick={handleLogin}
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
      >
        Sign in
      </button>

      <p className="text-center text-xl">Don't have an account?</p>

      <input
        type="text"
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        type="email"
        placeholder="email"
        required
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />

      <button
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
}

export default SignIn