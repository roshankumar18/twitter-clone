import axios from 'axios';
import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Tweet = ({ tweet, setData }) => {

    const { currentUser } = useSelector((state) => state.user);
    const [userData, setUserData] = useState([]);

    const location = useLocation().pathname;
    const { id } = useParams();
    
    // const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
    useEffect(() => {
    const fetchData = async () => {
      try {

        const findUser = await axios.get(`/user/${tweet.user}`);
        console.log(findUser.data)
        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  },[tweet,tweet.like] );

    
    const handleLike = async(e) =>{
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        try{
            await axios.put(`tweets/like/${tweet._id}`,null,config)

        if (location.includes("profile")) {
            // const newData = await axios.get(`/tweets/user/all/${id}`);
            // setData(newData.data);
        } else if (location.includes("explore")) {
            // const newData = await axios.get(`/tweets/explore`);
            // setData(newData.data);
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
            <Link to={`/profile/${tweet._id}`} >
                <h3 className='font-bold'>{userData.username}</h3>
            </Link>
             <span className="font-normal">@{userData.username}</span>
            {/* <p> - {dateStr}</p> */}
        </div>
         <p>{tweet.tweet}</p>
         <button onClick={handleLike}>
            {tweet.like.includes(currentUser._id) ? (
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