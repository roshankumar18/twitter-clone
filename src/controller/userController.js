const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const { json } = require('express')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const Tweet = require('../model/tweetModel')

exports.loginUser = async (req,res)=>{
    const {email,password} = req.body
    if(!email){
        return res.json("email is empty")
    }
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(401).json({"message":"user not exists"})
    }
    const passwordmatch =await bcrypt.compare(password,user.password)
    if(passwordmatch){
        const token = jwt.sign({userId:user.id,
        email:email},process.env.JWT_SECRET,{ expiresIn: '1h' })
        res.status(201).json(token)
    }else{
        res.status(401).json("authentication failed")
    }
}

exports.userById  = async(req,res)=>{
   
   
    const user = await User.findById(req.userId).select('-password').populate({path:'tweets',populate:{path:'comment'}})
    if(!user){
    res.status(401).json({"message":"User not found"})
    }
    else{
        res.status(200).json(user)
    }
    
}


exports.createUser =async (req,res)=>{
    const {userName,email,password} = req.body
    const salt = 5
    const hashPassword = await bcrypt.hash(password,salt)
    const user =await User.create({username:userName,email:email,password:hashPassword})
    res.status(201).json({user})
}

exports.deleteUserById = async(req,res)=>{
    if(req.userId==req.params.id){
        await User.findByIdAndDelete(req.params.id)
        await Tweet.deleteMany({user:req.params.id})
        res.status(200).json("User deleted")
    }
}

exports.getTimeline = async(req,res)=>{
    const user = await User.findById(req.userId)
    const followingTweets = await Promise.all(user.following.map(followingId=>{
        return Tweet.find({user:followingId})
    }))
    res.json(followingTweets)
    
}