const User = require("../model/userModel")

exports.followUser = async (req,res)=>{
   
    
    const currentUser = await User.findById(req.userId)
    const user = await User.findById(req.params.id)
    if(!user.followers.includes(req.userId))
        {currentUser.following.push(user)
        await currentUser.save()
        user.followers.push(currentUser)
        await user.save()
        res.json({
            "message":"Followed"
        })
    }else{
        res.status(403).json({"message":"You are already following"})
    }
}


exports.unFollowUser = async (req,res)=>{
   
    
    const currentUser = await User.findById(req.userId)
    const user = await User.findById(req.params.id)
    if(currentUser.following.includes(req.params.id))
        {currentUser.following.pull(user)
        await currentUser.save()
        user.followers.pull(currentUser)
        await currentUser.save()
        res.json({
            "message":"UnFollowed"
        })
    }else{
        res.status(403).json({"user":"You are not following the user"})
    }
}