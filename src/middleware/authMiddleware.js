const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

exports.protect = async(req,res,next) =>{
    try{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
       
       
    }else{
        res.status(401).json("Not authoeized , no token")
    }
}
catch(err)
    {
        res.status(401).json("Not a valid token")
    }
}