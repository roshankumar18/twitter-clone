const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { createTweet, getAllTweets } = require('../controller/tweetController')
const router = express.Router()



router.route('/').get(protect,getAllTweets).post(protect,createTweet)

router.put('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})

router.delete('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})
router.get('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})

module.exports = router