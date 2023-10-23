const Tweet = require("../model/tweetModel")
const User = require("../model/userModel")

exports.createTweet = async(req,res)=>{
    const {tweet} = req.body
    const tweetModel = await Tweet.create({
        user:req.userId,
        tweet:tweet
    })
    const user = await User.findById(req.userId)
    user.tweets.push(tweetModel)
    await user.save()
    res.json({tweetModel})
}

exports.getAllTweets = async(req,res) => {
    const allTweets = await Tweet.find({user:req.userId})
    res.json({tweets:allTweets})
}