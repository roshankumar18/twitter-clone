const { default: mongoose } = require("mongoose");
const findOrCreatePlugin = require("mongoose-findorcreate");

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
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
    }]
},
{timeStamp :true})
tweetSchema.plugin(findOrCreatePlugin)
const Tweet = mongoose.model('Tweet',tweetSchema)
module.exports = Tweet