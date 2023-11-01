const { default: mongoose, Mongoose } = require("mongoose");

const comment = new mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    tweetId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
    
},{timestamps:true})

const Comment = mongoose.model('Comment',comment)
module.exports = Comment