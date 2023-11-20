import axios from 'axios';
import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const   Tweet = ({ tweet, setData }) => {

    const { currentUser } = useSelector((state) => state.user);
    const [userData, setUserData] = useState([]);

    const location = useLocation().pathname;
    const { id } = useParams();
    
    // const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  //   useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       const findUser = await axios.get(`/user/${tweet.user}`);
    
  //       setUserData(findUser.data);
  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   };

  //   fetchData();
  // },[tweet,tweet.like] );

    
    const handleLike = async(e) =>{
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        try{
          const url ="http://localhost:3000/tweets/like/"+tweet._id
            await axios.put(url,null,config)

        if (location.includes("profile")) {
            
            const userTweets = await axios.get(`http://localhost:3000/user/${id}`,config); 
            setData(userTweets.data.tweets);
        } else if (location.includes("explore")) {
            const exploreTweets = await axios.get("http://localhost:3000/tweets/explore",config);
       
            setData(exploreTweets.data.exploreTweet);
        } else {
            const newData = await axios.get("user/timelines",config);
            setData(newData.data);
      }
        }catch(err){    
            console.log(err)
        }

    }

    return (
      <>
      <div className="flex space-x-2">
          <Link to={`/profile/${tweet.user._id}`} >
              <h3 className='font-bold'>{tweet.user.username}</h3>
          </Link>
            <span className="font-normal">@{tweet.user.username}</span>
          {/* <p> - {dateStr}</p> */}
      </div>
      <div>
        <img src={tweet.image}></img>
      </div>
        <p>{tweet.tweet}</p>
        <button onClick={handleLike}>
          {tweet && tweet.like.includes(currentUser._id) ? (
            <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
          )}
          {tweet.like.length}
        </button>
      </>
    )
}

export default Tweet