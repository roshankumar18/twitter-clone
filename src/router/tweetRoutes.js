const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { createTweet, getAllTweets, getTweetById, deleteTweet } = require('../controller/tweetController')
const { likeTweet } = require('../controller/likeController')
const router = express.Router()


router.use(protect)
router.route('/').get(getAllTweets).post(createTweet)
router.route('/:id').get(getTweetById).delete(deleteTweet)
router.route('/like/:id').put(likeTweet)

module.exports = router 