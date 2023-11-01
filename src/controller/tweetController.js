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
    const allTweets = await Tweet.find({user:req.userId}).populate('comment')
    res.json({tweets:allTweets})
}

exports.getTweetById = async(req,res) => {
    const tweet = await Tweet.findById(req.params.id)
    if(!tweet){
        return res.status(404).json("Tweet not found")
    }
    if(tweet.userId.toString() === req.userId){
        res.status(200).json(tweet)
    }else{
        res.status(401).json({"message":"not authorised"})
    }
}
exports.deleteTweet = async(req,res) =>{
    const tweet = await Tweet.findById(req.params.id)
    if(!tweet){
        return res.status(404).json("Tweet not found")
    }
    if(tweet.userId.toString() === req.userId){
        await Tweet.findByIdAndDelete(tweet.userId)
        res.json("tweet deleted")
    }else{
        res.status(401).json({"message":"not authorised"})
    }
}

