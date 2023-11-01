const express = require('express')
const { postComment, deleteComment } = require('../controller/commentController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/:id').post(protect ,postComment).delete(protect,deleteComment)

module.exports = router