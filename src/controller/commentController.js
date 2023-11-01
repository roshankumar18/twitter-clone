const Comment = require("../model/commentModel")
const Tweet = require("../model/tweetModel")

exports.postComment = async(req,res) =>{
    const {message} = req.body
    const tweetId = req.params.id
    const comment = await Comment.create({
        message,
        userId:req.userId,
        tweetId
    })
    const tweet = await Tweet.findById(tweetId)
    tweet.comment.push(comment)
    await tweet.save()
    res.json({comment})
}

exports.deleteComment = async(req,res)=>{
    const comment = await Comment.findById(req.params.id)
    
    if(!comment){
        return res.status(404).json({"message":"Comment not found"})
    }
    if(comment.userId.toString()===req.userId){
        await Comment.findByIdAndDelete(req.params.id)
        res.json("Comment deleted")
    }else{
        res.status(401).json({"message":"not authorized to delete comment"})
    }
}