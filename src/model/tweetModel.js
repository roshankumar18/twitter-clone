const { default: mongoose } = require("mongoose");

const tweetSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    tweet:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        trim:true
    }]
})

const Tweet = mongoose.model('Tweet',tweetSchema)
module.exports = Tweet