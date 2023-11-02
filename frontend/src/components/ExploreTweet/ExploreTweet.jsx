import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Tweet from '../Tweet/Tweet';

const ExploreTweet = () => {
  const [explore, setExplore] = useState();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
      try {
        const exploreTweets = await axios.get("/tweets/explore",config);
        setExplore(exploreTweets.data.exploreTweet);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [currentUser._id]);
  return (
    <div className="mt-6">
      {explore &&
        explore.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setExplore} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweet