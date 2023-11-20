import React, { useEffect, useRef, useState } from 'react'
import Timeline from '../Timeline/Timeline';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';

const MainTweet = () => {

    const [tweetText, setTweetText] = useState("");
    const fileInputRef = useRef(null)
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const naviagte = useNavigate()
    const [timeline, setTimeline] = useState([]);
    const [selectedImage,setSelectedImage] = useState(null)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("image",fileInputRef.current.files[0])
        formData.append("tweet",tweetText)
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        try {
        const submitTweet = await axios.post("/tweets", formData,config);
        // window.location.reload(false);
        setTimeline([submitTweet.data.tweetModel, ...timeline]);
        setTweetText("");
        setSelectedImage(null)
        } catch (err) {
        console.log(err);
        }
    }

    const clearSelectedImage =(e)=>{
      e.preventDefault()
        setSelectedImage(null)
    }
    const displaySelectedFile = (e) => {
      const selectedFile = fileInputRef.current.files[0];
      console.log(selectedFile)
      if (selectedFile) {
        setSelectedImage(URL.createObjectURL(selectedFile))
      }
    };
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

    const openFileInput = (e) =>{
      fileInputRef.current.click()
    }

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
     

      <form className="border-b-2 pb-6 ">
        <textarea
          type="text"
          onChange={(e) => setText(e)}
          value={tweetText}
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <div className="flex items-end justify-between"> 
        {selectedImage && (
          <div>
            <img src={selectedImage} alt="Selected Preview" className="max-h-32 mb-2 rounded-lg" />
            <button onClick={clearSelectedImage}>Remove Image</button>
          </div>
        )}
          <ImageIcon onClick={openFileInput}></ImageIcon>
          <input className='hidden'
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={displaySelectedFile}
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`bg-blue-500 text-white py-2 px-4 rounded-full ${loading ? 'opacity-50' : ''}`}
        >
          Tweet
        </button>
    </div>
      </form>
      <Timeline timeline ={timeline} setTimeline ={setTimeline}/>
    </div>
  );
}

export default MainTweet