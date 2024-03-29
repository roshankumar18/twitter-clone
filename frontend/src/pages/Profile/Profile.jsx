import React, { useEffect, useState } from 'react'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tweet from '../../components/Tweet/Tweet';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import EditProfile from '../../components/EditProfile/EditProfile';
import { loginSuccess } from '../../redux/UserSlice';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';


const Profile = () => {
     const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleFollow = async() =>{
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }
  try {
    let url = "http://localhost:3000/user/follow/"+id
    await axios.put(url,null,config);
    url = "http://localhost:3000/user/"
    const data = await axios.get(url,config)
    dispatch(loginSuccess(data.data))
  } catch (err) {
    console.log("error", err);
  }
  }

  const unHandleFollow = async() =>{
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }
  try {
    let url = "http://localhost:3000/user/unfollow/"+id
    await axios.put(url,null,config);
    url = "http://localhost:3000/user/"
    const data = await axios.get(url,config)
    dispatch(loginSuccess(data.data))
  } catch (err) {
    console.log("error", err);
  }
  }

  useEffect(() => {
    
    const fetchData = async () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
      try {
        
        const userProfile = await axios.get(`/user/${id}`,config);
        setImageUrl(userProfile.data.profileImage)
        setUserTweets(userProfile.data.tweets);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);
 return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSideBar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img
              src={imageUrl?imageUrl:PersonIcon}
              alt={PersonIcon}
              className="w-12 h-12 rounded-full"
            />
            <div >
            <MessageIcon className='mr-2'/>
            {currentUser._id === id ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            ) : currentUser.following.includes(id) ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={unHandleFollow}
              >
                Following
              </button>
            ) : (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          </div>
          <div className="mt-6">
            {userTweets.map((tweet)=>{
                return (
                    <div className="p-2" key={tweet._id}>
                        <Tweet tweet={tweet} setData={setUserTweets}></Tweet>
                    </div>
                )
            })
              }
          </div>
        </div>

        <div className="px-6">
          <RightSideBar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} setImageUrl={setImageUrl}/>}
    </>
  );
}

export default Profile