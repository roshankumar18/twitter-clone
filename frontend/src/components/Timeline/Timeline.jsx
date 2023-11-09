import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Tweet from '../Tweet/Tweet'
import { useNavigate } from 'react-router-dom'

const Timeline = () => {
    const  [timeline,setTimeline] = useState([])

    const {currentUser} = useSelector((state)=>state.user)
    const naviagte = useNavigate()
   

    useEffect(()=>{
        const fetchData = async() =>{
            const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
            try{
                const timeLineTweets = await axios.get("user/timelines",config)
                
                setTimeline(timeLineTweets.data)

            }catch(err){
                naviagte("/signin")
                console.log(err)
            }
        }
        fetchData()
    },[currentUser._id])

    return (
        <div className="mt-6">
            {timeline && timeline.map((tweet)=>{
                return <div key ={tweet._id} className='p-2'>
                    <Tweet tweet={tweet}   setData={setTimeline}/>
                </div>
            })}
        </div>
    )
}

export default Timeline