const Tweet = require("../model/tweetModel")

exports.likeTweet = async(req,res) => {
    const tweetId = req.params.id
    const userId = req.userId
    const tweet = await Tweet.findById(tweetId)
    if(!tweet.like.includes(userId)){
        tweet.like.push(userId)
        await tweet.save()
        res.json("Tweet liked")
    }else{
        tweet.like.pull(userId)
        await tweet.save()
        res.json("Tweet disliked")
    }
    
    
}