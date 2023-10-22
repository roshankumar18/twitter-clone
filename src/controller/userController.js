const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const { json } = require('express')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

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
    console.log(req.params.id)
    try{
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            const user = await User.findById(req.params.id).select('-password')
            if(!user){
            res.status(401).json({"message":"User not found"})
            }
            else{
                res.status(200).json(user)
            }
        }else{
            res.status(401).json({"message":"invaid user id"})
        }
}catch(err){
    console.log(err.message)
}
}

exports.createUser =async (req,res)=>{
    const {userName,email,password} = req.body
    const salt = 5
    const hashPassword = await bcrypt.hash(password,salt)
    const user =await User.create({username:userName,email:email,password:hashPassword})
    res.status(201).json({user})
}

// module.exports = {createUser,loginUser,userById}