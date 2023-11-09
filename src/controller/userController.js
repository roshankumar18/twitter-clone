const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const { json } = require('express')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const Tweet = require('../model/tweetModel')
const { addUserValidation } = require('../validator')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })
exports.loginUser = async (req,res)=>{
    const {email,password} = req.body
    if(!email){
        return res.status(400).json("email is empty")
    }
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(401).json({"message":"user not exists"})
    }
    try{
    const passwordmatch =await bcrypt.compare(password,user.password)
    if(passwordmatch){
        const token = jwt.sign({userId:user.id,
        email:email},process.env.JWT_SECRET,{ expiresIn: '1h' })
        res.status(201).json({token})
    }else{
        res.status(401).json("authentication failed")
    }
}catch(err){
    res.status(500).json({"message":"failure"})
    console.log(err)
}
}

exports.getUser  = async(req,res)=>{
    console.log("in get user")
    console.log(req.userId)
    const user = await User.findById(req.userId).select('-password').populate({path:'tweets',populate:{path:'comment'}})
    if(!user){
    res.status(401).json({"message":"User not found"})
    }
    else{
        res.status(200).json(user)
    }
    
}

exports.userById = async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password').populate({path:'tweets',populate:{path:'comment'}})
    if(!user){
    res.status(401).json({"message":"User not found"})
    }
    else{
        res.status(200).json(user)
    }
}


exports.createUser =async (req,res)=>{
    const {username,email,password} = req.body
    const {error,value} = addUserValidation(req.body)
    if(error)
        return res.status(400).json({"errors":error.details})
    const salt = 5
    const hashPassword = await bcrypt.hash(password,salt)
    const user =await User.create({username:username,email:email,password:hashPassword})
    res.status(201).json({user})
}

exports.deleteUserById = async(req,res)=>{
    if(req.userId==req.params.id){
        await User.findByIdAndDelete(req.params.id)
        await Tweet.deleteMany({user:req.params.id})
        res.status(200).json("User deleted")
    }
}

exports.getTimelines = async(req,res)=>{
    try{
    const user = await User.findById(req.userId)
    const userTweet = await Tweet.find({user:req.userId})
    const followingTweets = await Promise.all(user.following.map(followingId=>{
        return Tweet.find({user:followingId})
    }))
    console.log(followingTweets)
    if(followingTweets.length==0)
        return res.json(userTweet)
        
    res.json(followingTweets[0].concat(...userTweet))
}catch(err)
{
    console.log(err)
    res.status(500).json({"message":err})
}    
}

exports.uploadImage = async(req,res)=>{
    console.log(req.file)
    try{
    const data = {
        image: req.file.path
       }
       const cloudImage = await cloudinary.uploader.upload(data.image)
       const user = await User.findOneAndUpdate({_id:req.userId},{profileImage:cloudImage.url},{new:true})
       res.status(200).json({"url":cloudImage.url})
    }catch(err){
        console.log(err)
        res.status(500).json({
            "message":"failure"
        })
    }
     
}