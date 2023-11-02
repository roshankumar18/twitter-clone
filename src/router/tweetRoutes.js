const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { createTweet, getAllTweets, getTweetById, deleteTweet, explore } = require('../controller/tweetController')
const { likeTweet } = require('../controller/likeController')
const router = express.Router()


router.use(protect)
router.get('/explore',explore)
router.route('/').post(createTweet)
router.route('/:id').get(getAllTweets).delete(deleteTweet)
router.route('/like/:id').put(likeTweet)

module.exports = router 