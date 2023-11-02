import React, { useState } from 'react'
import Timeline from '../Timeline/Timeline';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MainTweet = () => {

    const [tweetText, setTweetText] = useState("");

    const { currentUser } = useSelector((state) => state.user);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        try {
        const submitTweet = await axios.post("/tweets", {
            tweet: tweetText,
        },config);
        window.location.reload(false);
        } catch (err) {
        console.log(err);
        }
    }

   return (
    <div>
      
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
     

      <form className="border-b-2 pb-6">
        <textarea
          type="text"
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
        onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <Timeline/>
    </div>
  );
}

export default MainTweet