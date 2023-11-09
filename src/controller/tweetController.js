const Tweet = require("../model/tweetModel")
const User = require("../model/userModel")
const { addTweetValidation } = require("../validator")
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })

exports.createTweet = async(req,res)=>{
    try{
    const {tweet} = req.body
    const image = req.file?req.file.path:null
    let cloudImage
    const {error,value}=addTweetValidation({tweet,image})
    if(error)
        return res.status(400).json({"errors":error.details})

    if(image!=null)
        cloudImage = await cloudinary.uploader.upload(image)
    
    const tweetModel = await Tweet.create({
        user:req.userId,
        tweet:tweet,
        image:image?cloudImage.url:null
    })
    const user = await User.findById(req.userId)
    user.tweets.push(tweetModel)
    await user.save()
    res.json({tweetModel})
}catch(err){
    console.log(err)
    res.status(500).json({"message":"failure"})
}
}

exports.getAllTweets = async(req,res) => {
    const allTweets = await Tweet.find({_id:req.params.id}).populate('comment')
    res.json(allTweets)
}

// exports.getTweetById = async(req,res) => {
//     const tweet = await Tweet.findById(req.params.id)
//     if(!tweet){
//         return res.status(404).json("Tweet not found")
//     }
//     if(tweet.userId.toString() === req.userId){
//         res.status(200).json(tweet)
//     }else{
//         res.status(401).json({"message":"not authorised"})
//     }
// }

exports.explore = async(req,res)=>{
    try{
        const exploreTweet = await Tweet.find({
            like:{$exists:true},
        }).sort({like:-1})
        res.status(200).json({exploreTweet})
    }catch{(err)
        console.log(err)
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

