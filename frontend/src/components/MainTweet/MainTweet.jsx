import React, { useEffect, useState } from 'react'
import Timeline from '../Timeline/Timeline';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainTweet = () => {

    const [tweetText, setTweetText] = useState("");

    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const naviagte = useNavigate()
    const [timeline, setTimeline] = useState([]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        try {
        const submitTweet = await axios.post("/tweets", {
            tweet: tweetText,
        },config);
        // window.location.reload(false);
        setTimeline([submitTweet.data.tweetModel, ...timeline]);
        setTweetText("");
        } catch (err) {
        console.log(err);
        }
    }

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

    const setText = (e) => {
      const text = e.target.value;
      setTweetText(text);
      console.log(text); // Use the updated value immediately
    
      // Adjust loading state based on the length of the new text
      if (text.length > 0) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };

   return (
    <div>
      
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
     

      <form className="border-b-2 pb-6">
        <textarea
          type="text"
          onChange={(e) => setText(e)}
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`bg-blue-500 text-white py-2 px-4 rounded-full ml-auto ${loading ? 'opacity-50 ' : ''}`}

        >
          Tweet
        </button>
      </form>
      <Timeline timeline ={timeline} setTimeline ={setTimeline}/>
    </div>
  );
}

export default MainTweet